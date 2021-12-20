import { sendRequest } from './requests'

const getCarts = async () => {
    return await sendRequest('GET', 'carts');
};

const getCartId = async (id) => {
    return await sendRequest('GET', 'carts/id/' + id);
};

const getCartByUser = async (UserId) => {
    return await sendRequest('GET', 'carts/UserId/' + UserId);
};
const getCartByUserWithProduct = async (UserId) => {
    return await sendRequest('GET', 'carts/UserId/Product/' + UserId);
};

const createCart = async (UserId, AnimalProductId, EggsBatchProductId, quantity) => {
    return await sendRequest('POST', 'carts/create', { UserId, AnimalProductId, EggsBatchProductId, quantity })
};

const updateCart = async (id, quantity) => {
    return await sendRequest('PUT', 'carts/update', { id, quantity })
};

const deleteCart = async (id) => {
    return await sendRequest('DELETE', 'carts/delete', { id })
}

export { getCarts, getCartId, getCartByUser, getCartByUserWithProduct, createCart, updateCart, deleteCart }
