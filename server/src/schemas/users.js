import Joi from 'joi';

export const createUserSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  role: Joi.string().valid('Requester', 'Validator').required()
});

export const updateUserSchema = Joi.object({
  name: Joi.string().optional(),
  email: Joi.string().email().optional(),
  role: Joi.string().valid('Requester', 'Validator').optional()
});

export const statusSchema = Joi.object({
  status: Joi.string().valid("Pending", "Approved", "Rejected").required(),
  comments: Joi.string().allow(null, "")
});