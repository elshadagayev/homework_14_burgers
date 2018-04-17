const mysql = require("mysql")
require("dotenv").config()

let db_config = {
  connectionLimit: 1024
}

if(process.env.IS_PUBLIC === 'Yes') {
  db_config = {
    ...db_config,
    host: process.env.MYSQL_PUB_HOST,
    user: process.env.MYSQL_PUB_USER,
    password: process.env.MYSQL_PUB_PASS,
    database: process.env.MYSQL_PUB_DB
  }
} else {
  db_config = {
    ...db_config,
    host: process.env.MYSQL_TEST_HOST,
    user: process.env.MYSQL_TEST_USER,
    password: process.env.MYSQL_TEST_PASS,
    database: process.env.MYSQL_TEST_DB
  }
}


var connection = mysql.createPool(db_config);

connection.query(`CREATE TABLE if not exists burgers (
id int(11) unsigned NOT NULL AUTO_INCREMENT,
name varchar(120) NOT NULL,
devoured tinyint(3) unsigned NOT NULL DEFAULT '0',
  PRIMARY KEY (id)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1
`, function(err, data) {
  if(err)
    return console.log("Error on creation table burgers. Error:", err)

    console.log("successfully was created table burgers")
});

connection.query("truncate table burgers", function(err, data) {
  if(err)
    return console.log("Error on truncate table burgers. Error", err)
    console.log("Truncated table burgers")
});

module.exports = connection;
