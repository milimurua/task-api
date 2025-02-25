const express = require('express');

const productsRouter = require('./tasksRouter');
const categoriesRouter = require('./categoriesRouter');
const userRouter = require('./user');


function routerApi(app){
    const router = express.Router();
    app.use('/api/v1' , router);
    router.use('/tasks', productsRouter);
    router.use('/categories', productsRouter);
    router.use('/user', productsRouter);
}

module.exports = routerApi