export default {
    routes: [
        {
            method: "GET",
            path: "/purchases/is-paid",
            handler: "api::purchase.purchase.isPaid"
        },
        {
            method: "GET",
            path: "/purchases/all" ,
            handler: "api::purchase.purchase.findAll"
        },
        {
            method: "GET",
            path: "/purchases/fetch-for-details",
            handler: "api::purchase.purchase.fetchForDashboardDetails"
        },
        {
            method: "GET",
            path: "/purchases/ranking",
            handler: "api::purchase.purchase.fetchRanking"
        },
        {
            method: "GET",
            path: "/purchases/users-statistics",
            handler: "api::purchase.purchase.fetchBuyerStatistics"
        },
        {
            method: "GET",
            path: "/purchases/most-purchased-statistics",
            handler: "api::purchase.purchase.fetchMostPurchased"
        },
        {
            method: "GET",
            path: "/purchases/buyer-purchases",
            handler: "api::purchase.purchase.fetchAllBuyerPurchases"
        },
        {
            method: "POST",
            path: "/purchases/delete",
            handler: "api::purchase.purchase._delete"
        }
    ]
};