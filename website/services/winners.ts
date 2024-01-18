import { get, post } from "~/api";

import { type IWinner } from "~/interface-types";

export async function fetchWinners ():  Promise<IWinner[]> {
    const data = await get("/winners/all");
    return data;
};

export async function defineWinnerByBuyerId (userId: number, prizeId: number) {
    return await post("/winners/define", { userId, prizeId });
};