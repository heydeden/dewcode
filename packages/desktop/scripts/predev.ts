import { $ } from "bun"

await $`bun run install-electron`

await $`bun ./scripts/copy-icons.ts ${process.env.DEWCODE_CHANNEL ?? "dev"}`

await $`cd ../dewcode && bun script/build-node.ts`
