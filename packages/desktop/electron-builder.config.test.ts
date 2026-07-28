import { expect, test } from "bun:test"
import type { Configuration } from "electron-builder"

const legacyDesktopEntry = "resources/linux/dewcode-desktop.desktop"

const channels = [
  { channel: "dev", appId: "ai.dewcode.desktop.dev" },
  { channel: "beta", appId: "ai.dewcode.desktop.beta" },
  { channel: "prod", appId: "ai.dewcode.desktop" },
] as const

for (const channel of channels) {
  test(`uses one Linux desktop identity for ${channel.channel}`, async () => {
    const previous = process.env.DEWCODE_CHANNEL
    process.env.DEWCODE_CHANNEL = channel.channel

    const module = await import(`./electron-builder.config.ts?channel=${channel.channel}`)
    const config = module.default as Configuration

    if (previous === undefined) delete process.env.DEWCODE_CHANNEL
    else process.env.DEWCODE_CHANNEL = previous

    expect(config.appId).toBe(channel.appId)
    expect(config.extraMetadata?.desktopName).toBe(`${channel.appId}.desktop`)
    expect(config.linux?.executableName).toBe(channel.appId)
    expect(config.linux?.desktop?.entry?.StartupWMClass).toBe(channel.appId)
    expect(config.deb?.fpm).toContainEqual(expect.stringContaining(`/usr/share/metainfo/${channel.appId}.metainfo.xml`))
    expect(config.rpm?.fpm).toContainEqual(expect.stringContaining(`/usr/share/metainfo/${channel.appId}.metainfo.xml`))
  })
}

test("keeps a hidden prod launcher for old Linux pins", async () => {
  const previous = process.env.DEWCODE_CHANNEL
  process.env.DEWCODE_CHANNEL = "prod"

  const module = await import("./electron-builder.config.ts?compat=prod")
  const config = module.default as Configuration

  if (previous === undefined) delete process.env.DEWCODE_CHANNEL
  else process.env.DEWCODE_CHANNEL = previous

  expect(
    config.deb?.fpm?.some((entry) =>
      entry.endsWith("dewcode-desktop.desktop=/usr/share/applications/dewcode-desktop.desktop"),
    ),
  ).toBe(true)
  expect(
    config.rpm?.fpm?.some((entry) =>
      entry.endsWith("dewcode-desktop.desktop=/usr/share/applications/dewcode-desktop.desktop"),
    ),
  ).toBe(true)

  const desktop = await Bun.file(legacyDesktopEntry).text()
  expect(desktop).toContain("Exec=/opt/DEWCode/ai.dewcode.desktop %U")
  expect(desktop).toContain("Icon=ai.dewcode.desktop")
  expect(desktop).toContain("StartupWMClass=ai.dewcode.desktop")
  expect(desktop).toContain("NoDisplay=true")
})
