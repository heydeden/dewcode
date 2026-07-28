<p align="center">
  <a href="https://dewcode.dev">
    <picture>
      <source srcset="packages/console/app/src/asset/logo-ornate-dark.svg" media="(prefers-color-scheme: dark)">
      <source srcset="packages/console/app/src/asset/logo-ornate-light.svg" media="(prefers-color-scheme: light)">
      <img src="packages/console/app/src/asset/logo-ornate-light.svg" alt="DEWCode logo">
    </picture>
  </a>
</p>
<p align="center">Открытый AI-агент для программирования.</p>
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

### Установка

```bash
# YOLO
curl -fsSL https://dewcode.dev/install | bash

# Менеджеры пакетов
npm i -g dewcode-ai@latest        # или bun/pnpm/yarn
scoop install dewcode             # Windows
choco install dewcode             # Windows
brew install anomalyco/tap/dewcode # macOS и Linux (рекомендуем, всегда актуально)
brew install dewcode              # macOS и Linux (официальная формула brew, обновляется реже)
sudo pacman -S dewcode            # Arch Linux (Stable)
paru -S dewcode-bin               # Arch Linux (Latest from AUR)
mise use -g dewcode               # любая ОС
nix run nixpkgs#dewcode           # или github:dedenwirjadinata/dewcode для самой свежей ветки dev
```

> [!TIP]
> Перед установкой удалите версии старше 0.1.x.

### Десктопное приложение (BETA)

DEWCode также доступен как десктопное приложение. Скачайте его со [страницы релизов](https://github.com/dedenwirjadinata/dewcode/releases) или с [dewcode.dev/download](https://dewcode.dev/download).

| Платформа             | Загрузка                           |
| --------------------- | ---------------------------------- |
| macOS (Apple Silicon) | `dewcode-desktop-mac-arm64.dmg`   |
| macOS (Intel)         | `dewcode-desktop-mac-x64.dmg`     |
| Windows               | `dewcode-desktop-windows-x64.exe` |
| Linux                 | `.deb`, `.rpm` или AppImage        |

```bash
# macOS (Homebrew)
brew install --cask dewcode-desktop
# Windows (Scoop)
scoop bucket add extras; scoop install extras/dewcode-desktop
```

#### Каталог установки

Скрипт установки выбирает путь установки в следующем порядке приоритета:

1. `$DEWCODE_INSTALL_DIR` - Пользовательский каталог установки
2. `$XDG_BIN_DIR` - Путь, совместимый со спецификацией XDG Base Directory
3. `$HOME/bin` - Стандартный каталог пользовательских бинарников (если существует или можно создать)
4. `$HOME/.dewcode/bin` - Fallback по умолчанию

```bash
# Примеры
DEWCODE_INSTALL_DIR=/usr/local/bin curl -fsSL https://dewcode.dev/install | bash
XDG_BIN_DIR=$HOME/.local/bin curl -fsSL https://dewcode.dev/install | bash
```

### Agents

В DEWCode есть два встроенных агента, между которыми можно переключаться клавишей `Tab`.

- **build** - По умолчанию, агент с полным доступом для разработки
- **plan** - Агент только для чтения для анализа и изучения кода
  - По умолчанию запрещает редактирование файлов
  - Запрашивает разрешение перед выполнением bash-команд
  - Идеален для изучения незнакомых кодовых баз или планирования изменений

Также включен сабагент **general** для сложных поисков и многошаговых задач.
Он используется внутренне и может быть вызван в сообщениях через `@general`.

Подробнее об [agents](https://dewcode.dev/docs/agents).

### Документация

Больше информации о том, как настроить DEWCode: [**наши docs**](https://dewcode.dev/docs).

### Вклад

Если вы хотите внести вклад в DEWCode, прочитайте [contributing docs](./CONTRIBUTING.md) перед тем, как отправлять pull request.

### Разработка на базе DEWCode

Если вы делаете проект, связанный с DEWCode, и используете "dewcode" как часть имени (например, "dewcode-dashboard" или "dewcode-mobile"), добавьте примечание в README, чтобы уточнить, что проект не создан командой DEWCode и не аффилирован с нами.

---

**Присоединяйтесь к нашему сообществу** [Discord](https://discord.gg/dewcode) | [X.com](https://x.com/dewcode)
