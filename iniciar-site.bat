@echo off
cd /d "%~dp0"
if not exist node_modules (
  echo Instalando dependencias...
  call npm install
  if errorlevel 1 goto erro
)
echo Iniciando projeto Mimo Gelato...
call npm run dev
pause
exit /b
:erro
echo Erro ao instalar dependencias. Verifique Node.js e sua conexao.
pause
