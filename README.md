<p align="center"><strong>DEWCode</strong> — The open source AI coding agent.</p>
<p align="center">
  <a href="https://github.com/heydeden/dewcode"><img alt="GitHub" src="https://img.shields.io/github/stars/heydeden/dewcode?style=flat-square" /></a>
  <a href="https://www.npmjs.com/package/dewcode-ai"><img alt="npm" src="https://img.shields.io/npm/v/dewcode-ai?style=flat-square" /></a>
  <a href="https://github.com/heydeden/dewcode/actions/workflows/build.yml"><img alt="Build status" src="https://img.shields.io/github/actions/workflow/status/heydeden/dewcode/build.yml?style=flat-square&branch=main" /></a>
</p>

<p align="center">
  <a href="README.md">English</a> |
  <a href="README.zh.md">简体中文</a> |
  <a href="README.zht.md">繁體中文</a> |
  <a href="README.ko.md">한국어</a> |
  <a href="README.de.md">Deutsch</a> |
  <a href="README.es.md">Español</a> |
  <a href="README.fr.md">Français</a> |
  <a href="README.it.md">Italiano</a> |
  <a href="README.da.md">Dansk</a> |
  <a href="README.ja.md">日本語</a> |
  <a href="README.pl.md">Polski</a> |
  <a href="README.ru.md">Русский</a> |
  <a href="README.bs.md">Bosanski</a> |
  <a href="README.ar.md">العربية</a> |
  <a href="README.no.md">Norsk</a> |
  <a href="README.br.md">Português (Brasil)</a> |
  <a href="README.th.md">ไทย</a> |
  <a href="README.tr.md">Türkçe</a> |
  <a href="README.uk.md">Українська</a> |
  <a href="README.bn.md">বাংলা</a> |
  <a href="README.gr.md">Ελληνικά</a> |
  <a href="README.vi.md">Tiếng Việt</a>
</p>

[![DEWCode Terminal UI](packages/web/src/assets/lander/screenshot.png)](https://github.com/heydeden/dewcode)

---

### Installation

```bash
# YOLO
curl -fsSL https://raw.githubusercontent.com/heydeden/dewcode/main/install | bash

# Package managers
npm i -g dewcode-ai@latest        # or bun/pnpm/yarn
scoop install dewcode             # Windows
choco install dewcode             # Windows
brew install heydeden/tap/dewcode # macOS and Linux (recommended, always up to date)
brew install dewcode              # macOS and Linux (official brew formula, updated less)
sudo pacman -S dewcode            # Arch Linux (Stable)
paru -S dewcode-bin               # Arch Linux (Latest from AUR)
mise use -g dewcode               # Any OS
nix run nixpkgs#dewcode           # or github:heydeden/dewcode for latest dev branch
```

> [!TIP]
> Remove versions older than 0.1.x before installing.

### Desktop App (BETA)

DEWCode is also available as a desktop application. Download directly from the [releases page](https://github.com/heydeden/dewcode/releases).

| Platform              | Download                           |
| --------------------- | ---------------------------------- |
| macOS (Apple Silicon) | `dewcode-desktop-mac-arm64.dmg`   |
| macOS (Intel)         | `dewcode-desktop-mac-x64.dmg`     |
| Windows               | `dewcode-desktop-windows-x64.exe` |
| Linux                 | `.deb`, `.rpm`, or `.AppImage`     |

```bash
# macOS (Homebrew)
brew install --cask dewcode-desktop
# Windows (Scoop)
scoop bucket add extras; scoop install extras/dewcode-desktop
```

#### Installation Directory

The install script respects the following priority order for the installation path:

1. `$DEWCODE_INSTALL_DIR` - Custom installation directory
2. `$XDG_BIN_DIR` - XDG Base Directory Specification compliant path
3. `$HOME/bin` - Standard user binary directory (if it exists or can be created)
4. `$HOME/.dewcode/bin` - Default fallback

```bash
# Examples
DEWCODE_INSTALL_DIR=/usr/local/bin curl -fsSL https://raw.githubusercontent.com/heydeden/dewcode/main/install | bash
XDG_BIN_DIR=$HOME/.local/bin curl -fsSL https://raw.githubusercontent.com/heydeden/dewcode/main/install | bash
```

### Agents

DEWCode includes two built-in agents you can switch between with the `Tab` key.

- **build** - Default, full-access agent for development work
- **plan** - Read-only agent for analysis and code exploration
  - Denies file edits by default
  - Asks permission before running bash commands
  - Ideal for exploring unfamiliar codebases or planning changes

Also included is a **general** subagent for complex searches and multistep tasks.
This is used internally and can be invoked using `@general` in messages.

Learn more about [agents](https://github.com/heydeden/dewcode).

### Documentation

For more info on how to configure DEWCode, [**head over to our docs**](https://github.com/heydeden/dewcode).

### Contributing

If you're interested in contributing to DEWCode, please read our [contributing docs](./CONTRIBUTING.md) before submitting a pull request.

### Building on DEWCode

If you are working on a project that's related to DEWCode and is using "dewcode" as part of its name, for example "dewcode-dashboard" or "dewcode-mobile", please add a note to your README to clarify that it is not built by the DEWCode team and is not affiliated with us in any way.

---

**Join our community** [Discord](https://discord.gg/dewcode) | [X.com](https://x.com/dewcode)
