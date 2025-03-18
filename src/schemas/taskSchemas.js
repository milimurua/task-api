import Joi from 'joi';

const id = Joi.string().uuid();
const name = Joi.string().min(3).max(50);
const day = Joi.date().iso();
const book = Joi.string().min(3).max(50);
const task = Joi.string().min(3).max(255);

export const createTaskSchema = Joi.object({
    name: name.required(),
    day: day.required(),
    book: book.required(),
    task: task.required()
});

export const updateTaskSchema = Joi.object({
    name: name.optional(),
    day: day.optional(),
    book: book.optional(),
    task: task.optional()
}).unknown(false);

export const getTaskSchema = Joi.object({
    id: id.required()
});