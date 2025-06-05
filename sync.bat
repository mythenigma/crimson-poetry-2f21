@echo off
cd /d "c:\Users\Administrator\Documents\GitHub\crimson-poetry-2f21"

echo Checking git status...
git --no-pager status

echo Adding all files...
git add -A

echo Committing changes...
git commit -m "Complete MaiPDF content transformation - final sync"

echo Pushing to GitHub...
git push origin main

echo Sync completed successfully!
pause
