const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

async function syncRender() {
  const composeId = process.argv[2] || 'AgeOfAgenticCoding';
  const outFolder = path.join(__dirname, '..', 'videos');
  
  if (!fs.existsSync(outFolder)) {
    fs.mkdirSync(outFolder);
  }

  console.log(`🚀 Triggering online render for "${composeId}"...`);
  
  try {
    // 1. Trigger the workflow
    execSync(`gh workflow run cloud-render.yml -f composition=${composeId}`, { stdio: 'inherit' });
    
    console.log("⏳ Waiting for GitHub Actions to pick up the job...");
    // Wait a few seconds for GitHub to register the run
    await new Promise(r => setTimeout(r, 8000));

    // 2. Watch the run
    console.log("👁️ Watching the live render status (this will block until done)...");
    execSync(`gh run watch`, { stdio: 'inherit' });

    // 3. Download the artifact
    console.log("📥 Render finished! Downloading result...");
    // Get the ID of the latest run to be sure
    const latestRunId = execSync(`gh run list --workflow render.yml --limit 1 --json databaseId --jq .[0].databaseId`).toString().trim();
    
    // Download into a temporary folder first
    const tempDir = path.join(outFolder, 'temp_dl');
    if (!fs.existsSync(tempDir)) fs.mkdirSync(tempDir);
    
    execSync(`gh run download ${latestRunId} -n rendered-video -D ${tempDir}`, { stdio: 'inherit' });

    // 4. Move to final destination
    const sourceFile = path.join(tempDir, 'video.mp4');
    const finalFile = path.join(outFolder, `render-cloud-${Date.now()}.mp4`);
    
    if (fs.existsSync(sourceFile)) {
      fs.renameSync(sourceFile, finalFile);
      console.log(`✅ Success! Video downloaded to: ${finalFile}`);
    } else {
      console.error("❌ Error: Could not find the downloaded video.mp4 file in the artifact.");
    }

    // Cleanup
    fs.rmSync(tempDir, { recursive: true, force: true });

  } catch (error) {
    console.error("❌ Synchronization failed:", error.message);
    process.exit(1);
  }
}

syncRender();
