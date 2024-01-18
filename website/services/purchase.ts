import { get, post } from "~/api";

import { type IPurchase, type IPurchaseDashboard, type IPurchaseDashboardDetails, type IBuyerPurchases  } from "~/interface-types";

export async function fetchAllPurchases (): Promise<IPurchaseDashboard[]> {
    const data = await get(`/purchases/all`);
    return data;
};

export async function fetchPurchasePayment (id: string): Promise<IPurchase> {
    const { data } = await get(`/purchases/${id}`);
    return data.attributes;
};

export async function fetchIsPaid (purchaseId: any): Promise<{ isPaid: boolean, tickets: number[] }> {
    const data = await get("/purchases/is-paid", { query: { purchaseId } });
    return data;
};

export async function fetchPurchaseForDashboardDetails (id: string): Promise<IPurchaseDashboardDetails> {
    const data = await get("/purchases/fetch-for-details", { query: { id } });
    return data;
};

export async function fetchPurchaseRanking (id: string) {
    const data = await get("/purchases/ranking", { query: { id } });
    return data;
};

export async function fetchPurchaseStatistics (prizeId: string) {
    const data = await get("/purchases/users-statistics", { query: { prizeId } });
    return data;
};

export async function fetchMostPurchased () {
    const data = await get("/purchases/most-purchased-statistics");
    return data;
};

export async function fetchAllBuyerPurchases (query: { email?: string, phone?: string }): Promise<IBuyerPurchases[]> {
    return await get("/purchases/buyer-purchases", { query });
};

export async function deletePurchase (purchaseId: number) {
    return await post("/purchases/delete", { purchaseId });
};