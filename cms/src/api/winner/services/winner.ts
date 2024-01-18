/**
 * winner service
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreService('api::winner.winner', ({ strapi }) => ({
    async findAll () {
        const data = await strapi.db.query("api::winner.winner").findMany({
            where: {}
        });
        return data;
    },
    async define (userId: number, prizeId: number) {
        /*
        1 - verificar se o winner já foi definido nessa prize
        2 - definir winner inserindo da tabela winner
        3 - setar sorteio para encerrado
        */
        const thereIs = await strapi.db.query("api::winner.winner").count({
            where: { prize_id: prizeId }
        });
        if (thereIs > 0) {
            throw new Error("There is already a winner!");
        };
        await Promise.all([
            strapi.db.query("api::winner.winner").create({
                data: {
                    user_id: userId,
                    prize_id: prizeId
                }
            }),
            strapi.db.query("api::prize.prize").update({
                where: { id: prizeId },
                data: { availability: false }
            })
        ]);
    }
}));