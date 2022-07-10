import * as rechargeRepository from "../repositories/rechargeRepository.js";

export async function recharge(cardInfo: { cardId: number; amount: number }) {
  let { cardId, amount } = cardInfo;

  rechargeRepository.insert({ cardId, amount });
}
