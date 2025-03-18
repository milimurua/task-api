import express from 'express';
import TaskService from '../services/taskServices.js';
import validatorHandler from '../middlewares/validatorHandler.js';
import { createTaskSchema, updateTaskSchema, getTaskSchema } from '../schemas/taskSchemas.js';

const router = express.Router();
const services = new TaskService();

router.get('/', async (req, res, next) => {
    try {
        const tasks = await services.findAll();
        res.json(tasks);
    } catch (error) {
        next(error);
    }
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

export default router;