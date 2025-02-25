const { faker } = require('@faker-js/faker');
const boom = require('@hapi/boom');

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
                isBlock: faker.datatype.boolean()
            });
        }
    }

    async create(data) {
        const newTask = {
            id: faker.string.uuid(),
            ...data,
        };
        this.task.push(newTask);
        return newTask;
    }

    find(){ 
        //simular un async
        return new Promise((resolve, reject) => {
            setTimeout(()=> {
                resolve(this.task);
            })
        },5000);
        return this.task;
    }

    async findOne(id){
        const task = this.task.find(item =>item.id === id);
        if(!task){
            throw boom.notFound('Product not found');
        } 
        if(task.isBlock){
            throw boom.conflict('product is block');
        }
        return task;
    }

    async update(id, changes){
        const index = this.task.findIndex(item =>item.id === id);
        if(index === -1){
           throw boom.notFound('Product not found');
        }
        const task = this.task[index];
        this.task[index] = {
            ...task,
            ...changes
        };
        return this.task[index];
    }

    async delete(id){
        const index = this.task.findIndex(item =>item.id === id);
        if(index === -1){
            throw boom.notFound('Product not found');
        }
        this.task.slice(index,1);
        return{message: true, id};
    }

}

module.exports = TaskService;