const db = require('../../data/db-config.js');

function find() {
  return db('articles');
}

async function add(article) {
  const article_id = await db('articles').insert(article);
  return db('articles').where({article_id});
}

async function edit(article_id, article) {
  await db('articles').where({article_id}).update(article);
  return db('articles').where({article_id});
}

function remove(article_id) {
  return db('articles').where({article_id}).del();
}

module.exports = {
  find,
  add,
  edit,
  remove
};