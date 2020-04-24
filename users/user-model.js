const db = require("../database/dbConfig");

module.exports = {
  findBy,
  add,
  findById
};

function findById(id) {
  return db("users")
    .where({ id })
    .first();
}

function findBy(filter) {
  return db("users")
    .select("id", "username", "password")
    .where(filter);
}

function add(user) {
  return db("users")    
    .insert(user)
    .then(ids => {
      const [id] = ids;
      return findById(id);
    });
}