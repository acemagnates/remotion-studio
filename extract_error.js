const fs = require('fs');
try {
  let content = fs.readFileSync('failed.txt', 'utf8');
  const lines = content.split('\n');
  const errors = lines.filter(l => /error|fail/i.test(l) && !l.includes('Render Solid Clip (MP4)'));
  fs.writeFileSync('filtered.txt', errors.join('\n'));
} catch (e) {
  console.error(e);
}
