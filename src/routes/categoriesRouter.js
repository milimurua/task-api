import express from 'express';
import CategoryService from '../services/categoryService.js';

const router = express.Router();
const service = new CategoryService();

router.get('/:categoryId/task/:taskId', (req, res) => {
    const { categoryId, taskId } = req.params;
    res.json({
        categoryId,
        taskId
    });
});

export default router;