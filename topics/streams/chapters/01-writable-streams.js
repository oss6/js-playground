const fs = require('fs');
const path = require('path');
const util = require('util');
const stream = require('stream');
const { once } = require('events');

const writeDataToStream = () => {
  // # Write data to file write stream

  const file = fs.createWriteStream(path.join(__dirname, 'assets', 'file.txt'));

  file.write('hello world');

  // Remember to `.end()` your streams after you're done using them.

  file.end(', from streams!');
};

const asyncIteratorToWriteToWritableStream = async () => {
  // # Async iterators to write to a writable stream

  // The default version of stream.finished() is callback-based.
  const finished = util.promisify(stream.finished);

  async function writeIterableToFile(iterable, filePath) {
    const writable = fs.createWriteStream(filePath, { encoding: 'utf-8' });

    for await (const chunk of iterable) {
      // Handle backpressure -> buildup of data behind a buffer during data transfer.
      if (!writable.write(chunk)) {
        await once(writable, 'drain');
      }
    }

    // Close stream and wait until writing is done.
    writable.end();

    await finished(writable);
  }

  await writeIterableToFile(['One', ' line of text\n'], path.join(__dirname, 'assets', 'test01.txt'));
};

module.exports = [writeDataToStream, asyncIteratorToWriteToWritableStream];
