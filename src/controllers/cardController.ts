import { Request, Response } from "express";
import * as cardService from "../services/cardService.js";

export async function createCard(req: Request, res: Response) {
  const cardInfo = req.body;
  cardInfo.name = res.locals.employee.fullName;
  try {
    const card = await cardService.createCard(cardInfo);
    res.status(201).send(card);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
}

export async function activateCard(req: Request, res: Response) {
  const cardInfo = req.body;
  try {
    const card = await cardService.activateCard(cardInfo);
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
}