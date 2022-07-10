import { Router } from "express";
import { validateApiKey, validateSchema, validateEmployee, validateCard } from "../middlewares/validationMiddleware.js";
import { createCard, activateCard, getBalance } from "../controllers/cardController.js";
import { createCardInfo, activateCardInfo } from "../schemas/cardSchema.js";

const cardRouter = Router();
cardRouter.post("/create",validateApiKey, validateSchema(createCardInfo), validateEmployee, createCard);
cardRouter.post("/activate", validateSchema(activateCardInfo), validateCard, activateCard);
//cardRouter.get("/visualize/card", visualizeCard);
cardRouter.get("/visualize/balance", validateCard, getBalance);
/* cardRouter.post("/lock", lockCard);
cardRouter.post("/unlock", unlockCard); */

export default cardRouter;