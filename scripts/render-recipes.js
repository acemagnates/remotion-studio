const { execSync } = require('child_process');
const fs = require('fs');

const clips = [
  { id: 'CounterRoll', transparent: false },
  { id: 'LowerThird', transparent: true },
  { id: 'SplitReveal', transparent: false },
  { id: 'EvidenceCard', transparent: true },
  { id: 'ShatterBurst', transparent: false },
  { id: 'TerminalType', transparent: true },
  { id: 'DataTheater', transparent: false },
  { id: 'GlitchInterference', transparent: false },
  { id: 'ParticleDrift', transparent: true },
  { id: 'KintsugiReveal', transparent: false },
];

const outputDir = 'renders/recipe-batch';
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

clips.forEach(clip => {
  console.log(`Rendering ${clip.id}...`);
  try {
    if (clip.transparent) {
      execSync(`npx remotion render src/index.ts ${clip.id} ${outputDir}/${clip.id}.mov --image-format=png --codec=prores --prores-profile=4444 --pixel-format=yuva444p10le`, { stdio: 'inherit' });
    } else {
      execSync(`npx remotion render src/index.ts ${clip.id} ${outputDir}/${clip.id}.mp4`, { stdio: 'inherit' });
    }
    console.log(`Successfully rendered ${clip.id}`);
  } catch (error) {
    console.error(`Failed to render ${clip.id}:`, error.message);
  }
});
