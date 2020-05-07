exports.up = async function (knex) {
    await knex.schema.createTable("users", (table) => {
        table.increments("id");
        table.string("username").unique().notNullable();
        table.string("email").unique().notNullable();
        table.string("password").notNullable();
        table.string("sessionId");
        table.string("reset_password_token");
        table.timestamp("reset_token_expiry");
    });

    await knex.schema.createTable("movies", (table) => {
        table.increments("id");
        table.string("title").notNullable();
        table.integer("year");
    });

    await knex.schema.createTable("tags", (table) => {
        table.increments("id");
        table.string("key");
    });

    await knex.schema.createTable("users_movies", (table) => {
        table.increments("id");
        table
            .integer("user_id")
            .references("id")
            .inTable("users")
            .notNullable();
        table
            .integer("user_id")
            .references("id")
            .inTable("movies")
            .notNullable();
        table.boolean("watched");
        table.integer("review");
        table.boolean("wishlist");
    });

    await knex.schema.createTable("users_tags", (table) => {
        table.increments("id");
        table
            .integer("user_id")
            .references("id")
            .inTable("users")
            .notNullable();
        table
            .integer("user_id")
            .references("id")
            .inTable("movies")
            .notNullable();
    });
};

exports.down = async function (knex) {};
