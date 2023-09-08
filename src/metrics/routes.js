module.exports = ({repository, logger}) => {
    const router = require('express').Router();
    const controller = require("./controller")({repository});

    router.get("/metrics", controller.findMetrics);

    return router;
}