const Joi = require('joi');

const id = Joi.string().uuid(); 
const name = Joi.string().min(3).max(50);
const day = Joi.date().iso(); 
const book = Joi.string().min(3).max(50);
const task = Joi.string().min(3).max(255);

const createTaskSchema = Joi.object({
    name: name.required(),
    day: day.required(),
    book: book.required(),
    task: task.required()
});

const updateTaskSchema = Joi.object({
    name: name.optional(),
    day: day.optional(),
    book: book.optional(),
    task: task.optional()
}).unknown(false);

const getTaskSchema = Joi.object({
    id: id.required()
});

module.exports = { createTaskSchema, updateTaskSchema, getTaskSchema };