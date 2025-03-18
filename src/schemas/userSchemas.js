import Joi from 'joi';

const id = Joi.string().uuid();
const name = Joi.string().min(3).max(50);
const email = Joi.string().email();
const password = Joi.string().min(6).max(100);
const role = Joi.string().valid('admin', 'user');

export const createUserSchema = Joi.object({
    name: name.required(),
    email: email.required(),
    password: password.required(),
    role: role.default('user')
});

export const updateUserSchema = Joi.object({
    name: name.optional(),
    email: email.optional(),
    password: password.optional(),
    role: role.optional()
}).unknown(false);

export const getUserSchema = Joi.object({
    id: id.required()
});