const changeNotification = () => {
  function observe(obj, callback) {
    return new Proxy(obj, {
      set(target, property, value) {
        callback(property, value);
        target[property] = value;
      }
    });
  }

  const x = { name: 'John' };
  const p = observe(x, (property, value) => console.log(property, value));
  p.name = 'Gianni';
};

module.exports = [changeNotification];
