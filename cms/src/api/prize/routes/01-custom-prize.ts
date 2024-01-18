export default {
    routes: [
        {
            method: "POST",
            path: "/prizes/upsert",
            handler: "api::prize.prize.upsert"
        },
        {
            method: "GET",
            path: "/prizes/to-sorteio/:id",
            handler: "api::prize.prize.findToSorteio"
        },
        {
            method: "GET",
            path: "/prizes/all",
            handler: "api::prize.prize.findAll"
        },
        {
            method: "GET",
            path: "/prizes/all-to-dashboard",
            handler: "api::prize.prize.findAllToDashboard"
        },
        {
            method: "POST",
            path: "/prizes/delete/:id",
            handler: "api::prize.prize._delete"
        },
        {
            method: "GET",
            path: "/prizes/full-statistics/:id",
            handler: "api::prize.prize.fetchStatistics"
        }
    ]
};