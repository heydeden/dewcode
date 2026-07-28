import { Config } from "effect"

export function truthy(key: string) {
  const value = process.env[key]?.toLowerCase()
  return value === "true" || value === "1"
}

const copy = process.env["DEWCODE_EXPERIMENTAL_DISABLE_COPY_ON_SELECT"]
const fff = process.env["DEWCODE_DISABLE_FFF"]

function enabledByExperimental(key: string) {
  return process.env[key] === undefined ? truthy("DEWCODE_EXPERIMENTAL") : truthy(key)
}

export const Flag = {
  OTEL_EXPORTER_OTLP_ENDPOINT: process.env["OTEL_EXPORTER_OTLP_ENDPOINT"],
  OTEL_EXPORTER_OTLP_HEADERS: process.env["OTEL_EXPORTER_OTLP_HEADERS"],

  DEWCODE_AUTO_HEAP_SNAPSHOT: truthy("DEWCODE_AUTO_HEAP_SNAPSHOT"),
  DEWCODE_GIT_BASH_PATH: process.env["DEWCODE_GIT_BASH_PATH"],
  DEWCODE_CONFIG: process.env["DEWCODE_CONFIG"],
  DEWCODE_CONFIG_CONTENT: process.env["DEWCODE_CONFIG_CONTENT"],
  DEWCODE_DISABLE_AUTOUPDATE: truthy("DEWCODE_DISABLE_AUTOUPDATE"),
  DEWCODE_ALWAYS_NOTIFY_UPDATE: truthy("DEWCODE_ALWAYS_NOTIFY_UPDATE"),
  DEWCODE_DISABLE_PRUNE: truthy("DEWCODE_DISABLE_PRUNE"),
  DEWCODE_DISABLE_TERMINAL_TITLE: truthy("DEWCODE_DISABLE_TERMINAL_TITLE"),
  DEWCODE_SHOW_TTFD: truthy("DEWCODE_SHOW_TTFD"),
  DEWCODE_DISABLE_AUTOCOMPACT: truthy("DEWCODE_DISABLE_AUTOCOMPACT"),
  DEWCODE_DISABLE_MODELS_FETCH: truthy("DEWCODE_DISABLE_MODELS_FETCH"),
  DEWCODE_DISABLE_MOUSE: truthy("DEWCODE_DISABLE_MOUSE"),
  DEWCODE_FAKE_VCS: process.env["DEWCODE_FAKE_VCS"],
  DEWCODE_SERVER_PASSWORD: process.env["DEWCODE_SERVER_PASSWORD"],
  DEWCODE_SERVER_USERNAME: process.env["DEWCODE_SERVER_USERNAME"],
  DEWCODE_DISABLE_FFF: fff === undefined ? process.platform === "win32" : truthy("DEWCODE_DISABLE_FFF"),

  // Experimental
  DEWCODE_EXPERIMENTAL_FILEWATCHER: Config.boolean("DEWCODE_EXPERIMENTAL_FILEWATCHER").pipe(
    Config.withDefault(false),
  ),
  DEWCODE_EXPERIMENTAL_DISABLE_FILEWATCHER: Config.boolean("DEWCODE_EXPERIMENTAL_DISABLE_FILEWATCHER").pipe(
    Config.withDefault(false),
  ),
  DEWCODE_EXPERIMENTAL_DISABLE_COPY_ON_SELECT:
    copy === undefined ? process.platform === "win32" : truthy("DEWCODE_EXPERIMENTAL_DISABLE_COPY_ON_SELECT"),
  DEWCODE_MODELS_URL: process.env["DEWCODE_MODELS_URL"],
  DEWCODE_MODELS_PATH: process.env["DEWCODE_MODELS_PATH"],
  DEWCODE_DB: process.env["DEWCODE_DB"],

  DEWCODE_WORKSPACE_ID: process.env["DEWCODE_WORKSPACE_ID"],
  DEWCODE_EXPERIMENTAL_WORKSPACES: enabledByExperimental("DEWCODE_EXPERIMENTAL_WORKSPACES"),

  // Evaluated at access time (not module load) because tests, the CLI, and
  // external tooling set these env vars at runtime.
  get DEWCODE_DISABLE_PROJECT_CONFIG() {
    return truthy("DEWCODE_DISABLE_PROJECT_CONFIG")
  },
  get DEWCODE_EXPERIMENTAL_REFERENCES() {
    return enabledByExperimental("DEWCODE_EXPERIMENTAL_REFERENCES")
  },
  get DEWCODE_TUI_CONFIG() {
    return process.env["DEWCODE_TUI_CONFIG"]
  },
  get DEWCODE_CONFIG_DIR() {
    return process.env["DEWCODE_CONFIG_DIR"]
  },
  get DEWCODE_PURE() {
    return truthy("DEWCODE_PURE")
  },
  get DEWCODE_PERMISSION() {
    return process.env["DEWCODE_PERMISSION"]
  },
  get DEWCODE_PLUGIN_META_FILE() {
    return process.env["DEWCODE_PLUGIN_META_FILE"]
  },
  get DEWCODE_CLIENT() {
    return process.env["DEWCODE_CLIENT"] ?? "cli"
  },
}
