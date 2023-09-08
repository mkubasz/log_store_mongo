const express = require('express');
const authenticate = require('./auth');
const ClientError = require('./clientError');
const pino = require('pino-http');
function withErrorHandling(fn) {
    return async function(req, res) {
        try {
            await fn(req.body);
            res.status(204).send();
        } catch (e) {
            if (e instanceof ClientError) {
                res.status(400).json({error: e.message});
            }
            console.log(e);
            res.status(500).send();
        }
    };
}

module.exports = async (db) => {
    const {notFound, errorHandler} = require("./error");
    const app = express();
    app.use(pino());
    const repository = require("./metrics/repository")(db);

    const routes = require("./metrics/routes")({ repository });
    app.use(express.json());
    app.use('/health', (req, res) => {
        res.status(200).send();
    });



    function handle(command) {
        return withErrorHandling(command);
    }
    app.use(authenticate);
    app.use('/api', routes);

    app.use(notFound);
    app.use(errorHandler);
    return app;
};