import { post } from "~/api";

enum IError {
    InvalidInputs = 1,
    RegisterUserDatabaseIssue = 2,
    PurchaseIssue = 3
};

export interface IRegisterResponse {
    internalPurchaseId: number;
    type?: IError;
};

export async function register ({ fullName, email, cpf, phone, ticketAmount, prizeId }): Promise<IRegisterResponse> {
    return await post("/buyers/", { 
        fullName, 
        email, 
        cpf, 
        phone, 
        ticketAmount, 
        prizeId 
    });
};