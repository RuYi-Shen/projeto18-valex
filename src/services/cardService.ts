import { faker } from "@faker-js/faker";
import cryptr from "cryptr";
import { insert, TransactionTypes } from "../repositories/cardRepository.js";
import { formatName, formatDate } from "../utils/formatUtils.js";

export async function createCard(cardInfo: { name: string; type: TransactionTypes; employeeId: number }) {
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
  }
  insert(cardData);
}
