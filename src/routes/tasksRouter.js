const express = require('express');
const { faker } = require('@faker-js/faker')

const router =  express.Router();

router.get('/' , (req, res) => {
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

router.get('/filter', (req,res)=>{
    res.send('im a filter');
});

router.get('/:taskId', (req, res) => {
    const { id } = req.params;
    if(id === '999') {
        res.status(404).json({
            massage: 'not found'
        })
    }
    res.status(200).json({
        id,
        name: 'task 2',
        items: ['play', 'pet']
    });
});

router.post('/', (req, res) => {
    const body = req.body;
    res.status(201).json({
        message: 'created',
        data: body
    });
});

router.patch('/:id', (req, res) => {
    const body = req.body;
    const { id } = req.params;
    res.json({
        message: 'update',
        data: body,
        id,
    });
})

router.delete('/:id', (req, res) => {
    const { id } = req.params;
    
    res.json({
        message: 'delete',
        id,
    });
})

module.exports = router;