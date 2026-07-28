<p align="center">
  <a href="https://dewcode.dev">
    <picture>
      <source srcset="packages/console/app/src/asset/logo-ornate-dark.svg" media="(prefers-color-scheme: dark)">
      <source srcset="packages/console/app/src/asset/logo-ornate-light.svg" media="(prefers-color-scheme: light)">
      <img src="packages/console/app/src/asset/logo-ornate-light.svg" alt="DEWCode logo">
    </picture>
  </a>
</p>
<p align="center">DEWCode je open source AI agent za programiranje.</p>
<p align="center">
  <a href="https://dewcode.dev/discord"><img alt="Discord" src="https://img.shields.io/discord/1391832426048651334?style=flat-square&label=discord" /></a>
  <a href="https://www.npmjs.com/package/dewcode-ai"><img alt="npm" src="https://img.shields.io/npm/v/dewcode-ai?style=flat-square" /></a>
  <a href="https://github.com/dedenwirjadinata/dewcode/actions/workflows/publish.yml"><img alt="Build status" src="https://img.shields.io/github/actions/workflow/status/dedenwirjadinata/dewcode/publish.yml?style=flat-square&branch=dev" /></a>
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

[![DEWCode Terminal UI](packages/web/src/assets/lander/screenshot.png)](https://dewcode.dev)

---

### Instalacija

```bash
# YOLO
curl -fsSL https://dewcode.dev/install | bash

# Package manageri
npm i -g dewcode-ai@latest        # ili bun/pnpm/yarn
scoop install dewcode             # Windows
choco install dewcode             # Windows
brew install anomalyco/tap/dewcode # macOS i Linux (preporučeno, uvijek ažurno)
brew install dewcode              # macOS i Linux (zvanična brew formula, rjeđe se ažurira)
sudo pacman -S dewcode            # Arch Linux (Stable)
paru -S dewcode-bin               # Arch Linux (Latest from AUR)
mise use -g dewcode               # Bilo koji OS
nix run nixpkgs#dewcode           # ili github:dedenwirjadinata/dewcode za najnoviji dev branch
```

> [!TIP]
> Ukloni verzije starije od 0.1.x prije instalacije.

### Desktop aplikacija (BETA)

DEWCode je dostupan i kao desktop aplikacija. Preuzmi je direktno sa [stranice izdanja](https://github.com/dedenwirjadinata/dewcode/releases) ili sa [dewcode.dev/download](https://dewcode.dev/download).

| Platforma             | Preuzimanje                        |
| --------------------- | ---------------------------------- |
| macOS (Apple Silicon) | `dewcode-desktop-mac-arm64.dmg`   |
| macOS (Intel)         | `dewcode-desktop-mac-x64.dmg`     |
| Windows               | `dewcode-desktop-windows-x64.exe` |
| Linux                 | `.deb`, `.rpm`, ili AppImage       |

```bash
# macOS (Homebrew)
brew install --cask dewcode-desktop
# Windows (Scoop)
scoop bucket add extras; scoop install extras/dewcode-desktop
```

#### Instalacijski direktorij

Instalacijska skripta koristi sljedeći redoslijed prioriteta za putanju instalacije:

1. `$DEWCODE_INSTALL_DIR` - Prilagođeni instalacijski direktorij
2. `$XDG_BIN_DIR` - Putanja usklađena sa XDG Base Directory specifikacijom
3. `$HOME/bin` - Standardni korisnički bin direktorij (ako postoji ili se može kreirati)
4. `$HOME/.dewcode/bin` - Podrazumijevana rezervna lokacija

```bash
# Primjeri
DEWCODE_INSTALL_DIR=/usr/local/bin curl -fsSL https://dewcode.dev/install | bash
XDG_BIN_DIR=$HOME/.local/bin curl -fsSL https://dewcode.dev/install | bash
```

### Agenti

DEWCode uključuje dva ugrađena agenta između kojih možeš prebacivati tasterom `Tab`.

- **build** - Podrazumijevani agent sa punim pristupom za razvoj
- **plan** - Agent samo za čitanje za analizu i istraživanje koda
  - Podrazumijevano zabranjuje izmjene datoteka
  - Traži dozvolu prije pokretanja bash komandi
  - Idealan za istraživanje nepoznatih codebase-ova ili planiranje izmjena

Uključen je i **general** pod-agent za složene pretrage i višekoračne zadatke.
Koristi se interno i može se pozvati pomoću `@general` u porukama.

Saznaj više o [agentima](https://dewcode.dev/docs/agents).

### Dokumentacija

Za više informacija o konfiguraciji DEWCode-a, [**pogledaj dokumentaciju**](https://dewcode.dev/docs).

### Doprinosi

Ako želiš doprinositi DEWCode-u, pročitaj [upute za doprinošenje](./CONTRIBUTING.md) prije slanja pull requesta.

### Gradnja na DEWCode-u

Ako radiš na projektu koji je povezan s DEWCode-om i koristi "dewcode" kao dio naziva, npr. "dewcode-dashboard" ili "dewcode-mobile", dodaj napomenu u svoj README da projekat nije napravio DEWCode tim i da nije povezan s nama.

---

**Pridruži se našoj zajednici** [Discord](https://discord.gg/dewcode) | [X.com](https://x.com/dewcode)
