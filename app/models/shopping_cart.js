const Item = require("./item");

module.exports = mongoose => {
    const ShoppingCart = mongoose.model(
      "shopping_cart",
      mongoose.Schema(
        {
          items: {
            type: Map,
            of: Number
          },
        },
        { timestamps: true }
      )
    );

    return ShoppingCart;
  };