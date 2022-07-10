import { Request, Response } from "express";
import * as purchaseService from "../services/purchaseService.js";
import * as cardService from "../services/cardService.js";

export async function purchase(req: Request, res: Response) {
  const purchaseInfo = req.body;

  const balance = await cardService.getBalance({ cardId: purchaseInfo.cardId });
  if (balance.balance < purchaseInfo.amount) {
    return res.status(401).send("Insufficient balance");
  }
  await purchaseService.purchase(purchaseInfo);
  res.status(200).send("Purchase successful");
}
