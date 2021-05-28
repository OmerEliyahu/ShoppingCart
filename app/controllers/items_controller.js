const db = require("../models");
const Item = db.items;


exports.create = (req, res) => {  
  // Create an Item
  const item = new Item({
    name: req.body.name,
    price: req.body.price,
    image: req.body.image,
    description: req.body.description,
    discounts: req.body.discounts
  });

  // Save Item in the database
  item
    .save(item)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Item."
      });
    });
}

// get all items in the databse
exports.getAll = (req, res) => {
    Item.find()
        .then(data => {res.send(data);}
    )
        .catch(err => {
            res.status(500).send({
                message:
                err.message || "Some error occurred while retrieving items."
    });
    });
};

// get specific item by id
exports.get = (req, res) => {
    const id = req.params.id;

    Item.findById(id)
    .then(data => {
    if (!data)
        res.status(404).send({ message: "Not found Item with id " + id });
    else res.send(data);
    })
    .catch(err => {
    res
        .status(500)
        .send({ message: "Error retrieving Item with id=" + id });
    });
};

// update item data
exports.update = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
        message: "Data to update can not be empty!"
        });
    }
    const id = req.params.id;

    Item.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
    if (!data) {
        res.status(404).send({
        message: `Cannot update Item with id=${id}. Maybe Item was not found!`
        });
    } else res.send({ message: "Item was updated successfully." });
    })
    .catch(err => {
        res.status(500).send({
            message: "Error updating Item with id=" + id
        });
    });
};

// delete item by id
exports.delete = (req, res) => {
    const id = req.params.id;
  
    Item.findByIdAndRemove(id)
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `Cannot delete Item with id=${id}. Maybe Item was not found!`
          });
        } else {
          res.send({
            message: "Item was deleted successfully!"
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete Item with id=" + id
        });
      });
  };

  // ad discount to item by id
exports.addDiscount = (req, res) => {  
  if (!req.body) {
      return res.status(400).send({
      message: "Data to update can not be empty!"
      });
  }
  const id = req.params.id;

  Item.findById(id)
  .then(data => {
    if (!data)
        res.status(404).send({ message: "Not found Item with id " + id });
    else {
      data.discounts.push(req.body.discount)
      data.save()
      res.send(data);
    }
  })
  .catch(err => {
  res
      .status(500)
      .send({ message: "Error retrieving Item with id=" + id });
  });
}

// remove oldest discount from item by id
exports.removeOldestDiscount = (req, res) => {  
  const id = req.params.id;

  Item.findById(id)
  .then(data => {
    if (!data)
        res.status(404).send({ message: "Not found Item with id " + id });
    else {
      data.discounts.shift()
      data.save()
      res.send(data);
    }
  })
  .catch(err => {
  res
      .status(500)
      .send({ message: "Error retrieving Item with id=" + id });
  });
}

