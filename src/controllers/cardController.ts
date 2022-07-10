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
    await cardService.activateCard(cardInfo);
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
}

export async function getBalance(req: Request, res: Response) {
  const cardInfo = req.body;
  try {
    const balance = await cardService.getBalance(cardInfo);
    res.send(balance);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
}

export async function lockCard(req: Request, res: Response) {
  const cardInfo = req.body;
  if (res.locals.card.isBlocked) {
    return res.status(401).send("Card is already locked");
  }
  try {
    await cardService.lockCard(cardInfo);
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
}

export async function unlockCard(req: Request, res: Response) {
  const cardInfo = req.body;
  if (!res.locals.card.isBlocked) {
    return res.status(401).send("Card is already unlocked");
  }
  try {
    await cardService.unlockCard(cardInfo);
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
}
