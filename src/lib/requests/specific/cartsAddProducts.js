import { createCart } from 'lib/requests/cartsRequests'

const addItem = async (Product, quantity, token) => {
    if (Product.type === "ANIMAL") {
        return await addAnimalProducts(token, quantity, Product.AnimalProducts)
    } else {
        return await addEggsBatchProducts(token, quantity, Product.EggsBatchProducts)
    }
}


const addAnimalProducts = async (token, quantity, data) => {
    let i = quantity
    let j = 0
    while (i > 0) {
        if (i <= data[j].quantityAvailable) {
            const create = await createCart(token, data[j].id, undefined, i)
            if (create.error) return create.error
            return create.data
        } else {
            const create = await createCart(token, data[j].id, undefined, data[j].quantityAvailable)
            if (create.error) return create.error
            if (create.data.error) return create.data

            i -= data[j].quantityAvailable
        }
        j++
    }
}

const addEggsBatchProducts = async (token, quantity, data) => {
    let i = quantity
    let j = 0
    while (i > 0) {
        if (i <= data[j].quantityAvailable) {
            const create = await createCart(token, undefined, data[j].id, i)
            if (create.error) return create.error
            return create.data
        } else {
            const create = await createCart(token, undefined, data[j].id, data[j].quantityAvailable)
            if (create.error) return create.error
            if (create.data.error) return create.data

            i -= data[j].quantityAvailable
        }
        j++
    }
}

export { addItem }
