#!/usr/bin/env powershell
Set-Location "c:\Users\Administrator\Documents\GitHub\crimson-poetry-2f21"

# Set git to not use pager
$env:GIT_PAGER = ""

Write-Host "Checking git status..."
git status

Write-Host "Adding all files..."
git add -A

Write-Host "Checking for changes to commit..."
$status = git status --porcelain
if ($status) {
    Write-Host "Changes found, committing..."
    git commit -m "Complete MaiPDF transformation - sync all changes"
    
    Write-Host "Pushing to GitHub..."
    git push origin main
    Write-Host "Successfully synced to GitHub!"
} else {
    Write-Host "No changes to commit. Checking if we need to push..."
    $ahead = git rev-list --count origin/main..HEAD
    if ($ahead -gt 0) {
        Write-Host "Local commits found, pushing to GitHub..."
        git push origin main
        Write-Host "Successfully synced to GitHub!"
    } else {
        Write-Host "Already up to date with GitHub."
    }
}

Write-Host "Sync operation completed."
