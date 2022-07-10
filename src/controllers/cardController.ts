import { Request, Response } from "express";
import * as cardService from "../services/cardService.js";

export async function createCard(req: Request, res: Response) {
  const cardInfo = req.body;
  cardInfo.name = res.locals.employee.fullName;

  const card = await cardService.createCard(cardInfo);
  res.status(201).send(card);
}

export async function activateCard(req: Request, res: Response) {
  const cardInfo = req.body;

  await cardService.activateCard(cardInfo);
  res.sendStatus(200);
}

export async function getBalance(req: Request, res: Response) {
  const cardInfo = req.body;

  const balance = await cardService.getBalance(cardInfo);
  res.send(balance);
}

export async function lockCard(req: Request, res: Response) {
  const cardInfo = req.body;
  if (res.locals.card.isBlocked) {
    return res.status(401).send("Card is already locked");
  }

  await cardService.lockCard(cardInfo);
  res.sendStatus(200);
}

export async function unlockCard(req: Request, res: Response) {
  const cardInfo = req.body;
  if (!res.locals.card.isBlocked) {
    return res.status(401).send("Card is already unlocked");
  }

  await cardService.unlockCard(cardInfo);
  res.sendStatus(200);
}
