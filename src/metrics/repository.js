module.exports = (db) => {
    const logs = db.collection("logs");

    return ({
        async add(log) {
            return logs.insertOne(
                {
                    clientId: log.clientId,
                    category: log.category,
                    chatId: log.chatId,
                    createdAt: log.createdAt,
                },
            );
        },


        async findBy(query) {

            let queryBuilder = {};
            queryBuilder.clientId = query.clientId;
            if (query.categories) {
                queryBuilder.category = { $in: query.categories.split(',') };
            }
            if (query.period) {
                // Find date in window size 'day', 'week', 'month', 'year' from now
                if (query.period === 'day') {
                    queryBuilder.createdAt = {
                        $gte: new Date(new Date().setHours(0, 0, 0, 0)),
                        $lte: new Date(new Date().setHours(23, 59, 59, 999))
                    };
                } else if (query.period === 'week') {
                    queryBuilder.createdAt = {
                        $gte: new Date(new Date().setDate(new Date().getDate() - 7)),
                    }
                } else if (query.period === 'month') {
                    queryBuilder.createdAt = {
                        $gte: new Date(new Date().setDate(new Date().getDate() - 30)),
                    }
                } else if (query.period === 'year') {
                        queryBuilder.createdAt = {
                            $gte: new Date(new Date().setDate(new Date().getDate() - 365)),
                        }
                    }
            } else if (query.startDate && query.endDate) {
                queryBuilder.createdAt = {
                    $gte: new Date(query.startDate),
                    $lte: new Date(query.endDate)
                };
            }
            let groupByDate = {};
            if (query.groupByDate) {
                // Group by date in window size 'hour', 'day', 'week', 'month', 'year'
                if (query.groupByDate === 'hour') {
                    groupByDate = {
                        $dateToString: {
                            format: "%Y-%m-%d %H:00:00",
                            date: "$createdAt"
                        }
                    }
                } else if (query.groupByDate === 'day') {
                    groupByDate = {
                        $dateToString: {
                            format: "%Y-%m-%d",
                            date: "$createdAt"
                        }
                    }
                } else if (query.groupByDate === 'week') {
                    groupByDate = {
                        $dateToString: {
                            format: "%Y-%W",
                            date: "$createdAt"
                        }
                    }
                } else if (query.groupByDate === 'month') {
                    groupByDate = {
                        $dateToString: {
                            format: "%Y-%m",
                            date: "$createdAt"
                        }
                    }
                } else if (query.groupByDate === 'year') {
                    groupByDate = {
                        $dateToString: {
                            format: "%Y",
                            date: "$createdAt"
                        }
                    }
                }
            }
            const res = logs
                .aggregate([
                    {
                        $match: queryBuilder
                    },
                    {
                        $group: {
                            _id: groupByDate,
                            count: { $sum: 1 },
                        }
                    },

                    {
                        $project: {
                            count: 1,
                            _id: 1,
                        }
                    }
                ]);
            return res.toArray();
        }
    });
};