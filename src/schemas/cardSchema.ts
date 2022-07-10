import Joi from "joi";

export const createCardInfo = Joi.object({
  employeeId: Joi.number().required(),
  type: Joi.string()
    .valid("groceries", "restaurants", "transport", "education", "health")
    .required(),
});

export const activateCardInfo = Joi.object({
  cardId: Joi.number().required(),
  password: Joi.string().length(4).regex(/^\d+$/).required(),
  CVC: Joi.string().length(3).regex(/^\d+$/).required(),
});
