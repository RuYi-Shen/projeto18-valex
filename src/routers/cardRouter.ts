import { Router } from "express";
import { validateApiKey, validateSchema, validateEmployee, validateCard, validatePassword } from "../middlewares/validationMiddleware.js";
import { createCard, activateCard, getBalance, lockCard, unlockCard } from "../controllers/cardController.js";
import { createCardInfo, activateCardInfo } from "../schemas/cardSchema.js";

const cardRouter = Router();
cardRouter.post("/create",validateApiKey, validateSchema(createCardInfo), validateEmployee, createCard);
cardRouter.post("/activate", validateSchema(activateCardInfo), validateCard, activateCard);
//cardRouter.get("/visualize/card", visualizeCard);
cardRouter.get("/visualize/balance", validateCard, getBalance);
cardRouter.post("/lock", validatePassword, lockCard);
cardRouter.post("/unlock", validatePassword, unlockCard);

export default cardRouter;