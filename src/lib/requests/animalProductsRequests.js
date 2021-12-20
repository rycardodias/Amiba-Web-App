import { sendRequest } from 'src/lib/requests/requests'

const getAnimalProducts = async () => {
    return await sendRequest('GET', 'animalProducts');
};

const getAnimalProductsProductIdAnimalId = async (ProductId, AnimalId) => {
    return await sendRequest('GET', 'animalProducts/ProductId/' + ProductId + '/AnimalId/' + AnimalId);
};

const getAnimalProductsAvailableProductId = async (ProductId) => {
    return await sendRequest('GET', 'animalProducts/available/ProductId/' + ProductId);
}

const createAnimalProducts = async (ProductId, AnimalId, quantity, weight) => {
    return await sendRequest('POST', 'animalProducts/create', { ProductId, AnimalId, quantity, weight })
};

const updateAnimalProducts = async (id, quantity, weight) => {
    return await sendRequest('PUT', 'animalProducts/update', { id, quantity, weight })
};

const deleteAnimalProducts = async (id) => {
    return await sendRequest('DELETE', 'animalProducts/delete', { id })
}

export {
    getAnimalProducts, getAnimalProductsProductIdAnimalId,
    getAnimalProductsAvailableProductId,
    createAnimalProducts, updateAnimalProducts, deleteAnimalProducts
}
