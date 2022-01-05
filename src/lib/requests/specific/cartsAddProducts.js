import { createCart } from 'lib/requests/cartsRequests'

const addItem = async (Product, quantity) => {
    if (Product.type === "ANIMAL") {
        return await addAnimalProducts(quantity, Product.AnimalProducts)
    } else {
        return await addEggsBatchProducts(quantity, Product.EggsBatchProducts)
    }
}


const addAnimalProducts = async (quantity, data) => {
    let i = quantity
    let j = 0
    while (i > 0) {
        if (i <= data[j].quantityAvailable) {
            const create = await createCart(data[j].id, undefined, i)
            if (create.error) return create.error
            return create.data
        } else {
            const create = await createCart(data[j].id, undefined, data[j].quantityAvailable)
            if (create.error) return create.error
            if (create.data.error) return create.data

            i -= data[j].quantityAvailable
        }
        j++
    }
}

const addEggsBatchProducts = async (quantity, data) => {
    let i = quantity
    let j = 0
    while (i > 0) {
        if (i <= data[j].quantityAvailable) {
            const create = await createCart(undefined, data[j].id, i)
            if (create.error) return create.error
            return create.data
        } else {
            const create = await createCart(undefined, data[j].id, data[j].quantityAvailable)
            if (create.error) return create.error
            if (create.data.error) return create.data

            i -= data[j].quantityAvailable
        }
        j++
    }
}

export { addItem }
