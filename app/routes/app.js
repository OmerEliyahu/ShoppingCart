module.exports = app => {
  require("./item")(app);
  require("./shopping_cart")(app);
};