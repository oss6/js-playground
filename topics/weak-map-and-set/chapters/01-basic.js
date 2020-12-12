const basicExample = () => {
  function weakMapExample() {
    console.log('Running weakMapExample...');

    let person = { name: 'Marco' };

    const weakMap = new WeakMap();

    weakMap.set(person, 10);

    console.log('weakMap.get(...) = ', weakMap.get(person));

    console.log('person = null');

    person = null;

    console.log('weakMap.get(...) = ', weakMap.get(person));
  }

  function additionalDataUseCase() {
    console.log('Running additionalDataUseCase...');

    let thirdPartyObj = { logLevel: 'INFO' };

    const loggerConfiguration = new WeakMap();

    loggerConfiguration.set(thirdPartyObj, {
      outputFile: '/var/log/test.log',
      rotate: true
    });

    console.log('loggerConfiguration.get(...) = ', loggerConfiguration.get(thirdPartyObj));

    // Simulate disposition of 3rd party object
    thirdPartyObj = null;

    console.log('loggerConfiguration.get(...) = ', loggerConfiguration.get(thirdPartyObj));
  }

  function weakSetExample() {
    console.log('Running weakSetExample...');

    const visitedSet = new WeakSet();

    let john = { name: 'John' };
    let marco = { name: 'Marco' };

    visitedSet.add(john);
    visitedSet.add(marco);

    console.log('visitedSet.has(john) = ', visitedSet.has(john));

    john = null;

    console.log('visitedSet.has(john) = ', visitedSet.has(john));
  }

  weakMapExample();
  console.log('\n');
  additionalDataUseCase();
  console.log('\n');
  weakSetExample();
};

module.exports = [basicExample];
