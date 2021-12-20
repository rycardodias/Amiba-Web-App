import { sendRequest } from './requests'

const getOrders = async () => {
    return await sendRequest('GET', 'orders');
};

const getOrderId = async (id) => {
    return await sendRequest('GET', 'orders/id/' + id);
};

const getOrderUserId = async (UserId) => {
    return await sendRequest('GET', 'orders/UserId/' + UserId);
};

const createOrder = async (UserId) => {
    return await sendRequest('POST', 'orders/create', { UserId })
};

const updateOrder = async (id, address, locale, zipcode, observation, fiscalNumber) => {
    return await sendRequest('PUT', 'orders/update', { id, address, locale, zipcode, observation, fiscalNumber })
};

const deleteOrder = async (id) => {
    return await sendRequest('DELETE', 'orders/delete', { id })
}

export { getOrders, getOrderId, getOrderUserId, createOrder, updateOrder, deleteOrder }