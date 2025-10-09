export type PersonalInfo = {
    name: string;
    email: string;
    phone: string;
}

export type GiftCard = {
    code: string;
    amount: string;
}

export type BankInfo = {
    bank: string;
    branch_name: string;
    branch_no: string;
    account_type: string;
    bank_no: string;
    bank_name: string;
}

export type IDImages = {
    front: File | null;
    back: File | null;
}

export type UsageType = 'new' | 'repeat';
