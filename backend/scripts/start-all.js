const { spawn } = require('child_process');

const services = [
  'start:masters',
  'start:opd',
  'start:ipd',
  'start:billing',
  'start:nursing',
  'start:lab',
  'start:pharmacy',
  'start:radiology',
  'start:gateway'
];

services.forEach((script) => {
  const processRef = spawn('npm', ['run', script], {
    stdio: 'inherit',
    shell: true
  });

  processRef.on('error', (error) => {
    console.error(`${script} failed:`, error.message);
  });
});
