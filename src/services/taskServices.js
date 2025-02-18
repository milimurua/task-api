const { faker } = require('@faker-js/faker');

class TaskService{
    constructor(){
        this.task = [];
        this.generate();
    }

    generate(){
        const limit = 10;
        for (let index = 0; index < limit; index ++){
            this.task.push({
                id: faker.string.uuid(),
                name: faker.person.firstName(),
                day: faker.date.timeZone(),
                book: faker.book.title(),
                task: faker.person.jobTitle(),
                image: faker.image.avatar(),
            });
        }
    }

    create(data) {
        const newTask = {
            id: faker.string.uuid(),
            ...data,
        };
        this.task.push(newTask);
        return newTask;
    }

    find(){
        return this.task;
    }

    findOne(id){
        return this.task.find(item =>item.id === id);
    }

    update(id, changes){
        const index = this.task.findIndex(item =>item.id === id);
        if(index === -1){
            throw new Error('task not found');
        }
        const task = this.task[index];
        this.task[index] = {
            ...task,
            ...changes
        };
        return this.task[index];
    }

    delete(id){
        const index = this.task.findIndex(item =>item.id === id);
        if(index === -1){
            throw new Error('task not found');
        }
        this.task.slice(index,1);
        return{message: true, id};
    }

}

module.exports = TaskService;