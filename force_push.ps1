Set-Location -Path "C:\Users\Ace\Documents\gem\remotion-studio"
git add .github/workflows/render-batch.yml .github/workflows/render.yml remotion.config.ts scripts/renderAll.mjs
git commit -m "chore: OVERRIDE ALL - Apply Bulletproof Matrix and Webpack Bypass"
git push origin main -f
git push origin main:master -f
