import { Router } from "express";
import { validateSchema, validatePassword, validateBusiness } from "../middlewares/validationMiddleware.js";
import { purchase } from "../controllers/purchaseController.js";
import { purchaseInfo } from "../schemas/purchaseSchema.js";

const purchaseRouter = Router();
purchaseRouter.use("/purchase", validateSchema(purchaseInfo), validatePassword, validateBusiness, purchase);

export default purchaseRouter;