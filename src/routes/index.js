const express = require('express');
const tasksRouter = require('./tasksRouter');
const categoriesRouter = require('./categoriesRouter');
const userRouter = require('./userRouter');

function routerApi(app) {
    const router = express.Router();
    app.use('/api/v1', router);
    router.use('/tasks', tasksRouter);
    router.use('/categories', categoriesRouter);
    router.use('/users', userRouter);
}

module.exports = routerApi;