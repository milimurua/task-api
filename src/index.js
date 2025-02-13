const express = require('express');
const { faker } = require('@faker-js/faker')

const app = express();
const port = 3000;

app.get('/', (req, res) => {
    res.send('task manager API');
});

app.get('/task' , (req, res) => {
    const tasks = [];
    const { size } = req.query;
    const limit = size || 10;
    for (let index = 0; index < limit; index ++){
        tasks.push({
            name: faker.person.firstName(),
            day: faker.date.timeZone(),
            book: faker.book.title(),
            task: faker.person.jobTitle(),
            image: faker.image.avatar(),
        });
    }
    res.json(tasks);
})

app.get('/task/filter', (req,res)=>{
    res.send('im a filter');
});

app.get('/task/:taskId', (req, res) => {
    const { id } = req.params;
    res.json({
        id,
        name: 'task 2',
        items: ['play', 'pet']
    });
});

app.get('/categories/:categoryId/task/:taskId', (req, res) => {
    const { categoryId, taskId } = req.params;
    res.json({
        categoryId,
        taskId
    });
});


app.get('/users', (req, res) => {
    const { limit, offset } =  req.query;
    if (limit && offset){
        res.json({
            limit,
            offset
        });
    }else{
        res.send('no hay parametros');
    }
})

app.listen(port, () => {
    console.log(`server running on port ${port}`);
})