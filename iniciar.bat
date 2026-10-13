@echo off
cd /d "%~dp0"
where py >nul 2>nul
if not errorlevel 1 (
  py scripts\servir.py
) else (
  python scripts\servir.py
)
if errorlevel 1 pause
