const express = require('express');
const TaskService = require('../services/taskServices');

const router =  express.Router();
const services = new TaskService();

router.get('/' , async (req, res) => {
    const task = await services.find();
    res.json(task);
})

router.get('/:taskId', async (req, res, next) => {
    try{
        const { taskId } = req.params;
        const task = await services.findOne(taskId);
        res.json(task);
    }catch(error){
        next(error);
    }
});

router.post('/', async (req, res) => {
    const body = req.body;
    const newTask = await services.create(body);
    res.status(201).json(newTask);
});

router.patch('/:id', async (req, res, next) => {
    try {
        const body = req.body;
        const { id } = req.params;
        const task = await services.update(id, body)
        res.json(task);
    } catch (error) {
        next(error);
    }
})

router.delete('/:id', async (req, res, next) => {
    try{
        const { id } = req.params;
        const task = await services.delete(id)
        res.json(task);
    }catch(error){
        next(error);
    }
    
})

module.exports = router;