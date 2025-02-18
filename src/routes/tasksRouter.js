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
});

router.post('/', (req, res) => {
    const body = req.body;
    const newTask = services.create(body);
    res.status(201).json(newTask);
});

router.patch('/:id', (req, res) => {
    const body = req.body;
    const { id } = req.params;
    const task = services.update(id, body)
    res.json(task);
})

router.delete('/:id', (req, res) => {
    const { id } = req.params;
    const task = services.delete(id)
    res.json(task);
})

module.exports = router;