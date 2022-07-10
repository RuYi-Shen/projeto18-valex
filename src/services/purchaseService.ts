import * as paymentRepository from "../repositories/paymentRepository.js";

export async function purchase(cardInfo: {
  cardId: number;
  amount: number;
  businessId: number;
}) {
  let { cardId, amount, businessId } = cardInfo;

  paymentRepository.insert({ cardId, amount, businessId });
}
