const { getRepository } = require('../db');

const TABLE = 'games';

module.exports = getRepository(TABLE);
