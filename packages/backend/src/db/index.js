const low = require('lowdb');
const FileAsync = require('lowdb/adapters/FileAsync');

const defaultValue = {
  games: [],
};

let db;

const initDb = async () => {
  if (!db) {
    const adapter = new FileAsync('db.json', { defaultValue });
    db = await low(adapter);
    return db;
  } else {
    return Promise.resolve(db);
  }
};

const getRepository = (TABLE) => {
  const add = async (data) => {
    await initDb();
    await db.get(TABLE).push(data).write();
    return get(data.id);
  };

  const edit = async (id, data) => {
    await initDb();
    const item = await db.get(TABLE).find({ id });
    await item.assign(data).write();
    return get(id);
  };

  const get = async (id) => {
    await initDb();
    const data = db.get(TABLE).find({ id }).value();
    return data ? Promise.resolve(data) : Promise.reject();
  };

  const getAll = async (filter = {}) => {
    await initDb();
    const data = db.get(TABLE).value() || [];
    return Promise.resolve(data);
  };

  const deleteItem = async (id) => {
    await initDb();
    return db.get(TABLE).remove({ id });
  };

  return {
    add,
    edit,
    get,
    getAll,
    deleteItem,
  };
};

module.exports = {
  db,
  getRepository,
};
