const express = require('express');
const UserService = require('../services/userServices');
const validatorHandler = require('../middlewares/validatorHandler');
const { createUserSchema, updateUserSchema, getUserSchema } = require('../schemas/userSchemas');

const router = express.Router();
const services = new UserService();

router.get('/', async (req, res, next) => {
    try {
        const users = await services.findAll();
        res.json(users);
    } catch (error) {
        next(error);
    }
});

router.get('/:id',
    validatorHandler(getUserSchema, 'params'),
    async (req, res, next) => {
        try {
            const { id } = req.params;
            const user = await services.findOne(id);
            res.json(user);
        } catch (error) {
            next(error);
        }
    }
);

router.post('/',
    validatorHandler(createUserSchema, 'body'),
    async (req, res, next) => {
        try {
            const newUser = await services.create(req.body);
            res.status(201).json(newUser);
        } catch (error) {
            next(error);
        }
    }
);

router.patch('/:id',
    validatorHandler(getUserSchema, 'params'), 
    validatorHandler(updateUserSchema, 'body'),
    async (req, res, next) => {
        try {
            const { id } = req.params;
            const updatedUser = await services.update(id, req.body);
            res.json(updatedUser);
        } catch (error) {
            next(error);
        }
    }
);

router.delete('/:id',
    validatorHandler(getUserSchema, 'params'),
    async (req, res, next) => {
        try {
            const { id } = req.params;
            await services.delete(id);
            res.json({ message: 'User deleted', id });
        } catch (error) {
            next(error);
        }
    }
);

module.exports = router;
