const router = require("express").Router();
const Articles = require("./model.js");
const { restricted } = require("../auth/middleware.js");

router.get("/", restricted, (req, res, next) => {
  Articles.find()
    .then(articles => {
      res.status(200).json(articles);
    })
    .catch(next);
});

router.post("/", restricted, (req, res, next) => {
  const article = {title: req.body.title, topic: req.body.topic, text: req.body.text} 
  Articles.add(article)
    .then(article => {
      res.status(201).json(article[0]);
    })
    .catch(next);
});

router.put("/:article_id", restricted, (req, res, next) => {
  const article = {title: req.body.title, topic: req.body.topic, text: req.body.text} 
  Articles.edit(req.params.article_id, article)
    .then(article => {
      res.status(201).json(article[0]);
    })
    .catch(next);
});

router.delete("/:article_id", restricted, async (req, res, next) => {
  Articles.remove(req.params.article_id)
  .then(() => res.status(200).json({message: "successfully deleted"}))
  .catch(next);
});

module.exports = router;