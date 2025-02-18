const express = require('express');

const router =  express.Router();

router.get('/:categoryId/task/:taskId', (req, res) => {
    const { categoryId, taskId } = req.params;
    res.json({
        categoryId,
        taskId
    });
});

module.exports = router;