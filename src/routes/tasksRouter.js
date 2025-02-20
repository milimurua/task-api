const express = require('express');
const TaskService = require('../services/taskServices');

const router =  express.Router();
const services = new TaskService();

router.get('/' , async (req, res) => {
    const task = await services.find();
    res.json(task);
})

router.get('/:taskId', async (req, res) => {
    const { taskId } = req.params;
    const task = await services.findOne(taskId);

    if (!task) {
        return res.status(404).json({ message: 'Task not found' });
    }

    res.json(task);
});

router.post('/', async (req, res) => {
    const body = req.body;
    const newTask = await services.create(body);
    res.status(201).json(newTask);
});

router.patch('/:id', async (req, res) => {
    try {
        const body = req.body;
        const { id } = req.params;
        const task = await services.update(id, body)
        res.json(task);
    } catch (error) {
        res.status(404).json({
            message:error.message
        });
    }
})

router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    const task = await services.delete(id)
    res.json(task);
})

module.exports = router;