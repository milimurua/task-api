const Joi = require('joi');

const id = Joi.string().uuid();
const name = Joi.string().min(3).max(10);
const day = Joi.number().integer().min(10);
const book = Joi.string().alphanum().min(3).max(10);
const task = Joi.string().alphanum().min(3).max(10);

const createTaskSchema = Joi.object({
    name: name.required(),
    day: day.required(),
    book: book.required(),
    task: task.required()
});

const updateTaskSchema = Joi.object({
    name: name,
    day: day,
    book: book,
    task: task
});

const getTaskSchema = Joi.object({
    id: id.required()
});

module.exports = {createTaskSchema, updateTaskSchema, getTaskSchema};