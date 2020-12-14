const fs = require('fs');
const path = require('path');
const { pipeline } = require('stream');
const zlib = require('zlib');

function pipelines() {
  // # Pipelines
  // Piping is a mechanism where we provide the output of one stream as the input to another stream.
  // Piping is used to process streamed data in multiple steps.

  pipeline(
    fs.createReadStream(path.join(__dirname, 'assets', 'test.txt')),
    zlib.createGzip(),
    fs.createWriteStream(path.join(__dirname, 'assets', 'test.gz')),
    (error) => {
      if (error) {
        console.error('Pipeline failed', error);
      } else {
        console.log('Pipeline succeded');
      }
    }
  )
}

module.exports = [pipelines];
