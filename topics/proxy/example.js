// A Proxy object wraps another object and intercepts operations,
// like reading/writing properties and others.

const target = {};

const proxy = new Proxy(target, {});

proxy.text = 'hello there!';

console.log('From proxy:', proxy.text);

console.log('From target:', target.text);

for (const key in proxy) {
  console.log(key);
}
