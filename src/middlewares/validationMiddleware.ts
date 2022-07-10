import { findByApiKey } from "../repositories/companyRepository.js";
import * as employeeRepository from "../repositories/employeeRepository.js";
import * as cardRepository from "../repositories/cardRepository.js";
import { Request, Response, NextFunction } from "express";
import { convertToDate } from "../utils/formatUtils.js";
import cryptr from "cryptr";
import bcrypt from "bcrypt";

export function validateSchema(schema: any) {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.validateAsync(req.body, { abortEarly: false });
      next();
    } catch (error) {
      console.log(error);
      res
        .status(422)
        .send(error.details.map((e: { message: String }) => e.message));
    }
  };
}

export async function validateApiKey(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const apiKey = req.headers["x-api-key"];
  if (!apiKey) return res.status(401).send("Unauthorized");
  try {
    if (typeof apiKey !== "string") return res.status(401).send("Unauthorized");

    const company = await findByApiKey(apiKey);
    if (!company) {
      return res.status(401).send("Unauthorized");
    }
    res.locals.company = company;
    next();
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
}

export async function validateEmployee(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { employeeId } = req.body;
  try {
    const employee = await employeeRepository.findById(employeeId);
    if (!employee) {
      return res.status(401).send("Unauthorized");
    }
    if (employee.companyId !== res.locals.company.id) {
      return res.status(401).send("Unauthorized");
    }
    res.locals.employee = employee;
    next();
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
}

export async function validateCard(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { cardId, CVC, password } = req.body;
  try {
    const card = await cardRepository.findById(cardId);
    if (!card) {
      return res.status(401).send("Card not found");
    }
    if (convertToDate(card.expirationDate) < new Date()) {
      return res.status(401).send("Card expired");
    }
    if (card.password && password) {
      return res.status(401).send("Card is already activated");
    }
    const crypter = new cryptr(process.env.SECRET_KEY || "shen-driven");
    const decryptedCVC = crypter.decrypt(card.securityCode);
    if (decryptedCVC !== CVC) {
      return res.status(401).send("Invalid CVC");
    }
    res.locals.card = card;
    next();
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
}

export async function validatePassword(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { cardId, password } = req.body;
  try {
    const card = await cardRepository.findById(cardId);
    if (!card) {
      return res.status(401).send("Card not found");
    }
    if (convertToDate(card.expirationDate) < new Date()) {
      return res.status(401).send("Card expired");
    }
    const isValid = await bcrypt.compare(password, card.password);
    if (!isValid) {
      return res.status(401).send("Invalid password");
    }
    res.locals.card = card;
    next();
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
}

export async function validateCardId(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { cardId } = req.body;
  try {
    const card = await cardRepository.findById(cardId);
    if (!card) {
      return res.status(401).send("Card not found");
    }
    if (convertToDate(card.expirationDate) < new Date()) {
      return res.status(401).send("Card expired");
    }
    if (!card.password) {
      return res.status(401).send("Card is not activated");
    }
    res.locals.card = card;
    next();
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
}