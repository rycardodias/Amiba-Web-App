import { sendRequest } from './requests'

const getEggsBatchProducts = async () => {
    return await sendRequest('GET', 'eggsBatchProducts');
};

const getEggsBatchProductsProductIdEggsBatchId = async (ProductId, EggsBatchId) => {
    return await sendRequest('GET', 'eggsBatchProducts/ProductId/' + ProductId + '/EggsBatchId/' + EggsBatchId);
};

const createEggsBatchProducts = async (ProductId, EggsBatchId, quantity) => {
    return await sendRequest('POST', 'eggsBatchProducts/create', { ProductId, EggsBatchId, quantity })
};

const updateEggsBatchProducts = async (id, quantity) => {
    return await sendRequest('PUT', 'eggsBatchProducts/update', { id, quantity })
};

const deleteEggsBatchProducts = async (id) => {
    return await sendRequest('DELETE', 'eggsBatchProducts/delete', { id })
}

export { getEggsBatchProducts, getEggsBatchProductsProductIdEggsBatchId, createEggsBatchProducts, updateEggsBatchProducts, deleteEggsBatchProducts }
