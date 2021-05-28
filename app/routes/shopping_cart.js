module.exports = app => {
    const shoppingCarts = require("../controllers/shopping_cart_controller.js");
    const bodyParser = require('body-parser')

  
    var router = require("express").Router();

    var jsonParser = bodyParser.json()

  
    // Create a new shoppingCart
    router.post("/create", jsonParser, shoppingCarts.create);
  
    // Retrieve all shoppingCarts
    router.get("/", shoppingCarts.getAll);
  
    // Retrieve a single shoppingCart with id
    router.get("/:id", shoppingCarts.get);

    // Delete a shoppingCart with id
    router.delete("/:id", shoppingCarts.delete);

    // Add item to cart
    router.post("/addItem/:id", jsonParser, shoppingCarts.addItem);

    // Remove item from cart
    router.delete("/removeItem/:id", jsonParser, shoppingCarts.removeItem);
  
    app.use('/api/shoppingCarts', router);
  };