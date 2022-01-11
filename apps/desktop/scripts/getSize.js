const { readdir, stat } = require('fs/promises');
const { join } = require('path');

const dirSize = async directory => {
  const files = await readdir(directory);
  const stats = files.map(file => stat(join(directory, file)));

  return (await Promise.all(stats)).reduce((accumulator, { size }) => accumulator + size, 0);
};

const baseDir = require('../.electron-builder.config.js')?.directories?.output || 'dist';

const dir = `./${baseDir}/${process.platform}-unpacked`;

dirSize(dir)
  .then(bytes => {
    console.log('\n');
    console.log('Total unpacked size:', (bytes / 1024 / 1024).toFixed(2), 'Mib');
    console.log('\n');
  })
  .catch(err => {
    console.log('Error calculating size:', err);
  });
