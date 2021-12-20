import { createCart } from 'src/lib/requests/cartsRequests'
import { getProductsAllAvailableId } from 'src/lib/requests/productsRequests'
import { error_missing_quantity } from 'src/lib/values/messages'

const addItem = async (ProductId, quantity, UserId) => {
    const productsAvailable = (await getProductsAllAvailableId(ProductId)).data

    if (productsAvailable.error) {
        return 
    }

    if (productsAvailable.data.AnimalProducts.length > 0) {
        return addAnimalProducts(UserId, quantity, productsAvailable.data.AnimalProducts)
    } else if (productsAvailable.data.EggsBatchProducts.length > 0) {
        return addEggsBatchProducts(UserId, quantity, productsAvailable.data.EggsBatchProducts)
    } else {
        return error_missing_quantity
    }


}


const addAnimalProducts = async (UserId, quantity, data) => {
    let i = quantity
    let j = 0
    while (i > 0) {
        if (i <= data[j].quantityAvailable) {
            const create = await createCart(UserId, data[j].id, undefined, i)
            if (create.data.error) {
                return create.data.message || create.data.error
            }
            return create.data.message
        } else {
            const create = await createCart(UserId, data[j].id, undefined, data[j].quantityAvailable)
            if (create.data.error) {
                return create.data.message || create.data.error
            }

            i -= data[j].quantityAvailable
        }
        j++
    }
}

const addEggsBatchProducts = async (UserId, quantity, data) => {
    let i = quantity
    let j = 0
    while (i > 0) {
        if (i <= data[j].quantityAvailable) {
            const create = await createCart(UserId, undefined, data[j].id, i)
            if (create.data.error) {
                return create.data.message || create.data.error
            }
            return create.data.message
        } else {
            const create = await createCart(UserId, undefined, data[j].id, data[j].quantityAvailable)
            if (create.data.error) {
                return create.data.message || create.data.error
            }

            i -= data[j].quantityAvailable
        }
        j++
    }
}

export { addItem }
