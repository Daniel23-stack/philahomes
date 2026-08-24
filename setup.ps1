# Bootstrap Laravel 11 + install dependencies (requires Docker Desktop OR local PHP+Composer)
$ErrorActionPreference = "Stop"
$Root = $PSScriptRoot
$Parent = Split-Path $Root -Parent

Write-Host "Okuhle Homes - Laravel + Vue setup" -ForegroundColor Cyan

function Test-Docker {
    docker info 2>$null | Out-Null
    return $LASTEXITCODE -eq 0
}

function Invoke-Composer($Args) {
    if (Test-Docker) {
        docker run --rm -v "${Root}:/app" -w /app composer:2 @Args
    } elseif (Get-Command composer -ErrorAction SilentlyContinue) {
        Push-Location $Root
        composer @Args
        Pop-Location
    } else {
        throw "Install Docker Desktop (start it) or install PHP 8.2+ and Composer, then re-run this script."
    }
}

# Step 1: If artisan missing, scaffold Laravel base via Composer (skips existing files)
if (-not (Test-Path "$Root\artisan")) {
    Write-Host "Creating Laravel base (merging missing core files only)..." -ForegroundColor Yellow
    $Temp = Join-Path $env:TEMP "laravel-scaffold-$(Get-Random)"
    New-Item -ItemType Directory -Path $Temp -Force | Out-Null
    if (Test-Docker) {
        docker run --rm -v "${Temp}:/app" -w /app composer:2 create-project laravel/laravel . "11.*" --no-interaction --prefer-dist
    } else {
        composer create-project laravel/laravel $Temp "11.*" --no-interaction --prefer-dist
    }
    Get-ChildItem $Temp | ForEach-Object {
        $dest = Join-Path $Root $_.Name
        if (Test-Path $dest) { return }
        Move-Item $_.FullName $dest -Force
    }
    Remove-Item $Temp -Recurse -Force -ErrorAction SilentlyContinue
}

# Step 2: Merge our composer deps
Write-Host "Installing PHP dependencies..." -ForegroundColor Yellow
Invoke-Composer @("install", "--no-interaction")

# Step 3: Env
if (-not (Test-Path "$Root\.env")) {
    Copy-Item "$Root\.env.example" "$Root\.env"
    if (Test-Docker) {
        docker run --rm -v "${Root}:/app" -w /app php:8.3-cli php artisan key:generate
    } else {
        php artisan key:generate
    }
}

# Step 4: Node
Write-Host "Installing Node dependencies..." -ForegroundColor Yellow
Push-Location $Root
npm install
Pop-Location

Write-Host ""
Write-Host "Done. Next steps:" -ForegroundColor Green
Write-Host "  1. Edit .env (DB_* credentials - defaults match docker-compose.yml)"
Write-Host "  2. docker compose up -d db"
Write-Host "  3. php artisan migrate --seed"
Write-Host "  4. npm run dev   (terminal 1)"
Write-Host "  5. php artisan serve   (terminal 2)"
Write-Host "  Open http://localhost:8000"
