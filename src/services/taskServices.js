const { faker } = require('@faker-js/faker');

class TaskServices{
    constructor(){
        this.task = [];
        this.generate();
    }

    generate(){
        const limit = size || 10;
        for (let index = 0; index < limit; index ++){
            tasks.push({
                id: faker.datatype.uuid(),
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
        return this.products;
    }

    findOne(id){
        return this.products.find(item =>item.id === id);
    }

    update(){

    }

    delete(){

    }

}

module.exports = TaskServices;