<p align="center"><strong>DEWCode</strong> — AI coding assistant in your terminal.</p>

<p align="center">
  <a href="https://github.com/heydeden/dewcode"><img alt="GitHub" src="https://img.shields.io/github/stars/heydeden/dewcode?style=flat-square" /></a>
  <a href="https://github.com/heydeden/dewcode/blob/main/LICENSE"><img alt="License" src="https://img.shields.io/github/license/heydeden/dewcode?style=flat-square" /></a>
</p>

---

**DEWCode** is an AI coding assistant for the terminal. Built as a fork of [opencode](https://github.com/anomalyco/opencode), customized with DEWCode branding and 9router provider integration.

## Features

- **Interactive TUI** — Full terminal UI with agent/tool switching
- **Multi-agent** — Switch between built-in agents for different tasks
- **MCP Support** — Model Context Protocol server integration
- **Multi-provider** — Supports OpenAI, Anthropic, Google, and 9router
- **Cross-platform** — Works on Linux, macOS, Windows, and Termux

## Install

Binary releases are built automatically from the `main` branch via GitHub Actions and attached to
[GitHub Releases](https://github.com/heydeden/dewcode/releases).

### Linux / macOS (binary)

```bash
curl -fsSL https://raw.githubusercontent.com/heydeden/dewcode/main/install | bash
dewcode
```

### Windows (binary)

```powershell
irm https://raw.githubusercontent.com/heydeden/dewcode/main/install.ps1 | iex
dewcode
```

### From source

Requires [Bun](https://bun.sh) 1.3+:

```bash
git clone https://github.com/heydeden/dewcode
cd dewcode
bun install
cd packages/dewcode
bun run build --single --skip-embed-web-ui   # binary at dist/dewcode-<os>-<arch>/bin/
```

For day-to-day development, `bun dev` from `packages/dewcode` runs the TUI directly from source.

## Update

- **Binary installs** — `dewcode upgrade` re-runs the installer and fetches the latest release.
  The TUI also offers an auto-update prompt when a new release is published.
- **From source** — `git pull` then `bun install` (rebuild with `bun run build` if you installed
  the compiled binary).

## Quick Start

```bash
dewcode                          # start interactive TUI
dewcode -m provider/model        # start with specific model
dewcode -c                       # continue last session
dewcode doctor                   # check install status
dewcode models list              # list available models
```

## Configuration

API key and model are configured via config file or environment variables.

### Config File

Located at `~/.config/dewcode/dewcode.json`:

```json
{
  "enabled_providers": ["9router"],
  "provider": {
    "9router": {
      "npm": "@ai-sdk/openai-compatible",
      "options": {
        "baseURL": "http://127.0.0.1:20128/v1"
      }
    }
  }
}
```

### Environment Variables

```bash
DEWCODE_API_KEY=your-api-key
DEWCODE_BASE_URL=http://127.0.0.1:20128/v1
```

### Running 9router

DEWCode uses [9router](https://github.com/heydeden/9router) as its default provider.

```bash
npm install -g 9router
node $(npm root -g)/9router/cli.js --tray --skip-update -p 20128
```

## CLI Commands

| Command | Description |
|---------|-------------|
| `dewcode` | Start interactive TUI |
| `dewcode doctor` | Check install status |
| `dewcode models list` | List available models |
| `dewcode config set` | Set configuration |
| `dewcode mcp add` | Add MCP server |
| `dewcode mcp list` | List MCP servers |
| `dewcode agent create` | Create a new agent |
| `dewcode skill list` | List available skills |
| `dewcode export` | Export session data |
| `dewcode pr <number>` | Checkout and run from PR |
| `dewcode upgrade` | Upgrade DEWCode |

## Project Structure

```
dewcode/
├── packages/dewcode/   # CLI entry point & core
├── packages/core/      # Core logic
├── packages/tui/       # Terminal UI components
├── packages/ui/        # Shared UI primitives
├── packages/plugin/    # Plugin system
├── packages/llm/       # LLM provider integration
├── packages/sdk/       # SDK
├── packages/server/    # Server
└── packages/schema/    # Type schemas
```

## Development

```bash
bun dev                  # start dev TUI
bun turbo typecheck      # type check all packages
bun lint                 # lint code
```

## License

MIT
