const fs = require('fs');
const path = require('path');

const writeDataToStream = () => {
  // # Write data to file write stream

  const file = fs.createWriteStream(path.join(__dirname, 'assets', 'file.txt'));

  file.write('hello world');

  // Remember to `.end()` your streams after you're done using them.

  file.end(', from streams!');
}

module.exports = [writeDataToStream];
