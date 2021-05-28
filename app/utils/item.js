module.exports = {
    getItemFinalPrice: function(item) {
        return item.discounts.reduce((accumulator, discount) => accumulator*(1-discount)) * item.price
    },
}