// Mixins
// ------

var nameable = {
    toString () {
        return this.name;
    }
};

var throwable = {
    throwObj (target) {
        console.log(this.name + ' is being thrown at ' + target);
    }
};

var wieldable = {
    wield () {
        console.log('Wield ' + this.name);
    }
};

// Factory functions
// -----------------

var weapon = function (name, attack, defense) {
    var _weapon = {
        name,
        attack,
        defense
    };

    Object.assign(_weapon, nameable, wieldable, throwable);
    return _weapon;
};

var wizard = function (name, hp, weapons) {
    var _wizard = {
        name,
        hp,
        weapons
    };

    Object.assign(_wizard, nameable);
    return _wizard;
};

// Defining objects
// ----------------

var mightyAxe = weapon('Mighty Axe', 75, 61);
var swordZ = weapon('Sword Z', 95, 77);
var gandalf = wizard('Gandalf', 185, [swordZ]);

mightyAxe.wield();
mightyAxe.throwObj();

swordZ.wield();
swordZ.throwObj();

console.log(gandalf + ': you shall not pass!');
