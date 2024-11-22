const router = require('express').Router();
const Person = require('../models/person');

router.post('/reset', async (req, res) => {
  await Person.deleteMany({});

  res.status(204).end();
});

module.exports = router;
