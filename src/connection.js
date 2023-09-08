const readEnvironmentVariable = require('./utils');
const { MongoClient, IndexDescription } = require("mongodb");
const getLogsIndexes = () => [
    { key: { clientId: 1, createdAt: 1 } },
];

const url = readEnvironmentVariable(process.env.MONGO_DB, 'mongodb://admin:admin@127.0.0.1:27017');
const connectionPromise = MongoClient.connect(url);
const dbPromise = connectionPromise.then(client => client.db());

const initIndex = async (db) => {
       const collection = db.collection("logs");
        await collection.createIndexes(getLogsIndexes());
}

module.exports = { dbPromise , initIndex };