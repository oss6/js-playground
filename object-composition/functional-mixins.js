// Mixins
// ------

var nameable = state => ({
    toString () {
        return state.name;
    }
});

var canCastSpells = state => ({
    castsSpell (spell, target) {
        console.log(`${state.name} casts ${spell} on ${target}`);
        state.mana -= spell.mana;
        spell(target)
    }
});

var canSteal = state => ({
    steals (target, item) {
        console.log(`${state.name} steals ${item} from ${target}`);
    }
});

var canPlayMusic = state => ({
    playsMusic () {
        console.log(`${state.name} grabs his ${state.instrument} and starts playing music`);
    }
});

// Factory functions
// -----------------

var wizard = function (element, mana, name, hp) {
    var state = {
        element,
        mana,
        name,
        hp
    };

    return Object.assign({}, nameable(state), canCastSpells(state));
};

var thief = function (name, hp) {
    var state = {
        name,
        hp
    };

    return Object.assign({}, nameable(state), canSteal(state));
};

var bard = function (instrument, mana, name, hp) {
    var state = {
        instrument,
        mana,
        name,
        hp
    };

    return Object.assign({},
                nameable(state),
                canCastSpells(state),
                canSteal(state),
                canPlayMusic(state));
};
