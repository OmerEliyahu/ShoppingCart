const db = require("../models");
const itemUtils = require("../utils/item.js")
const Item = db.items;
const ShoppingCart = db.shoppingCarts;


// create shopping cart
exports.create = (req, res) => {  
  // Create a shopping cart
  const shoppingCart = new ShoppingCart({items: {}});

  // Save shoppingCart in the database
  shoppingCart
    .save(shoppingCart)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Shopping cart."
      });
    });
}

// get all shopping carts in db
exports.getAll = (req, res) => {
    ShoppingCart.find()
        .then(data => {res.send(data);}
    )
        .catch(err => {
            res.status(500).send({
                message:
                err.message || "Some error occurred while retrieving items."
    });
    });
};

exports.get = (req, res) => {
    const id = req.params.id;
    ShoppingCart.findById(id)
    .then(data => {
    if (!data)
        res.status(404).send({ message: "Not found Shopping cart with id " + id });
    else{
        let parsedCart = {}
        parsedCart.items = data.items
        parsedCart.id = data.id
        const keys = data.items.keys()
        const itemIds = []
        for (const key of keys) {
            itemIds.push(key);
          }
          
    Item.find({
            '_id': { $in: itemIds}
        }, function(err, items){
            const totalPrice = items.reduce((sum, item) => sum + itemUtils.getItemFinalPrice(item), 0)
            const priceBeforeDiscount = items.reduce((sum, item) => sum + item.price, 0)
            parsedCart = {...parsedCart, totalPrice, priceBeforeDiscount}
            res.send(parsedCart)
        });
    }})
    .catch(err => {
    res
        .status(500)
        .send({ message: "Error retrieving ShoppingCart with id=" + id });
    });
};

// delete shopping cart
exports.delete = (req, res) => {
    const id = req.params.id;
  
    ShoppingCart.findByIdAndRemove(id)
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `Cannot delete Item ShoppingCart id=${id}. Maybe ShoppingCart was not found!`
          });
        } else {
          res.send({
            message: "ShoppingCart was deleted successfully!"
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete ShoppingCart with id=" + id
        });
      });
  };

  // add item to shopping cart, shopping cart id in url item id in body
exports.addItem = (req, res) => {  
  if (!req.body || !req.body.id) {
      return res.status(400).send({
      message: "Data to update can not be empty!"
      });
  }
  const shoppingCartId = req.params.id;
  const itemId = req.body.id;
  ShoppingCart.findById(shoppingCartId)
  .then(data => {
    if (!data)
        res.status(404).send({ message: "Not found ShoppingCart with id " + shoppingCartId });
    else {
        Item.count({_id: itemId}, (err, count) =>
            {
                if(count > 0){
                    const current_items = data.items || {}
                    let new_items = current_items;
                    const current_item_number = current_items.get(itemId)
                    if(current_item_number){
                        new_items.set(itemId, current_item_number + 1)
                    }
                    else{
                        new_items.set(itemId, 1)
                    }
                    data.items = new_items
                    data.save()
                    res.send({
                        message: "Item was added successfully to the shopping cart",
                        data
                      });
                }
                else{
                    res.status(404).send({
                        message: `Item doesn't exist.`
                      });
                }
            } 
        );
    }
  })
  .catch(err => {
  res
      .status(500)
      .send({ message: "Error retrieving Shopping Cart with id=" + shoppingCartId });
  });
}

  // remove item from shopping cart, shopping cart id in url item id in body
exports.removeItem = (req, res) => {  
    if (!req.body || !req.body.id) {
        return res.status(400).send({
        message: "Data to update can not be empty!"
        });
    }
    const shoppingCartId = req.params.id;
    const itemId = req.body.id;
    ShoppingCart.findById(shoppingCartId)
    .then(data => {
      if (!data)
          return res.status(404).send({ message: "Not found ShoppingCart with id " + shoppingCartId });
      else {
          Item.count({_id: itemId}, (err, count) =>
              {
                  if(count > 0){
                      const current_items = data.items || {}
                      let new_items = current_items;
                      const current_item_number = current_items.get(itemId)
                      if(current_item_number){
                          if(current_item_number == 1){
                            new_items.set(itemId, undefined)
                          }
                          else{
                            new_items.set(itemId, current_item_number - 1)
                          }
                      }
                      else{
                        return res.status(404).send({ message: "Not found Item not in Shopping Cart " + itemId });
                    }
                      data.items = new_items
                      data.save()
                      res.send({
                          message: "Item was removed successfully from the shopping cart",
                          data
                        });
                  }
                  else{
                      res.status(404).send({
                          message: `Item doesn't exist.`
                        });
                  }
              } 
          );
      }
    })
    .catch(err => {
    res
        .status(500)
        .send({ message: "Error retrieving Shopping Cart with id=" + shoppingCartId });
    });
  }
  