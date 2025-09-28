import { GiftCard } from "@/types/apply";

export const GiftCardValidation = (giftCards: GiftCard[]) => {
    let isVaild = true;
    let errorMessage = '';
    for (const card of giftCards) {
        if (parseInt(card.amount) <= 0) {
            isVaild = false;
            errorMessage = 'ギフト券額面を入力してください';
        }
    }
    return {isVaild, errorMessage};
}