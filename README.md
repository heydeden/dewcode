<p align="center"><strong>DEWCode</strong> — AI coding assistant in your terminal.</p>

<p align="center">
  <a href="https://github.com/heydeden/dewcode"><img alt="GitHub" src="https://img.shields.io/github/stars/heydeden/dewcode?style=flat-square" /></a>
  <a href="https://github.com/heydeden/dewcode/blob/main/LICENSE"><img alt="License" src="https://img.shields.io/github/license/heydeden/dewcode?style=flat-square" /></a>
</p>

---

**DEWCode** is a terminal AI coding assistant with two modes: **Plan** (read-only) and **Build** (full access). It includes a multi-agent system, skill system, and supports 9router as its default provider.

## Features

- **Plan Mode** — Read-only analysis, safe for exploring unfamiliar codebases
- **Build Mode** — Full access to read, write, and execute code
- **Multi-agent** — Switch between specialized agents with different capabilities
- **Skill System** — Load technical skills on-demand (security, API, cloud, etc.)
- **Cross-platform** — Works on Linux, macOS, Windows, and Termux

## Install

### From Source (recommended)

**Prerequisites:** [Node.js](https://nodejs.org) 18+ and [Bun](https://bun.sh) (for dev mode)

```bash
git clone https://github.com/heydeden/dewcode
cd dewcode
bun install
bun dev
```

### Global Install (for daily use)

```bash
git clone https://github.com/heydeden/dewcode
cd dewcode
bun install
npm install -g .
dewcode  # runs from anywhere
```

### Curl Install (Linux/macOS)

```bash
curl -fsSL https://raw.githubusercontent.com/heydeden/dewcode/main/install | bash
```

## Quick Start

```bash
dewcode                        # interactive mode
dewcode -t "explain main.go"   # single task
dewcode --doctor               # check install status
```

### Commands

| Command | Description |
|---------|-------------|
| `/plan` | Switch to plan mode (read-only) |
| `/build` | Switch to build mode (full access) |
| `/mode` | Show current mode |
| `/skill <name>` | Load a skill |
| `/skills` | List available skills |
| `/unskill <name>` | Unload a skill |
| `/agent <name>` | Switch agent |
| `/agents` | List agents |
| `/default` | Back to default |
| `/clear` | Reset conversation |
| `/help` | Show help |
| `/exit` | Exit |

### Available Agents

- `@fullstack-developer` — Full-stack development agent
- `@sec-bounty` — Bug bounty hunting agent
- `@sec-web` — Web security audit agent
- `@sec-polar` — Hunt-fix cycle agent

### Available Skills

- `sec-api` — API security testing
- `sec-recon` — Reconnaissance & OSINT
- `sec-exploit` — Exploit payloads & techniques
- `sec-cloud` — Cloud attack vectors
- `sec-bypass` — WAF & filter bypass
- `sec-proxy` — Proxy & Tor configuration
- `md2pdf` — Markdown to PDF conversion

## Configuration

### API Key

```bash
# Option 1: CLI flags
dewcode --api-key <key> --model <model>

# Option 2: Environment variables
export DEWCODE_API_KEY=<key>
export DEWCODE_MODEL=<model>

# Option 3: Config file (~/.config/dewcode/dewcode.json)
```

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

### Running 9router

DEWCode uses [9router](https://github.com/heydeden/9router) as its default provider.

```bash
# Install 9router
npm install -g 9router

# Run 9router (default port 20128)
node $(npm root -g)/9router/cli.js --tray --skip-update -p 20128
```

## Project Structure

```
dewcode/
├── packages/dewcode/   # CLI & TUI entry point
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
# Dev mode (interactive TUI)
bun dev

# Type check
bun turbo typecheck

# Lint
bun lint
```

## License

MIT
