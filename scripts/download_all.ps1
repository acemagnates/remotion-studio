$folder = "production-clips"
if (!(Test-Path $folder)) { New-Item -ItemType Directory -Path $folder }

$runs = gh run list --workflow render.yml --limit 30 --json databaseId,status,conclusion | ConvertFrom-Json
$successfulRuns = $runs | Where-Object { $_.status -eq "completed" -and $_.conclusion -eq "success" } | Select-Object -First 15

foreach ($run in $successfulRuns) {
    $id = $run.databaseId
    $runFolder = Join-Path $folder $id
    if (!(Test-Path $runFolder)) { New-Item -ItemType Directory -Path $runFolder }
    Write-Host "Downloading run $id into $runFolder..."
    gh run download $id --dir $runFolder
}

Write-Host "Flattening folder..."
# Find all mp4/mov/webm and move them to $folder with unique names
$files = Get-ChildItem $folder -Recurse -Include *.mp4, *.mov, *.webm
foreach ($file in $files) {
    # If the file is in a subfolder, move it up
    if ($file.DirectoryName -ne (Resolve-Path $folder)) {
        # Avoid collisions: use parent folder name or run ID as prefix if redundant
        $newName = "$($file.BaseName)_$($file.Extension)" # placeholder logic
        # Actually, if the file is clip-01.mp4, we'll try to keep that.
        $dest = Join-Path $folder $file.Name
        if (!(Test-Path $dest)) {
            Move-Item $file.FullName $dest
        } else {
             $dest = Join-Path $folder "$($file.BaseName)_$($id)$($file.Extension)"
             Move-Item $file.FullName $dest
        }
    }
}
Write-Host "Done."
