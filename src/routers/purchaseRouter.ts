import { Router } from "express";
import { purchaseInfo } from "../schemas/purchaseSchema.js";
import { validateSchema, validatePassword, validateBusiness } from "../middlewares/validationMiddleware.js";
import { purchase } from "../controllers/purchaseController.js";

const purchaseRouter = Router();
purchaseRouter.use("/purchase", validateSchema(purchaseInfo), validatePassword, validateBusiness, purchase);

export default purchaseRouter;