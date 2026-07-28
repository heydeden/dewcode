import { LayerNode } from "@dewcode-ai/core/effect/layer-node"
import os from "os"
import { ConfigV1 } from "@dewcode-ai/core/v1/config/config"
import fuzzysort from "fuzzysort"
import { Config } from "@/config/config"
import { mapValues, mergeDeep, omit, pickBy, sortBy } from "remeda"
import { NoSuchModelError, type Provider as SDK } from "ai"
import { Npm } from "@dewcode-ai/core/npm"
import { Hash } from "@dewcode-ai/core/util/hash"
import { Plugin } from "../plugin"
import { serviceUse } from "@dewcode-ai/core/effect/service-use"
import { type LanguageModelV3 } from "@ai-sdk/provider"
import { ModelsDev } from "@dewcode-ai/core/models-dev"
import { Auth } from "../auth"
import { Env } from "../env"
import { InstallationVersion } from "@dewcode-ai/core/installation/version"
import { iife } from "@/util/iife"
import { Global } from "@dewcode-ai/core/global"
import path from "path"
import { pathToFileURL } from "url"
import { Effect, Layer, Context, Schema, Types } from "effect"
import { EffectBridge } from "@/effect/bridge"
import { InstanceState } from "@/effect/instance-state"
import { EffectPromise } from "@/effect/promise"
import { FSUtil } from "@dewcode-ai/core/fs-util"
import { isRecord } from "@/util/record"
import { optional } from "@dewcode-ai/core/schema"
import { ProviderTransform } from "./transform"
import { ProviderV2 } from "@dewcode-ai/core/provider"
import { ModelV2 } from "@dewcode-ai/core/model"
import { ModelStatus } from "./model-status"
import { RuntimeFlags } from "@/effect/runtime-flags"
import { ProviderError } from "./error"

const OPENAI_HEADER_TIMEOUT_DEFAULT = 300_000

function wrapSSE(res: Response, ms: number, ctl: AbortController) {
  if (typeof ms !== "number" || ms <= 0) return res
  if (!res.body) return res
  if (!res.headers.get("content-type")?.includes("text/event-stream")) return res

  const reader = res.body.getReader()
  const body = new ReadableStream<Uint8Array>({
    async pull(ctrl) {
      const part = await new Promise<Awaited<ReturnType<typeof reader.read>>>((resolve, reject) => {
        const id = setTimeout(() => {
          const err = new ProviderError.ResponseStreamError("SSE read timed out")
          ctl.abort(err)
          void reader.cancel(err)
          reject(err)
        }, ms)

        reader.read().then(
          (part) => {
            clearTimeout(id)
            resolve(part)
          },
          (err) => {
            clearTimeout(id)
            reject(err)
          },
        )
      })

      if (part.done) {
        ctrl.close()
        return
      }

      ctrl.enqueue(part.value)
    },
    async cancel(reason) {
      ctl.abort(reason)
      await reader.cancel(reason)
    },
  })

  return new Response(body, {
    headers: new Headers(res.headers),
    status: res.status,
    statusText: res.statusText,
  })
}

function timeoutController(ms: number) {
  const ctl = new AbortController()
  const id = setTimeout(() => ctl.abort(new ProviderError.HeaderTimeoutError(ms)), ms)
  return {
    signal: ctl.signal,
    clear: () => clearTimeout(id),
  }
}

function googleVertexAnthropicBaseURL(project: string | undefined, location: string | undefined) {
  if (!project) return
  if (location !== "eu" && location !== "us") return
  // Continental multi-regions require Regional Endpoint Platform domains.
  return `https://aiplatform.${location}.rep.googleapis.com/v1/projects/${project}/locations/${location}/publishers/anthropic/models`
}

type BundledSDK = {
  languageModel(modelId: string): LanguageModelV3
  chat?: (modelId: string) => LanguageModelV3
  responses?: (modelId: string) => LanguageModelV3
}

const BUNDLED_PROVIDERS: Record<string, () => Promise<(opts: any) => BundledSDK>> = {
  "@ai-sdk/openai-compatible": () => import("@ai-sdk/openai-compatible").then((m) => m.createOpenAICompatible),
}

type CustomModelLoader = (sdk: any, modelID: string, options?: Record<string, any>, model?: Model) => Promise<any>
type CustomVarsLoader = (options: Record<string, any>) => Record<string, string>
type CustomDiscoverModels = () => Promise<Record<string, Model>>
type CustomLoader = (provider: Info) => Effect.Effect<{
  autoload: boolean
  getModel?: CustomModelLoader
  vars?: CustomVarsLoader
  options?: Record<string, any>
  discoverModels?: CustomDiscoverModels
}>

type CustomDep = {
  auth: (id: string) => Effect.Effect<Auth.Info | undefined>
  config: () => Effect.Effect<ConfigV1.Info>
  env: () => Effect.Effect<Record<string, string | undefined>>
  get: (key: string) => Effect.Effect<string | undefined>
}


function custom(dep: CustomDep): Record<string, CustomLoader> {
  return {
    "9router": Effect.fnUntraced(function* (input: Info) {
      const env = yield* dep.env()
      const config = yield* dep.config()
      const configProvider = config.provider?.["9router"]
      const auth = yield* dep.auth(input.id)

      // API key precedence: 1) config file, 2) auth storage, 3) env var
      const apiKey = configProvider?.options?.apiKey ?? (auth?.type === "api" ? auth.key : undefined) ?? env["DEWCODE_API_KEY"]

      // Base URL precedence: 1) config file, 2) env var, 3) default
      const baseURL = configProvider?.options?.baseURL ?? env["DEWCODE_API_URL"] ?? "http://127.0.0.1:20128/v1"

      const options: Record<string, any> = {
        baseURL,
      }

      if (apiKey) {
        options.apiKey = apiKey
      }

      return {
        autoload: true,
        options,
      }
    }),
  }
}

export * as Provider from "./provider"
