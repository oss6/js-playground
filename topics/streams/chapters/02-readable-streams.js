const fs = require('fs');
const path = require('path');
const { Readable } = require('stream');

const readableStreamsFromFiles = () => {
  // # Creating readale streams from files
  const readable = fs.createReadStream(path.join(__dirname, 'assets', 'test.txt'), { encoding: 'utf-8' });

  async function logChunks(stream) {
    for await (const chunk of stream) {
      console.log(chunk);
    }
  }

  logChunks(readable);
}

const readableStreamsFromIterables = () => {
  // # Creating readable streams from iterables
  async function * generate() {
    yield 'hello';
    yield 'world!';
  }

  const readable = Readable.from(generate());

  readable.on('data', (chunk) => {
    console.log(chunk);
  });
};

module.exports = [readableStreamsFromFiles, readableStreamsFromIterables];
