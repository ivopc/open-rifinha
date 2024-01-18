/**
 * buyer controller
 */

import { factories } from '@strapi/strapi'
import { Context } from "koa";
import { PurchaseService } from '../../purchase/services/purchase';

export default factories.createCoreController('api::buyer.buyer', ({ strapi }) => ({
    async create (ctx: Context) {
        const { fullName, email, cpf, phone, ticketAmount, prizeId } = (ctx.request as any).body;
        if (!EMAIL_REGEX.test(email) || !(PHONE_NUMBER_REGEX.test(phone))) {
            ctx.status = 400;
            ctx.body = { type: IError.InvalidInputs };
            return;
        };
        let { inUse, id: userId } = await (strapi.service("api::buyer.buyer") as any).checkInUse(email, phone);
        if (!inUse) {
            try {
                const registerData = await (strapi.service("api::buyer.buyer") as any).register(email, phone, cpf, fullName);
                userId = registerData.id;
            } catch (err) {
                ctx.status = 500;
                ctx.body = { type: IError.RegisterUserDatabaseIssue };
                return;
            };
        };
        try {
            const purchaseData = await ((strapi.service("api::purchase.purchase") as any) as PurchaseService).generatePayment(userId, prizeId, ticketAmount);
            ctx.body = purchaseData;
        } catch (err) {
            ctx.status = 500;
            ctx.body = { type: IError.PurchaseIssue };
        };
    },
}));

enum IError {
    InvalidInputs = 1,
    RegisterUserDatabaseIssue = 2,
    PurchaseIssue = 3
};

const PHONE_NUMBER_REGEX = /^\(?[1-9]{2}\)? ?(?:[2-8]|9[1-9])[0-9]{3}\-?[0-9]{4}$/;
const EMAIL_REGEX = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;