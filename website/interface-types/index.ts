


export enum RaffleType {
    Random = "random",
    Pick = "pick"
};

export enum TicketBuyAssignment {
    BeforeBuy = "beforeBuy",
    AfterBuy = "afterBuy"
};

export interface IPrize {
    id: number;
    title: string;
    images: Image[];
    subtitle: string;
    availability: boolean;
    price: number;
    prize: number;
    minTicketsPerPurchase: number;
    maxTicketsPerPurchase: number;
    raffleType: RaffleType;
    ticketsAmount: number;
    ticketsBuyAssignment: TicketBuyAssignment;
    raffleStartDate: string;
    raffleResultsDate: string;
    timeLimitToExpireTicketBuyRequest: number;
};

export enum PrizeUpsertTypes {
    Insert = "insert",
    Update = "update"
};

export type IPrizeFullDesc = IPrize & {
    desc: string;
    price: number;
    date: number;
};

export interface IPrizeToSorteios {
    id: number;
    title: string;
    images: Image[];
    desc: string;
    price: number;
    minTicketsPerPurchase: number;
    maxTicketsPerPurchase: number;
    maxAmountOfTicketPurchase: number;
};

export type IPrizeToDashboard = IPrize & {
    invoicing: string;
    createdAt: string;
    requestAmount: number;
};

export interface IPrizeEdit {
    title?: string;
    subtitle?: string;
    raffleType?: RaffleType;
    desc?: string;
    ticketsAmount?: number;
    price?: number;
    ticketsBuyAssignment: TicketBuyAssignment;
    raffleStartDate?: string;
    raffleResultsDate?: string;
    timeLimitToExpireTicketBuyRequest?: number;
    availability?: boolean;
};

export interface IPrizeUpsert {
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

export interface IPrizeStatistics {
    title: string;
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
    topBuyers: IUserData[];
};

export enum PurchaseState {
    Pendent = "pendent",
    Approved = "approved", 
    Expired = "expired",
    Canceled = "canceled"
};

export interface IPurchase {
    id: number;
    user_id: number;
    prize_id: number;
    payment_qr_code_image: string;
    payment_qr_code: string;
    already_paid: boolean;
    price_value: number;
    ticket_amount: number;
    state: PurchaseState;
};

export type IPurchaseDashboard = IPrize & {
    full_name: string;
    title: string;
    created_at: number;
    pix_payment_id: number;
    purchase_price: number;
    ticket_price: number;
    prize_id: number;
    cpf: string;
    phone_number: string;
    email: string;
};

export interface IPurchaseDashboardDetails {
    user: IPurchaseDashboard;
    tickets: ITicket[];
};

export interface ITicket {
    ticket_number: number;
};

export interface IUserData {
    id: number;
    full_name: string;
    cpf: string;
    email: string;
    phone_number: string;
};

export interface IBuyerPurchases {
    user_id: number;
    purchase_id: number;
    already_paid: boolean;
    ticket_amount: number;
    price_value: number;
    title: string;
    image: string;
};

export interface IWinnerInfo {
    full_name: string;
    phone_number: string;
    user_id: number;
    ticket_number: number;
    created_at: number;
};

export interface IWebsiteConfig {
    theme: string;
    whatsapp: string;
    instagram: string;
    facebook: string;
    telegram: string;
};

export interface IWebsiteLayout {
    theme: string;
};

export interface Image {
    id: number;
    url: string;
    width: number;
    height: number;
};

export interface IWinner {
    ticket: number;
    winnerName: string;
    prizeName: string;
    prizeImageURL: string
};