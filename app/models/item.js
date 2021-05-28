module.exports = mongoose => {
  const ItemSchema = mongoose.Schema(
    {
      name: String,
      price: Number,
      image: String,
      description: String,
      discounts: [Number],
    },
    { timestamps: true }
  );
    const Item = mongoose.model("item",ItemSchema)

    return Item;
  };
