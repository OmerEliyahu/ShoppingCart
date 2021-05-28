module.exports = app => {
    const items = require("../controllers/items_controller.js");
    const bodyParser = require('body-parser')

  
    var router = require("express").Router();

    var jsonParser = bodyParser.json()

  
    // Create a new Item
    router.post("/create", jsonParser, items.create);
  
    // Retrieve all Items
    router.get("/", items.getAll);
  
    // Retrieve a single Item with id
    router.get("/:id", items.get);
  
    // Update a Item with id
    router.put("/:id", jsonParser, items.update);

    // Remove oldest discount
    router.delete("/removeOldestDiscount/:id", jsonParser, items.removeOldestDiscount);

    // Add to item new discount
    router.post("/addDiscount/:id", jsonParser, items.addDiscount);
  
    // Delete a Item with id
    router.delete("/:id", items.delete);
  
    app.use('/api/items', router);
  };