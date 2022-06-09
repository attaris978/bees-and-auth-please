const db = require('../../data/db-config.js');

function find() {
  return db.select('user_id', 'username', 'role_name').from('users').join('roles','users.role_id','roles.role_id');  
}

function findBy(filter) {
  return db.select('user_id', 'username', 'password', 'role_name')
  .from('users').join('roles','users.role_id','roles.role_id')
  .where(filter);  
}

function findById(user_id) {
  return db.select('user_id', 'username', 'role_name')
  .from('users').join('roles','users.role_id','roles.role_id')
  .where({user_id}).first();  
}

async function add({ username, password, role_name }) {
  let created_user_id
  await db.transaction(async trx => {
    let role_id_to_use
    const [role] = await trx('roles').where('role_name', role_name)
    if (role) {
      role_id_to_use = role.role_id
    } else {
      const [role_id] = await trx('roles').insert({ role_name: role_name })
      role_id_to_use = role_id
    }
    const [user_id] = await trx('users').insert({ username, password, role_id: role_id_to_use })
    created_user_id = user_id
  })
  return findById(created_user_id)
}

module.exports = {
  add,
  find,
  findBy,
  findById,
};