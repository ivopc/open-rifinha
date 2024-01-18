export default {
    routes: [
        {
            method: "GET",
            path: "/tickets/num-list",
            handler: "api::ticket.ticket.fetchNumList"
        },
        {
            method: "GET",
            path: "/tickets/fetch-buyer-by-number",
            handler: "api::ticket.ticket.fetchBuyerByNumber"
        }
    ]
};