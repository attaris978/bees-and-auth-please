exports.up = knex => {
    return knex.schema
      .createTable('roles', roles => {
        roles.increments('role_id')
        roles.string('role_name', 32).notNullable().unique()
      })
      .createTable('users', users => {
        users.increments('user_id')
        users.string('username', 128).notNullable().unique()
        users.string('password', 128).notNullable()
        users.integer('role_id')
          .unsigned()
          .notNullable()
          .references('role_id')
          .inTable('roles')
          .onUpdate('RESTRICT')
          .onDelete('RESTRICT')
      })
      .createTable('articles', articles => {
        articles.increments("article_id");
        articles.string("title", 128).notNullable().unique()
        articles.string("text", 512).notNullable()
        articles.string("topic", 64).notNullable()
      })
  }
  
  exports.down = knex => {
    return knex.schema
      .dropTableIfExists('articles')
      .dropTableIfExists('users')
      .dropTableIfExists('roles')
  }  