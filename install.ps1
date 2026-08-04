param(
    [string]$Version = $env:VERSION,
    [switch]$NoModifyPath
)

$ErrorActionPreference = "Stop"

$App = "dewcode"
$Repo = "heydeden/dewcode"
$InstallDir = Join-Path $HOME ".dewcode\bin"

Write-Host ""
Write-Host "DEWCode Installer"
Write-Host "Usage: irm https://raw.githubusercontent.com/$Repo/main/install.ps1 | iex"
Write-Host "        or: powershell -ExecutionPolicy Bypass -File install.ps1 -Version 1.0.0"
Write-Host ""

New-Item -ItemType Directory -Force -Path $InstallDir | Out-Null

$arch = switch ($env:PROCESSOR_ARCHITECTURE) {
    "AMD64" { "x64" }
    "ARM64" { "arm64" }
    default { throw "Unsupported architecture: $env:PROCESSOR_ARCHITECTURE" }
}
$target = "windows-$arch"
$filename = "$App-$target.zip"

if ([string]::IsNullOrWhiteSpace($Version)) {
    $release = Invoke-RestMethod -Uri "https://api.github.com/repos/$Repo/releases/latest" -Headers @{ "User-Agent" = "$App-installer" }
    $Version = $release.tag_name.TrimStart("v")
    $url = "https://github.com/$Repo/releases/latest/download/$filename"
} else {
    $Version = $Version.TrimStart("v")
    $tagUrl = "https://github.com/$Repo/releases/tag/v$Version"
    try {
        $check = Invoke-WebRequest -Uri $tagUrl -Method Head -UseBasicParsing
        if ($check.StatusCode -eq 404) { throw "Release v$Version not found" }
    } catch {
        throw "Release v$Version not found. See https://github.com/$Repo/releases"
    }
    $url = "https://github.com/$Repo/releases/download/v$Version/$filename"
}

$tmp = Join-Path $env:TEMP "dewcode_install_$PID"
New-Item -ItemType Directory -Force -Path $tmp | Out-Null

try {
    Write-Host "Installing $App v$Version ($target)..."
    $zip = Join-Path $tmp $filename
    Invoke-WebRequest -Uri $url -OutFile $zip -UseBasicParsing
    Expand-Archive -Path $zip -DestinationPath $tmp -Force
    $exe = Get-ChildItem -Path $tmp -Recurse -Filter "dewcode.exe" | Select-Object -First 1
    if (-not $exe) { throw "dewcode.exe not found inside $filename" }
    Copy-Item $exe.FullName (Join-Path $InstallDir "dewcode.exe") -Force
} finally {
    Remove-Item -Recurse -Force $tmp -ErrorAction SilentlyContinue
}

if (-not $NoModifyPath) {
    $userPath = [Environment]::GetEnvironmentVariable("Path", "User")
    if ($userPath -notlike "*$InstallDir*") {
        $next = if ([string]::IsNullOrWhiteSpace($userPath)) { $InstallDir } else { "$InstallDir;$userPath" }
        [Environment]::SetEnvironmentVariable("Path", $next, "User")
        Write-Host "Added $InstallDir to your user PATH. Restart your terminal to use $App."
    }
}

$installed = & (Join-Path $InstallDir "dewcode.exe") --version
Write-Host ""
Write-Host "DEWCode installed successfully: $installed"
Write-Host "Run 'dewcode' to start. Update later with 'dewcode upgrade'."
Write-Host ""
