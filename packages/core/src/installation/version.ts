declare global {
  const DEWCODE_VERSION: string
  const DEWCODE_CHANNEL: string
}

export const InstallationVersion = typeof DEWCODE_VERSION === "string" ? DEWCODE_VERSION : "local"
export const InstallationChannel = typeof DEWCODE_CHANNEL === "string" ? DEWCODE_CHANNEL : "local"
export const InstallationLocal = InstallationChannel === "local"
