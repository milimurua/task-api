import express from 'express';
import categoriesRouter from './categoriesRouter.js';
import tasksRouter from './tasksRouter.js';
import userRouter from './userRouter.js';

function routerApi(app) {
  const router = express.Router();
  
  app.use('/api/v1', router);
  router.use('/tasks', tasksRouter);
  router.use('/categories', categoriesRouter);
  router.use('/users', userRouter);
}

export default routerApi;