module.exports = ({db}) => {
    const router = require('express').Router();
    const repository = require("./repository")({db});
    const controller = require("./controller")({repository});

    router.get("/metrics", controller.findMetrics);

    return router;
}