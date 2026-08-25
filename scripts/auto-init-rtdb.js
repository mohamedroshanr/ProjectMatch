const { spawn } = require('child_process');

const p = spawn('firebase', ['init', 'database', '--project', 'projectmatch-roshan'], {
  env: process.env,
});

p.stdout.on('data', (data) => {
  const output = data.toString();
  process.stdout.write(output);
  
  if (output.includes('Please choose the location')) {
    p.stdin.write('\n'); // Select default location
  } else if (output.includes('What file should be used for Realtime Database Security Rules')) {
    p.stdin.write('database.rules.json\n');
  } else if (output.includes('File database.rules.json already exists. Overwrite?')) {
    p.stdin.write('N\n');
  }
});

p.stderr.on('data', (data) => {
  process.stderr.write(data);
});

p.on('close', (code) => {
  console.log(`process exited with code ${code}`);
});
