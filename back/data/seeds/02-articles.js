exports.seed = async function (knex) {    
    await knex('articles').insert([
      {
        title: "The Scandalous Life of Bees",
        text: "This is a sample article",
        topic: "Bee Secrets"
      },
      {
        title: "Apiary for Web Developers",
        text: "This is also a sample article",
        topic: "Bee-Keeping"
      },
      {
        title: "Bee-ing Yourself",
        text: "You get the idea",
        topic: "More Bees"
      },
    ])
    return;
  }