interface ImportMetaEnv {
  readonly DEWCODE_CHANNEL: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

declare module "virtual:dewcode-server" {
  export namespace Server {
    export const listen: typeof import("../../../dewcode/dist/types/src/node").Server.listen
    export type Listener = import("../../../dewcode/dist/types/src/node").Server.Listener
  }
  export namespace Config {
    export const get: typeof import("../../../dewcode/dist/types/src/node").Config.get
    export type Info = import("../../../dewcode/dist/types/src/node").Config.Info
  }
  export const bootstrap: typeof import("../../../dewcode/dist/types/src/node").bootstrap
}
