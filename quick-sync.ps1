Set-Location "c:\Users\Administrator\Documents\GitHub\crimson-poetry-2f21"
$env:GIT_PAGER = ""
Write-Host "Adding files..."
& git add .
Write-Host "Committing changes..."
& git commit -m "Complete MaiPDF transformation - sync all changes"
Write-Host "Pushing to GitHub..."
& git push origin main
Write-Host "Sync completed successfully!"
