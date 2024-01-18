/**
 * purchase controller
 */

import { factories } from '@strapi/strapi'

import { PurchaseService } from '../services/purchase';

export default factories.createCoreController('api::purchase.purchase', ({ strapi }) => ({
    async isPaid (ctx) {
        const { purchaseId } = ctx.request.query;
        const isPaid = await ((strapi.service("api::purchase.purchase") as any) as PurchaseService).isPaid(purchaseId);
        let tickets = [];
        if (isPaid) {
            tickets = await (strapi.service("api::purchase.purchase") as any).generateRaffleTickets(purchaseId);
        };
        ctx.body = { isPaid, tickets };
    },
    async findAll (ctx) {
        const purchases = await (strapi.service("api::purchase.purchase") as any).findAll();
        ctx.body = purchases;
    },
    async fetchForDashboardDetails (ctx) {
        const { id } = ctx.request.query;
        const purchase = await (strapi.service("api::purchase.purchase") as any).fetchForDashboardDetails(id);
        ctx.body = purchase;
    },
    async fetchRanking (ctx) {
        const { id } = ctx.request.query;
        const purchase = await (strapi.service("api::purchase.purchase") as any).fetchRanking(id);
        ctx.body = purchase;
    },
    async fetchBuyerStatistics (ctx) {
        const { prizeId } = ctx.request.query;
        const statistics = await ((strapi.service("api::purchase.purchase")) as any).fetchBuyerStatistics(prizeId);
        ctx.body = statistics;    
    },
    async fetchMostPurchased (ctx) {
        const statistics = await ((strapi.service("api::purchase.purchase")) as any).fetchMostPurchased();
        ctx.body = statistics;
    },
    async fetchAllBuyerPurchases (ctx) {
        const { email, phone } = ctx.request.query;
        const data = await ((strapi.service("api::purchase.purchase")) as any).fetchAllBuyerPurchases(email, phone);
        ctx.body = data;
    },
    async _delete (ctx) {
        const { purchaseId } = ctx.request.body;
        try {
            await ((strapi.service("api::purchase.purchase")) as any)._delete(purchaseId);
            ctx.body = { success: true };
        } catch (err) {
            ctx.status = 500;
            ctx.body = { error: err.message };
        };
    }
}));

