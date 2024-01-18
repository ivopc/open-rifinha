import { get, post } from "~/api";

import { type IWinnerInfo } from "~/interface-types";

export async function fetchTicketNumbers (purchaseId: any): Promise<number[]> {
    const data = await get("/tickets/num-list", { query: { purchaseId } });
    return data;
};

export async function fetchBuyerByTicketAndPrizeId (ticketNumber: number, prizeId: number): Promise<IWinnerInfo> {
    return await get("/tickets/fetch-buyer-by-number", { query: { ticketNumber, prizeId } });
};