import { Router } from "express";
import { validateApiKey, validateCardId, validateSchema } from "../middlewares/validationMiddleware.js";
import { recharge } from "../controllers/rechargeController.js";
import { rechargeInfo } from "../schemas/rechargeSchema.js";

const rechargeRouter = Router();
rechargeRouter.post("/recharge", validateSchema(rechargeInfo), validateApiKey, validateCardId, recharge);

export default rechargeRouter;