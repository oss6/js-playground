const objectMixins = () => {
  // Mixins
  // ------

  const nameable = {
    toString() {
      return this.name;
    }
  };

  const throwable = {
    throwObj(target) {
      console.log(this.name + ' is being thrown at ' + target);
    }
  };

  const wieldable = {
    wield() {
      console.log('Wield ' + this.name);
    }
  };

  // Factory functions
  // -----------------

  const weapon = function (name, attack, defense) {
    const _weapon = {
      name,
      attack,
      defense
    };

    Object.assign(_weapon, nameable, wieldable, throwable);
    return _weapon;
  };

  const wizard = function (name, hp, weapons) {
    const _wizard = {
      name,
      hp,
      weapons
    };

    Object.assign(_wizard, nameable);
    return _wizard;
  };

  // Defining objects
  // ----------------

  const mightyAxe = weapon('Mighty Axe', 75, 61);
  const swordZ = weapon('Sword Z', 95, 77);
  const gandalf = wizard('Gandalf', 185, [swordZ]);

  mightyAxe.wield();
  mightyAxe.throwObj();

  swordZ.wield();
  swordZ.throwObj();

  console.log(gandalf + ': you shall not pass!');
};

module.exports = [objectMixins];
