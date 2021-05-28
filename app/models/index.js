const dbConfig = require("../config/db.config.js");

const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;
db.items = require("./item.js")(mongoose);
db.shoppingCarts = require("./shopping_cart.js")(mongoose);


module.exports = db;