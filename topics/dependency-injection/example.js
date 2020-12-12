const { createContainer, asClass } = require('.');

class UsersRepository {
  getUser(id) {
    return `user-${id}`
  }
}

class UsersService {
  constructor(usersRepository) {
    this.usersRepository = usersRepository;
  }

  login(id) {
    const user = this.usersRepository.getUser(id);
    console.log(`logging ${user} in...`);
  }
}

class AdminsService {
  constructor(usersRepository) {
    this.usersRepository = usersRepository;
  }

  accessArea(id) {
    const user = this.usersRepository.getUser(id);
    console.log(`${user} is accessing area...`);
  }
}

const container = createContainer();

container.register({
  usersRepository: asClass(UsersRepository).singleton(),
  usersService: asClass(UsersService).transient(),
  adminsService: asClass(AdminsService).transient()
});

const usersService = container.resolve('usersService');
const adminsService = container.resolve('adminsService');

usersService.login(12345);
adminsService.accessArea(12345);
