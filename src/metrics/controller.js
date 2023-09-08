const schema = require('./schema');
module.exports = ({repository}) => ({
    async findMetrics(req, res) {
        const qs = schema.parse(req.query);
        if (qs.error) {
            res.status(400).json({error: qs.error});
            return;
        }
        const result = await repository.findBy({...qs, clientId: req.clientId });

        res.json(result);
    }
});