const createUser = ({
  userName = 'Anonymous',
  avatar = 'anon.png'
} = {}) => ({
  userName,
  avatar,
  setUserName(userName) {
    this.userName = userName;
    return this;
  }
});

// Factory functions for mixin composition

const pipe = (...fns) => x => fns.reduce((y, f) => f(y), x);

const withConstructor = constructor => o => ({
  __proto__: {
    constructor
  },
  ...o
});

const withFlying = o => {
  let isFlying = false;

  return {
    ...o,
    fly() {
      isFlying = true;
      return this;
    },
    land() {
      isFlying = false;
      return this;
    },
    isFlying() {
      return isFlying;
    }
  };
};

const withBattery = ({ capacity }) => o => {
  let percentCharged = 100;

  return {
    ...o,
    draw(percent) {
      const remaining = percentCharged - percent;
      percentCharged = remaining > 0 ? remaining : 0;
      return this;
    },
    getCharge() {
      return percentCharged;
    },
    getCapacity() {
      return capacity;
    }
  };
};

const createDrone = ({ capacity = '3000mAh' }) => pipe(
  withFlying,
  withBattery(capacity),
  withConstructor(createDrone)
)({});

const myDrone = createDrone({ capacity: '5500mAh' });

console.log(`constructor linked: ${myDrone.constructor === createDrone}`);
