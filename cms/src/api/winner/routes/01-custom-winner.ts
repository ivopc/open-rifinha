export default {
    routes: [
        {
            method: "GET",
            path: "/winners/all",
            handler: "api::winner.winner.findAll"
        },
        {
            method: "POST",
            path: "/winners/define",
            handler: "api::winner.winner.define"
        }
    ]
};