exports.seed = async (knex) => {
    await knex('users').truncate();
    await knex('roles').truncate();
    return;
  };  