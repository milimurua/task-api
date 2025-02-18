const express = require('express');
const TaskService = require('../services/taskServices');

const router =  express.Router();
const services = new TaskService();

router.get('/' , (req, res) => {
    const task = services.find();
    res.json(task);
})

router.get('/filter', (req,res)=>{
    res.send('im a filter');
});

router.get('/:taskId', (req, res) => {
    const { taskId } = req.params;
    const task = services.findOne(taskId);

    if (!task) {
        return res.status(404).json({ message: 'Task not found' });
    }

    res.json(task);
    /*if(id === '999') {
        res.status(404).json({
            massage: 'not found'
        })
    }
    res.status(200).json({
        id,
        name: 'task 2',
        items: ['play', 'pet']
    });*/
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