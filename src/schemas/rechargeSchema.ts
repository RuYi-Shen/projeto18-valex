import Joi from "joi";

export const rechargeInfo = Joi.object({
  cardId: Joi.number().required(),
  amount: Joi.number().positive().integer().required(),
});
