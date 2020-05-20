const express = require('express');
const shortid = require('shortid');
const router = express.Router();

const { getRepository } = require('../db');

module.exports = (TABLE) => {
  const repo = getRepository(TABLE);

  router.get('/', function (req, res) {
    const { query } = req;
    repo.getAll(query).then((data) => {
      res.json(data);
    });
  });

  router.get('/:id', function (req, res) {
    const { id } = req.params;
    repo
      .get(id)
      .then((data) => res.json(data))
      .catch(() => res.sendStatus(404));
  });

  router.post('/', function (req, res) {
    const { body } = req;
    body.id = shortid.generate();
    repo.add(body).then((data) => res.json(data));
  });

  router.put('/:id', function (req, res) {
    const { id } = req.params;
    const { body } = req;
    repo.edit(id, body).then((data) => res.json(data));
  });

  router.delete('/:id', function (req, res) {
    const { id } = req.params;
    repo.deleteItem(id).then((_) => res.json({}));
  });

  return router;
};
