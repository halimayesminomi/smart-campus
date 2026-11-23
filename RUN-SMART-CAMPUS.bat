@echo off
title Smart Campus Management System
where mvn >nul 2>nul
if %errorlevel%==0 (
  echo Starting Smart Campus with Maven...
  mvn spring-boot:run
) else (
  echo Maven was not found in PATH.
  echo Open this folder in VS Code and run: mvn spring-boot:run
  echo If you use Maven Wrapper, run: .\mvnw.cmd spring-boot:run
)
pause
