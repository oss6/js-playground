From the Node API documentation (https://nodejs.org/api/stream.html) _a stream is an abstract interface for working with streaming data in Node.js_.

Streams are used to read from input or write to output sequentially. Most of the time, streams are used to read or write from a continuous source or a comparably big one.

Streams in Node.js inherit from `EventEmitter`, hence making them event-based.

There are 4 type of streams in Node.js:

- **Writable** - used to write data sequentially
- **Readable** - used to read data sequentially
- **Duplex** - used to both read and write data sequentially (e.g. TCP sockets)
- **Transform** - data can be modified when writing or reading (e.g. compression)
