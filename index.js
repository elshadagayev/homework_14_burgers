const express = require("express");
const bodyParser = require("body-parser");
const Burgers = require("./app/models/burgers");
const app = express();

// Sets up the Express app to handle data parsing
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.set("port", (process.env.PORT || 5000));
app.use(express.static(__dirname + "/public"));

const exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

const burgers = new Burgers(app);

app.listen(app.get("port"), () => {
  console.log("Listening on PORT " + app.get("port"));
});