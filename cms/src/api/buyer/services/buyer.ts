/**
 * buyer service
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreService('api::buyer.buyer', ({ strapi }) => ({
    async register (email: string, phoneNumber: string, cpf: string, fullName: string) {
        const c = await strapi.db.query("api::buyer.buyer").create({
            data: { full_name: fullName, email, phone_number: phoneNumber, CPF: cpf }
        });
        return c;
    },
    async checkInUse (email: string, phoneNumber: string): Promise<any> {
        const thereIs = await strapi.db.query("api::buyer.buyer").findOne({
            select: ["id"],
            where: { email, phone_number: phoneNumber }
        });
        return { inUse: !!thereIs, id: thereIs?.id };
    },
    async fetch (email?: string, phoneNumber?: string) {
        const where: any = {};
        if (email) {
            where.email = email;
        };
        if (phoneNumber) {
            where.phone_number = phoneNumber;
        };
        const data = await strapi.db.query("api::buyer.buyer").findOne({
            select: ["id", "full_name", "email", "phone_number", "CPF"],
            where
        });
        return data;
    },
    async fetchById (userId: number) {
        const data = await strapi.db.query("api::buyer.buyer").findOne({
            select: ["id", "full_name", "email", "phone_number", "CPF"],
            where: { id: userId }
        });
        return data;
    }
}));
