/**
 * winner controller
 */

import { factories } from '@strapi/strapi'

export default factories.createCoreController('api::winner.winner', ({ strapi }) => ({
    async findAll (ctx) {
        const data = await (strapi.service("api::winner.winner") as any).findAll();
        ctx.body = data;
    },
    async define (ctx) {
        try {
            const { userId, prizeId } = ctx.request.body;
            console.log({ userId, prizeId });
            const data = await (strapi.service("api::winner.winner") as any).define(userId, prizeId);
            ctx.body = { success: true };
        } catch (err) {
            ctx.status = 500;
            ctx.body = { error: err.message };
        };
    }
}));
