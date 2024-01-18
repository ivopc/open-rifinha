/**
 * purchase service
 */

import { promisify } from "util";
import { factories, Attribute } from "@strapi/strapi";
import mercadopago from "mercadopago";

const paymentCapture = promisify(mercadopago.payment.capture);

const MONEY_DECIMAL = 2;

mercadopago.configurations.setAccessToken(process.env.MERCADOPAGO_API);

import { PurchaseState } from "../../../interface-types";

type Purchase = Attribute.GetValues<"api::purchase.purchase">;

export interface PurchaseService {
    generatePayment (userId: number, prizeId: number, ticketAmount: number): Promise<any>;
    generateRaffleTickets (purchaseId: number): Promise<number[]>;
    isPaid (purchaseId: number): Promise<boolean>;
    findAll (): Promise<Purchase[]>;
    fetchForDashboardDetails (purchaseId: string): Promise<any>;
    fetchRanking (prizeId): Promise<any>;
    fetchBuyerStatistics (prizeId): Promise<any>;
    fetchMostPurchased (): Promise<any>;
};

export default factories.createCoreService("api::purchase.purchase", ({ strapi }) => ({
    async generatePayment (userId: number, prizeId: number, ticketAmount: number) {
        const { full_name, email, CPF: cpf } = await (strapi.service("api::buyer.buyer") as any).fetchById(userId);
        const [ first_name, last_name = "Nullish" ] = full_name.split(" ");
        const { minTicketsPerPurchase, maxTicketsPerPurchase, price, title } = await (strapi.service("api::prize.prize") as any).findToSorteio(prizeId);
        if (ticketAmount < minTicketsPerPurchase || ticketAmount > maxTicketsPerPurchase) {
            throw new Error("Wrong amount of tickets to buy!!");
        };
        const finalPrice = Number((price * Number(ticketAmount)).toFixed(MONEY_DECIMAL));
        let paymentData = {
            response: {
                id: 1234, 
                point_of_interaction: {
                    transaction_data: {
                        qr_code_base64: "qr_code_base64",
                        qr_code: "123abc4567890",
                        internalPurchaseId: 1234
                    }
                }
            }
        };
        try {
            if (process.env.NODE_ENV !== "development")
                paymentData = await mercadopago.payment.create(generatePaymentData({ email, first_name, last_name, cpf, transaction_amount: finalPrice, ticketAmount, title }));
        } catch (err) {
            console.error(err);
            throw err;
        };
        try {
            const purchase = await strapi.db.query("api::purchase.purchase").create({
                data: {
                    user_id: userId, 
                    prize_id: prizeId, 
                    payment_qr_code_image: paymentData.response.point_of_interaction.transaction_data.qr_code_base64,
                    payment_qr_code: paymentData.response.point_of_interaction.transaction_data.qr_code,
                    already_paid: false,
                    ticket_amount: ticketAmount,
                    price_value: finalPrice,
                    pix_payment_id: paymentData.response.id,
                    state: PurchaseState.Pendent // {todo}
                }
            });
            paymentData.response.point_of_interaction.transaction_data.internalPurchaseId = purchase.id;
        } catch (err) {
            console.error(err);
            throw err;
        };
        return paymentData.response.point_of_interaction.transaction_data;
    },
    async generateRaffleTickets (purchaseId: number): Promise<number[]> {
        const purchase = await strapi.db.query("api::purchase.purchase").findOne({
            where: { id: purchaseId },
            select: ["user_id", "prize_id", "ticket_amount"]
        });
        const allTickets = await strapi.db.query("api::ticket.ticket").findMany({
            where: { prize_id: purchase.prize_id },
            select: ["ticket_number"]
        });
        const { ticketsAmount } = await strapi.db.query("api::prize.prize").findOne({
            where: { id: purchase.prize_id },
            select: ["ticketsAmount"]
        });
        const newTickets = [ ... Array(Number(purchase.ticket_amount)) ].map(() => generateNewTicket(allTickets, Number(ticketsAmount)));
        await strapi.db.query("api::ticket.ticket").createMany({
            data: newTickets.map(ticket => ({
                ticket_number: ticket,
                purchase_id: purchaseId,
                prize_id: purchase.prize_id,
                user_id: purchase.user_id
            }))
        });
        return newTickets;
    },
    async isPaid (purchaseId: number): Promise<boolean> {
        try {
            const purchase = await strapi.db.query("api::purchase.purchase").findOne({
                select: ["pix_payment_id"],
                where: { id: purchaseId }
            });
            let isPaid = true;
            if (process.env.NODE_ENV !== "development")
                isPaid = (await paymentCapture(purchase.pix_payment_id, mercadopago)).body.status === "approved";
            await strapi.db.query("api::purchase.purchase").update({
                where: { id: purchaseId },
                data: { already_paid: isPaid, state: PurchaseState.Approved }
            });
            return isPaid;
        } catch (err) {
            //console.error(err);
            return false;
        };
    },
    async findAll (): Promise<Purchase[]> {
        const { connection: knex } = strapi.db;
        const purchaseData = await knex.select("purchases.id", "purchases.user_id", "purchases.prize_id", 
        "purchases.payment_qr_code_image", "purchases.payment_qr_code", "purchases.already_paid", 
        "purchases.price_value", "purchases.ticket_amount", "purchases.pix_payment_id", "purchases.created_at", 

        "buyers.full_name", 
        
        "prizes.title"
        )
            .from("purchases")
            .leftJoin("buyers", "purchases.user_id", "buyers.id")
            .leftJoin("prizes", "purchases.prize_id", "prizes.id");
        return purchaseData;
    },
    async fetchForDashboardDetails (purchaseId: string) {
        const { connection: knex } = strapi.db;
        const userData = await knex.select(
            "purchases.id", "purchases.created_at", "purchases.pix_payment_id", "purchases.price_value as purchase_price", "purchases.prize_id", 
            "buyers.full_name", "buyers.CPF", "buyers.email", "buyers.phone_number",
            "prizes.price as ticket_price"
        )
            .from("purchases")
            .where({ "purchases.id": purchaseId })
            .leftJoin("buyers", "purchases.user_id", "buyers.id")
            .leftJoin("prizes", "purchases.prize_id", "prizes.id")
            .first();
        const tickets = await strapi.db.query("api::ticket.ticket").findMany({
            select: ["ticket_number"],
            where: { purchase_id: purchaseId } 
        });
        return { user: userData, tickets };
    },
    async fetchRanking (prizeId) {
        const { connection: knex } = strapi.db;
        const data = await knex
            .select(
                "buyers.full_name", "buyers.phone_number", 
                "purchases.price_value", 
                "tickets.purchase_id", "tickets.prize_id"
            )
            .from("buyers")
            .leftJoin("tickets", "buyers.id", "tickets.user_id")
            .leftJoin("purchases", "tickets.purchase_id", "purchases.id")
            .count("tickets.id AS ticket_count")
            .groupBy("buyers.id", "purchases.id")
            .orderBy("ticket_count", "desc")
            .where({ "tickets.prize_id": prizeId })
                        /*.leftJoin("purchases", function () {
                this
                    .on("purchases.id", "=", "tickets.purchase_id")
                    .andOn("purchases.user_id", "=", "tickets.user_id")
            })*/
        return data;
    },
    async fetchBuyerStatistics (prizeId) {
        //nome - `buyers` | telefone - `buyers` | quanto gastou - `purchases`
        const { connection: knex } = strapi.db;
        const data = await knex
            .select(
                "buyers.full_name", "buyers.phone_number", 
                "purchases.price_value", "purchases.user_id", "purchases.ticket_amount", "purchases.created_at"
            )
            .from("buyers")
            .orderBy("purchases.ticket_amount", "desc")
            .leftJoin("purchases", "buyers.id", "purchases.user_id")
            .where({ "purchases.prize_id": prizeId, "purchases.already_paid": true });
        return data;
    },
    async fetchMostPurchased () {
        // prize title | quantidade de bilhetes vendidos || valor que foi gasto no total
        const { connection: knex } = strapi.db;
        return await knex
            .select(
                "prizes.id", "prizes.title", "prizes.price" 
            )
            .from("prizes")
            .count("tickets.id AS ticket_count")
            .leftJoin("tickets", "prizes.id", "tickets.prize_id")
            .orderBy("ticket_count", "desc");
    },
    async fetchAllBuyerPurchases (email: string, phone: string) {
        const type = email ? "email" : "phone_number";
        const { connection: knex } = strapi.db;
        return await knex
            .select(
                "buyers.id as user_id",
                "purchases.id as purchase_id", "purchases.already_paid", "purchases.ticket_amount", "purchases.price_value", "purchases.prize_id",
                "prizes.title", "prizes.image"
            )
            .from("buyers")
            .join("purchases", "buyers.id", "=", "purchases.user_id")
            .join("prizes", "prizes.id", "=", "purchases.prize_id")
            .where({
                [`buyers.${type}`]: type === "email" ? email : phone
            });
    },
    async _delete (purchaseId: number) {
        try {
            await Promise.all([
                strapi.db.query("api::purchase.purchase").delete({
                    where: { id: purchaseId }
                }),
                strapi.db.query("api::ticket.ticket").deleteMany({
                    where: { purchase_id: purchaseId }
                })
            ]);
        } catch (err) {
            throw new Error("Database issue!");
        };
    }
}));

const generatePaymentData = ({ email, first_name, last_name, cpf, transaction_amount, ticketAmount, title }) => ({
    transaction_amount,
    description: "Sorteio - " + title + " - " + first_name +  " - " + ticketAmount + " Bilhetes",
    payment_method_id: "pix",
    payer: {
        email,
        first_name,
        last_name,
        identification: {
            type: "CPF",
            number: cpf
        },
        /*address: {
            zip_code: "03376060",
            street_name: "Rua Gino",
            street_number: "68",
            neighborhood: "Chácara Belenzinho",
            city: "São Paulo",
            federal_unit: "SP"
        }*/
    }
});

function generateNewTicket (notGenerateTicketList: ({ ticket_number: number })[], ticketsAmount: number): number {
    const newRandTicket = randomNumberBetween(1, ticketsAmount);
    if (notGenerateTicketList.some(ticket => ticket.ticket_number === newRandTicket)) {
        return generateNewTicket(notGenerateTicketList, ticketsAmount);
    };
    /** @important add generated ticket to `allTickets` array */
    notGenerateTicketList.push({ ticket_number: newRandTicket });
    return newRandTicket;
};

function randomNumberBetween(min, max): number {
    return Math.floor(Math.random() * (max - min + 1) + min);
};