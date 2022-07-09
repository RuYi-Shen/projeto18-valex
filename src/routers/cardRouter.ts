import { Router } from "express";
import { validateApiKey, validateSchema, validateEmployee } from "../middlewares/validationMiddleware.js";
import { createCard } from "../controllers/cardController.js";
import { createCardInfo } from "../schemas/cardSchema.js";

const cardRouter = Router();
cardRouter.use("/create",validateApiKey, validateSchema(createCardInfo), validateEmployee, createCard);
/* cardRouter.use("/activate", activateCard);
cardRouter.use("/visualize/card", visualizeCard);
cardRouter.use("/visualize/balance", visualizeBalance);
cardRouter.use("/lock", lockCard);
cardRouter.use("/unlock", unlockCard); */

export default cardRouter;