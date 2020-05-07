const { DB } = require("./secrets");

module.exports = {
    development: {
        client: "pg",
        connection: {
            host: DB.host,
            user: DB.user,
            password: DB.password,
            database: DB.database,
            charset: "utf8"
        },
        migrations: {
            directory: __dirname + "/db/migrations"
        },
        seeds: {
            directory: __dirname + "/db/seeds"
        }
    }
};
