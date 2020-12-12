exports.createContainer = function () {
  let configuration;

  function register(config) {
    configuration = config;
  }

  function resolve(service) {
    if (!configuration[service]) {
      throw new Error('');
    }

    const dependentService = configuration[service]._constructor;
    let dependencies = [];

    switch (configuration[service]._lifetime) {
      case 'transient':
        dependencies = getParameterNames(dependentService).map(resolve);
        return new dependentService(...dependencies);

      case 'singleton':
        if (!configuration[service]._singleton) {
          dependencies = getParameterNames(dependentService).map(resolve);
          configuration[service]._singleton = new dependentService(...dependencies);
        }

        return configuration[service]._singleton;

      default:
        throw new Error('Incorrect lifetime');
    }
  }

  return {
    register,
    resolve
  };
};

exports.asClass = function (_constructor) {
  return {
    _constructor,
    _lifetime: 'transient',
    _singleton: null,
    transient() {
      this._lifetime = 'transient';
      return this;
    },
    singleton() {
      this._lifetime = 'singleton';
      return this;
    }
  };
};

function getParameterNames(func) {
  const STRIP_COMMENTS = /(\/\/.*$)|(\/\*[\s\S]*?\*\/)|(\s*=[^,\)]*(('(?:\\'|[^'\r\n])*')|("(?:\\"|[^"\r\n])*"))|(\s*=[^,\)]*))/mg;
  const ARGUMENT_NAMES = /(?:constructor\s*\((.*?)\))|^function\s*[^\s]*\s*\((.*?)\)|^\((.*?)\).*?=>/;

  const fnStr = func.toString().replace(STRIP_COMMENTS, '');
  let result = fnStr.match(ARGUMENT_NAMES);

  if (result === null) {
    result = [];
  }

  const args = result[1] || result[2] || result[3]

  return args ? args.split(',').map(x => x.trim()) : []
}
