const express = require('express');
const TaskService = require('../services/taskServices');
const validatorHandler = require('../middlewares/validatorHandler');
const {createTaskSchema, updateTaskSchema, getTaskSchema}= require('../schemas/taskSchemas');

const router =  express.Router();
const services = new TaskService();

router.get('/', async (req, res) => {
    const tasks = await services.find();
    res.json(tasks);
});

router.get('/:id',
    validatorHandler(getTaskSchema, 'params'),
    async (req, res, next) => {
        try {
            const { id } = req.params;
            const task = await services.findOne(id);
            res.json(task);
        } catch (error) {
            next(error);
        }
    }
);

router.post('/',
    validatorHandler(createTaskSchema, 'body'),
    async (req, res, next) => {
        try {
            const newTask = await services.create(req.body);
            res.status(201).json(newTask);
        } catch (error) {
            next(error);
        }
    }
);

router.patch('/:id',
    validatorHandler(getTaskSchema, 'params'), 
    validatorHandler(updateTaskSchema, 'body'),
    async (req, res, next) => {
        try {
            const { id } = req.params;
            const task = await services.update(id, req.body);
            res.json(task);
        } catch (error) {
            next(error);
        }
    }
);


router.delete('/:id',
    validatorHandler(getTaskSchema, 'params'),
    async (req, res, next) => {
        try {
            const { id } = req.params;
            await services.delete(id);
            res.json({ message: 'Task deleted', id });
        } catch (error) {
            next(error);
        }
    }
);

module.exports = router;