/**
 * prize controller
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreController('api::prize.prize', ({ strapi }) => ({
    async upsert (ctx) {
        try {
            await (strapi.service("api::prize.prize") as any).upsert(ctx.request.body);
            ctx.body = { success: true };
        } catch (err) {
            ctx.status = 500;
            ctx.body = { error: err.message }
        };
    },
    async findToSorteio (ctx) {
        const { id } = ctx.params;
        try {
            const data = await (strapi.service("api::prize.prize") as any).findToSorteio(id);
            ctx.body = data;
        } catch (err) {
            ctx.status = 500;
            ctx.body = { type: "CannotFindPrizedraw", error: err.message };
        };
    },
    async findAll (ctx) {
        const data = await (strapi.service("api::prize.prize") as any).findAll();
        ctx.body = data;
    },
    async findAllToDashboard (ctx) {
        const data = await (strapi.service("api::prize.prize") as any).findAllToDashboard();
        ctx.body = data;
    },
    async _delete (ctx) {
        const { id } = ctx.params;
        const { password } = ctx.request.body;
        try {
            await (strapi.service("api::prize.prize") as any)._delete(id, password);
            ctx.body = { success: true };
        } catch (err) {
            ctx.status = 500;
            ctx.body = { error: err.message }
        };
    },
    async fetchStatistics (ctx) {
        const { id } = ctx.params;
        try {
            await (strapi.service("api::prize.prize") as any).fetchStatistics(id);
            ctx.body = { success: true };
        } catch (err) {
            ctx.status = 500;
            ctx.body = { error: err.message };
        };
    }
}));