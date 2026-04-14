$clips = @(
    "clip-01-MG", "clip-02-MG", "clip-03-MG-transparent", "clip-05-MG-transparent", 
    "clip-06-MG-transparent", "clip-09-MG", "clip-11-MG-transparent", "clip-12-MG", 
    "clip-13-MG", "clip-15-MG-transparent", "clip-17-MG", "clip-18-MG-transparent", 
    "clip-19-MG-transparent"
)

foreach ($id in $clips) {
    echo "Rendering $id..."
    $pixelFormat = "yuv420p"
    if ($id -like "*-transparent") { $pixelFormat = "yuva420p" }
    
    npx remotion render src/index.ts $id "videos/final-clips/$id.webm" --image-format=png --codec=vp9 "--pixel-format=$pixelFormat"
}
