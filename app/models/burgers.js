const orm = require(__dirname + "/../config/orm");
const Burger = require("./burger");

class Burgers {
	constructor (app) {
		this.app = app;

		this.setHTMLRoutes();
		this.setAPIRoutes();
	}

	getAll(callback) {
		orm.selectAll(function(err, result){
			if(err) return callback(err, []);

			let ret = [];
			for(let i in result) {
				let burger = result[i];
				ret.push(new Burger(burger.id, burger.name, burger.devoured ? true : false))
			}

			callback(err, ret);
		});
	}

	insert(name, callback) {
		orm.insertOne(name, callback);
	}

	update(o, callback) {
		orm.updateOne(o, callback);
	}

	setHTMLRoutes () {
		this.app.get("/index", (req, res) => {
			res.render("index")
		});
	}

	setAPIRoutes () {
		this.app.get("/api/burgers", (req, res) => {
			this.getAll((err, data) => {
				if(err)
					return console.log(`GET api/burgers error: ${err}. File ${__filename}. Line: 44`);
				console.log(`[${new Date().toLocaleString()}] GET /api/burgers `)
				res.json(data);
			});
		});

		this.app.post("/api/burgers/new", (req, res) => {
			this.insert(req.body.name, function(err, burgerId) {
				if(err)
					return console.log(`POST api/burgers/new error: ${err}. File ${__filename}. Line: 52`);
				console.log(`[${new Date().toLocaleString()}] POST /api/burgers/new. Req.Body:`, req.body)
				res.json({
					burgerId
				})
			})
		})


		this.app.put('/api/burgers', (req, res) => {
			this.update({
				id: req.body.id,
				name: req.body.name,
				devoured: req.body.devoured
			}, (err, data) => {
				if(err)
					return console.log(`UPDATE api/burgers error: ${err}. File ${__filename}. Line: 68`);
				console.log(`[${new Date().toLocaleString()}] UPDATE /api/burgers. Req.Body:`, req.body)
				res.json(data);
			})
		})
	}
}

module.exports = Burgers;