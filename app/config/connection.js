var mysql = require("mysql");

const db_config_pub = {
  host: "us-cdbr-iron-east-05.cleardb.net",
  user: "b146266250c251",
  password: "22cd5e65",
  database: "heroku_9f87f8c18c30fd2"
};

const db_config_dev = {
  host: "localhost",
  user: "root",
  password: "root",
  database: "burgers_db"
}


var connection = mysql.createConnection(db_config_pub);

connection.connect(function(err) {
  if (err) {
    console.error("error connecting: " + err.stack);
    return;
  }
  console.log("connected as id " + connection.threadId);
  connection.query(`CREATE TABLE if not exists burgers (
  id int(11) unsigned NOT NULL AUTO_INCREMENT,
  name varchar(120) NOT NULL,
  devoured tinyint(3) unsigned NOT NULL DEFAULT '0',
	  PRIMARY KEY (id)
	) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1
  `, function(err, data) {
  	console.log(err, data);
  });

  connection.query("truncate table burgers", function(err, data) {
  	console.log(err, data);
  });
});

module.exports = connection;
