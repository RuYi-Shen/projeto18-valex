import { Request, Response } from "express";
import * as rechargeService from "../services/rechargeService.js";

export async function recharge(req: Request, res: Response) {
  const { cardId, amount } = req.body;
  try {
    await rechargeService.recharge({ cardId, amount });
    res.status(200).send("Recharge successful");
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
}
