/**
 * prize service
 */

import { factories } from '@strapi/strapi';

import { PrizeUpsert, PrizeStatistics } from '../../../interface-types';

export default factories.createCoreService('api::prize.prize', ({ strapi }) => ({
    async upsert (prize: PrizeUpsert) {
        if (prize.prizeId) {
            const rawPrize = { ... prize };
            delete rawPrize.prizeId;
            await strapi.db.query("api::prize.prize").update({
                where: { id: prize.prizeId },
                data: rawPrize
            });
        } else {
            await strapi.db.query("api::prize.prize").create({
                data: prize
            });
        };
    },
    async findToSorteio (id: number) {
        try {
        const { connection: knex } = strapi.db;
        const prize = await knex.select(
            "prizes.id",
            "prizes.title",
            "prizes.image",
            "prizes.desc",
            "prizes.price",
            "prizes.min_tickets_per_purchase",
            "prizes.max_tickets_per_purchase",
            "prizes.tickets_amount",

            knex.raw("SUM(DISTINCT purchases.ticket_amount) as pendent_tickets"),
            
            knex.raw("COUNT(DISTINCT tickets.id) as total_tickets_purchased")
        )
            .from("prizes")
            .where({ "prizes.id": id })
            .leftJoin("tickets", "prizes.id", "tickets.prize_id")
            .leftJoin("purchases", function () {
                this
                    .on("prizes.id", "=", "purchases.prize_id")
                    .andOn("purchases.already_paid", "=", 0 as any);
            })
            .groupBy("prizes.id")
            .first();
        const [prizesData ] = await strapi.db.query("api::prize.prize").findMany({
            populate: ["images"],
            where: { id }
        });
        console.log("prizesData", prizesData);
        const remainingTicketsToPurchase = prize.tickets_amount - prize.total_tickets_purchased + (prize.pendent_tickets ? prize.pendent_tickets : 0);
        let minTicketsPerPurchase: number;
        let maxTicketsPerPurchase: number;
        if (remainingTicketsToPurchase === 0) {
            minTicketsPerPurchase = 0;
            maxTicketsPerPurchase = 0;
        } else {
            minTicketsPerPurchase = prize.min_tickets_per_purchase > remainingTicketsToPurchase ? 1 : prize.min_tickets_per_purchase;
            maxTicketsPerPurchase = prize.max_tickets_per_purchase < remainingTicketsToPurchase ? prize.max_tickets_per_purchase : remainingTicketsToPurchase;
        };
        return { id: prize.id, title: prize.title, images: prizesData.images.map(image => image), desc: prize.desc, price: prize.price, minTicketsPerPurchase, maxTicketsPerPurchase };
        } catch (err) {
            throw err;
        };
    },
    async findAll (): Promise<any[]> {
        const prizesData = await strapi.db.query("api::prize.prize").findMany({
            populate: true as any,
            select: ["id", "title", "subtitle", "availability", "image", /*, "desc",*/ "price", "prize" /*"date"*/, "minTicketsPerPurchase", "maxTicketsPerPurchase"],
            where: {}
        });
        return prizesData;
    }, 
    async findAllToDashboard () {
        const prizesData = await this.findAll();
        await Promise.all(prizesData.map(async prize => {
            const count = await this.countPrizesBuyed(prize.id);
            prize.invoicing = count * prize.price;
            prize.requestAmount = count;
        }));
        return prizesData;
    },
    async countPrizesBuyed (prizeId): Promise<number> {
        const prizesBuyed = await strapi.db.query("api::ticket.ticket").count({
            where: { prize_id: prizeId }
        });
        return prizesBuyed;
    },
    async fetchStatistics (prizeId): Promise<PrizeStatistics> {
        const { connection: knex } = strapi.db;
        await knex
            .select(
                "prizes.title", "prizes.raffle_type as raffleType", "prizes.created_at as createdAt", "prizes.price as ticketPrice",
                "tickets.id",
                "purchases.price_value", "purchases.state"
            )
            .from("prizes")
            .join("tickets", "prizes.id", "=", "tickets.prize_id")
            .join("purchases", "prizes.id", "=", "purchases.prize_id")
            .where({
                "prizes.id": prizeId
            });
        return {} as PrizeStatistics;
    },
    async _delete (id: number, password: string) {
        const user = await strapi.db.query("plugin::users-permissions.user").findOne({
            where: { email: "ivoopc@gmail.com" }
        });
        const validPassword = await strapi.plugins["users-permissions"].services.user.validatePassword(password, user.password);
        if (!validPassword) {
            throw new Error("Senha inválida!");
        };
        try {
            await Promise.allSettled([
                strapi.db.query("api::prize.prize").delete({
                    where: { id }
                }),
                strapi.db.query("api::purchase.purchase").deleteMany({
                    where: { prize_id: id }
                }),
                strapi.db.query("api::ticket.ticket").deleteMany({
                    where: { prize_id: id }
                })
            ]);
        } catch (err) {
            throw new Error("Problema interno ao excluir rifa!");
        };
    }
}));