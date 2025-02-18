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

    create(){

    }

    find(){
        return this.task;
    }

    findOne(id){
        return this.task.find(item =>item.id === id);
    }

    update(){

    }

    delete(){

    }

}

module.exports = TaskService;