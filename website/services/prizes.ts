import { get, put, post } from "~/api";

import { type IPrizeFullDesc, type IPrizeToDashboard, type IPrizeToSorteios, type IPrizeUpsert, type IPrizeStatistics } from "~/interface-types";

export async function upsertPrize (prize: IPrizeUpsert) {
    return post("/prizes/upsert", prize);
};

export async function fetchPrizes (pageIndex?: number, amount?: number): Promise<IPrizeFullDesc[]> {
    const data = await get("/prizes/all");
    return data;
};

export async function fetchPrize (id: string|number): Promise<IPrizeFullDesc> {
    const { data } = await get("/prizes/" + id);
    return data.attributes;
};

export async function fetchPrizeStatistics (id: number): Promise<IPrizeStatistics>  {
    return get(`/prizes/full-statistics/${id}`);
};

export async function fetchPrizeToSorteiosPage (id: string|number): Promise<IPrizeToSorteios> {
    const data = await get("/prizes/to-sorteio/" + id);
    return data;
};

export async function fetchPrizesToDashboard (): Promise<IPrizeToDashboard[]> {
    const data = await get("/prizes/all-to-dashboard");
    return data;
};

export async function setPrizeTicketPurchaseLimit (id: number, ticketPerPurchase: {  minTicketsPerPurchase?: number, maxTicketsPerPurchase?: number }) {
    const data = await put(`/prizes/${id}`, { data: ticketPerPurchase });
    return data;
};

export async function deletePrize (id: number, password: string) {
    return post(`/prizes/delete/${id}`, { password });
};