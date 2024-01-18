/**
 * ticket service
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreService('api::ticket.ticket', ({ strapi }) => ({
    async fetchNumList (purchaseId): Promise<number[]> {
        const numList = await strapi.db.query("api::ticket.ticket").findMany({
            where: { 
                purchase_id: purchaseId
             },
             select: ["ticket_number"]
        });
        return numList.map(ticket => Number(ticket.ticket_number));
    },
    async fetchBuyerByNumber(ticketNumber: number, prizeId: number) {
        const { connection: knex } = strapi.db;
        const data = await knex
            .select(
                "buyers.full_name", "buyers.phone_number", 
                "tickets.user_id", "tickets.ticket_number", "tickets.created_at"
            )
            .from("tickets")
            .leftJoin("buyers", "tickets.user_id", "buyers.id")
            .groupBy("tickets.id")
            .where({ "tickets.ticket_number": +ticketNumber, "tickets.prize_id": +prizeId })
            .first();
        return data;
    }
}));
