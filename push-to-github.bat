@echo off
cd /d "%~dp0"
echo ========================================================
echo Pushing Funzo to GitHub: sakshijain050896-prog/funzo
echo ========================================================
git push -u origin main
echo.
echo If a browser window opened, click 'Authorize git credential manager'.
echo.
echo ========================================================
echo Finished! Check your repository at:
echo https://github.com/sakshijain050896-prog/funzo
echo ========================================================
pause
