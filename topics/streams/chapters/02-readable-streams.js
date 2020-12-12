const fs = require('fs');
const path = require('path');

const readableStreams = () => {
  const readable = fs.createReadStream(path.join(__dirname, 'assets', 'test.txt'), { encoding: 'utf-8' });

  async function logChunks(stream) {
    for await (const chunk of stream) {
      console.log(chunk);
    }
  }

  logChunks(readable);
}

module.exports = [readableStreams];
