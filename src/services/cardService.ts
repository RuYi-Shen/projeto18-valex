import cryptr from "cryptr";
import bcrypt from "bcrypt";
import { faker } from "@faker-js/faker";
import * as cardRepository from "../repositories/cardRepository.js";
import * as rechargeRepository from "../repositories/rechargeRepository.js";
import * as paymentRepository from "../repositories/paymentRepository.js";
import { formatName, formatDate } from "../utils/formatUtils.js";

export async function createCard(cardInfo: {
  name: string;
  type: cardRepository.TransactionTypes;
  employeeId: number;
}) {
  let { name, type, employeeId } = cardInfo;
  const cardNumber = faker.random.numeric(12);
  name = formatName(name);
  const CVC = faker.random.numeric(3);
  const crypter = new cryptr(process.env.SECRET_KEY || "shen-driven");
  const encryptedCVC = crypter.encrypt(CVC);
  let date = new Date();
  date.setFullYear(date.getFullYear() + 5);
  const expiryDate = formatDate(date);

  const cardData = {
    employeeId,
    number: cardNumber,
    cardholderName: name,
    securityCode: encryptedCVC,
    expirationDate: expiryDate,
    isVirtual: false,
    isBlocked: true,
    type,
  };
  cardRepository.insert(cardData);
  cardData.securityCode = CVC;
  return cardData;
}

export async function activateCard(cardInfo: {
  cardId: number;
  password: string;
}) {
  let { cardId, password } = cardInfo;
  password = await bcrypt.hash(password, 10);

  const cardData = {
    password,
    isBlocked: false,
  };
  cardRepository.update(cardId, cardData);
}

export async function getBalance(cardInfo: { cardId: number }) {
  let { cardId } = cardInfo;
  const recharges = await rechargeRepository.findByCardId(cardId);
  const payments = await paymentRepository.findByCardId(cardId);
  const rechargeAmount = recharges.reduce(
    (acc: any, cur: { amount: number }) => acc + cur.amount,
    0
  );
  const paymentAmount = payments.reduce(
    (acc: any, cur: { amount: number }) => acc + cur.amount,
    0
  );

  return {
    balance: rechargeAmount - paymentAmount,
    transactions: payments,
    recharges,
  };
}

export async function lockCard(cardInfo: { cardId: number }) {
  let { cardId } = cardInfo;

  const cardData = {
    isBlocked: true,
  };
  cardRepository.update(cardId, cardData);
}

export async function unlockCard(cardInfo: { cardId: number }) {
  let { cardId } = cardInfo;

  const cardData = {
    isBlocked: false,
  };
  cardRepository.update(cardId, cardData);
}
