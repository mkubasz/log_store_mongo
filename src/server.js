(async () => {
    const {dbPromise, initIndex} = await require("./connection");
    const db = await dbPromise;
    await initIndex(db);
    const app = await require('./app')(db);
    app.listen(3000);
})();