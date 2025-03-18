import { v4 as uuidv4 } from 'uuid';

class UserService {
  constructor() {
    this.users = [];
  }

  create(data) {
    const newUser = { id: uuidv4(), ...data };
    this.users.push(newUser);
    return newUser;
  }

  findAll() {
    return this.users;
  }

  findOne(id) {
    return this.users.find(user => user.id === id);
  }

  update(id, changes) {
    const index = this.users.findIndex(user => user.id === id);
    if (index === -1) {
      throw new Error('User not found');
    }
    const updatedUser = { ...this.users[index], ...changes };
    this.users[index] = updatedUser;
    return updatedUser;
  }

  delete(id) {
    const index = this.users.findIndex(user => user.id === id);
    if (index === -1) {
      throw new Error('User not found');
    }
    const deletedUser = this.users.splice(index, 1);
    return deletedUser;
  }
}

export default UserService;