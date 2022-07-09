import Joi from "joi";

export const createCardInfo = Joi.object({
  employeeId: Joi.number().required(),
  type: Joi.string().valid('groceries', 'restaurants', 'transport', 'education', 'health').required(),
});

export const signInSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});
