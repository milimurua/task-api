const { faker } = require('@faker-js/faker');
const boom = require('@hapi/boom');

class TaskService {
    constructor() {
        this.tasks = [];
        this.generate();
    }

    generate() {
        for (let i = 0; i < 10; i++) {
            this.tasks.push({
                id: faker.string.uuid(),
                name: faker.person.firstName(),
                day: faker.date.future().toISOString().split('T')[0],
                book: faker.lorem.word(),
                task: faker.lorem.sentence(),
                image: faker.image.avatar(),
                isBlocked: faker.datatype.boolean()
            });
        }
    }

    async create(data) {
        const newTask = {
            id: faker.string.uuid(), // Generamos automáticamente el id
            ...data,
        };
        this.tasks.push(newTask);
        return newTask;
    }

    find() {
        return Promise.resolve(this.tasks);
    }

    async findOne(id) {
        const task = this.tasks.find(item => item.id === id);
        if (!task) throw boom.notFound('Task not found');
        if (task.isBlocked) throw boom.conflict('Task is blocked');
        return task;
    }

    async update(id, changes) {
        const index = this.tasks.findIndex(item => item.id === id);
        if (index === -1) throw boom.notFound('Task not found');
        this.tasks[index] = { ...this.tasks[index], ...changes };
        return this.tasks[index];
    }

    async delete(id) {
        const index = this.tasks.findIndex(item => item.id === id);
        if (index === -1) throw boom.notFound('Task not found');
        this.tasks.splice(index, 1); // Eliminamos la tarea correctamente
        return { message: 'Task deleted', id };
    }
}

module.exports = TaskService;