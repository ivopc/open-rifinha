/**
 * ticket controller
 */

import { factories } from '@strapi/strapi'

export default factories.createCoreController('api::ticket.ticket', ({ strapi }) => ({
    async fetchNumList (ctx) {
        const { purchaseId } = ctx.request.query;
        const numList = await (strapi.service("api::ticket.ticket") as any).fetchNumList(purchaseId);
        ctx.body = numList;
    },
    async fetchBuyerByNumber (ctx) {
        const { ticketNumber, prizeId } = ctx.request.query;
        const buyerData = await (strapi.service("api::ticket.ticket") as any).fetchBuyerByNumber(ticketNumber, prizeId);
        console.log({buyerData});
        ctx.body = buyerData;
    }
}));