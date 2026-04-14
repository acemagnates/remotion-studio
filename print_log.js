const fs = require('fs');
try {
  let content;
  try {
    content = fs.readFileSync('failed_log.txt', 'utf16le');
  } catch(e) {
    content = fs.readFileSync('failed_log.txt', 'utf8');
  }
  const lines = content.split('\n');
  const tail = lines.slice(-200); // just print the last 200 lines
  console.log(tail.join('\n'));
} catch (e) {
  console.error(e);
}
