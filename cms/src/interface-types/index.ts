export enum RaffleType {
    Random = "random",
    Pick = "pick"
};

export enum TicketBuyAssignment {
    BeforeBuy = "beforeBuy",
    AfterBuy = "afterBuy"
};

export enum PurchaseState {
    Pendent = "pendent",
    Approved = "approved", 
    Expired = "expired",
    Canceled = "canceled"
};

export interface UserData {
    id: number;
    full_name: string;
    cpf: string;
    email: string;
    phone_number: string;
};

export interface PrizeUpsert {
    prizeId?: number;
    title: string;
    subtitle: string;
    raffleType: RaffleType;
    desc: string;
    ticketsAmount: number;
    price: number;
    ticketsBuyAssignment: TicketBuyAssignment;
    raffleStartDate: string;
    raffleResultsDate: string;
    timeLimitToExpireTicketBuyRequest: number;
    availability: boolean;
};

export interface PrizeStatistics {
    invoicing: number;
    purchaseAmount: number;
    averageValuePerPurchase: number;
    purchaseStatistics: {
        pendent: number;
        approved: number;
        expired: number;
        canceled: number;
    };
    buyersAmount: number;
    ticketPrice: number;
    ticketAmount: number;
    soldedTicketsAmount: number;
    createdAt: string;
    raffleType: RaffleType;
    topBuyers: UserData[];
};