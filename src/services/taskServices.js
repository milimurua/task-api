import { v4 as uuidv4 } from 'uuid';

class TaskService {
  constructor() {
    this.tasks = [];
  }

  create(data) {
    const newTask = { id: uuidv4(), ...data };
    this.tasks.push(newTask);
    return newTask;
  }

  findAll() { 
    return this.tasks;
  }

  findOne(id) {
    return this.tasks.find(task => task.id === id);
  }

  update(id, changes) {
    const index = this.tasks.findIndex(task => task.id === id);
    if (index === -1) {
      throw new Error('Task not found');
    }
    const updatedTask = { ...this.tasks[index], ...changes };
    this.tasks[index] = updatedTask;
    return updatedTask;
  }

  delete(id) {
    const index = this.tasks.findIndex(task => task.id === id);
    if (index === -1) {
      throw new Error('Task not found');
    }
    const deletedTask = this.tasks.splice(index, 1);
    return deletedTask;
  }
}

export default TaskService;
