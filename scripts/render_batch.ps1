$batchDir = "renders/batch_motion_graphics"
if (!(Test-Path $batchDir)) { New-Item -ItemType Directory -Path $batchDir }

$solidClips = @("clip-01-MG", "clip-03-MG", "clip-07-MG", "clip-10-MG", "clip-11-MG", "clip-13-MG", "clip-15-MG", "clip-17-MG", "clip-20-MG")
$transparentClips = @("clip-05-MG-transparent", "clip-08-MG-transparent", "clip-12-MG-transparent", "clip-18-MG-transparent")

foreach ($clip in $solidClips) {
    Write-Host "Rendering Solid Clip: $clip"
    npx remotion render src/index.ts $clip "$batchDir/$clip.mp4"
}

foreach ($clip in $transparentClips) {
    Write-Host "Rendering Transparent Clip: $clip"
    npx remotion render src/index.ts $clip "$batchDir/$clip.mov" --image-format=png --codec=prores --prores-profile=4444 --pixel-format=yuva444p10le
}

Write-Host "Batch Render Complete. Clips are in $batchDir"
