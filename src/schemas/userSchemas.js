const Joi = require('joi');

const id = Joi.string().uuid();
const name = Joi.string().min(3).max(50);
const email = Joi.string().email();
const password = Joi.string().min(6).max(100);
const role = Joi.string().valid('admin', 'user');

const createUserSchema = Joi.object({
    name: name.required(),
    email: email.required(),
    password: password.required(),
    role: role.default('user')
});

const updateUserSchema = Joi.object({
    name: name.optional(),
    email: email.optional(),
    password: password.optional(),
    role: role.optional()
}).unknown(false);

const getUserSchema = Joi.object({
    id: id.required()
});

module.exports = { createUserSchema, updateUserSchema, getUserSchema };
