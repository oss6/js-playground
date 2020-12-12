// Mixins
// ------

const nameable = state => ({
  toString() {
    return state.name;
  }
});

const canCastSpells = state => ({
  castsSpell(spell, target) {
    console.log(`${state.name} casts ${spell} on ${target}`);
    state.mana -= spell.mana;
    spell(target);
  }
});

const canSteal = state => ({
  steals(target, item) {
    console.log(`${state.name} steals ${item} from ${target}`);
  }
});

const canPlayMusic = state => ({
  playsMusic() {
    console.log(`${state.name} grabs his ${state.instrument} and starts playing music`);
  }
});

// Factory functions
// -----------------

const wizard = function (element, mana, name, hp) {
  const state = {
    element,
    mana,
    name,
    hp
  };

  return {
    ...state,
    ...nameable(state),
    ...canCastSpells(state)
  };
};

const thief = function (name, hp) {
  const state = {
    name,
    hp
  };

  return {
    ...state,
    ...nameable(state),
    ...canSteal(state)
  };
};

const bard = function (instrument, mana, name, hp) {
  const state = {
    instrument,
    mana,
    name,
    hp
  };

  return {
    ...state,
    ...nameable(state),
    ...canCastSpells(state),
    ...canSteal(state),
    ...canPlayMusic(state)
  };
};
