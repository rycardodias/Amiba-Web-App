
function calcPrice(item) {
    if (item.AnimalProduct) {
        return (
            item.quantity *
            (item.AnimalProduct.Product.unit === "KG"
                ? (item.AnimalProduct.Product.price * item.AnimalProduct.weight) / 1000
                : item.AnimalProduct.Product.price)
        );
    } else {
        return (
            (item.EggsBatchProduct.Product.price * item.quantity)
        );
    }
}

function calcTotalPrice(list) {
    let total = 0;
    for (const element of list) {
        total = total + calcPrice(element)
    }
    return total.toFixed(2);
};

export { calcPrice, calcTotalPrice }