const connection = require("./connection.js");
const orm = {
  selectAll: function(callback) {
    const queryString = "SELECT * FROM burgers";
    connection.query(queryString, callback);
  },

  insertOne: function(name, callback) {
    const queryString = "insert into burgers (name) values(?)";
    connection.query(queryString, [name], function(err, result) {
      if (err)
        return callback(err, null)
      
      callback(null, result.insertId);
    });
  },
  updateOne: function(o, callback) {
    o = Object.assign({
      id: null,
      name: null,
      devoured: null
    }, o);

    var queryString = "update burgers set name = if(? is not null, ?, name), devoured = if(? is not null, ?, devoured) where id = ?";

    let devoured = null;
    if(o.devoured !== null)
      devoured = o.devoured ? 1 : 0;

    connection.query(queryString, [o.name, o.name, devoured, devoured, o.id, o.id], function(err, result) {
      if(err)
        return callback(err, {});
      callback(err, result);
    });
  }
};

module.exports = orm;
