import { run as runTui, type TuiInput } from "@dewcode-ai/tui"
import { Global } from "@dewcode-ai/core/global"
import { AppNodeBuilder } from "@dewcode-ai/core/effect/app-node-builder"
import { Effect } from "effect"

export function run(input: TuiInput) {
  return runTui(input).pipe(Effect.provide(AppNodeBuilder.build(Global.node)))
}
