import { sendRequest } from './requests'

const getOrderHistory = async () => {
    return await sendRequest('GET', 'orderHistory');
};

const getOrderHistoryId = async (id) => {
    return await sendRequest('GET', 'orderHistory/id/' + id);
};

const createOrderHistory = async (state, OrderId) => {
    return await sendRequest('POST', 'orderHistory/create', { state, OrderId })
};

const updateOrderHistory = async (id, state) => {
    return await sendRequest('PUT', 'orderHistory/update', { id, state })
};

const deleteOrderHistory = async (id) => {
    return await sendRequest('DELETE', 'orderHistory/delete', { id })
}

export { getOrderHistory, getOrderHistoryId, createOrderHistory, updateOrderHistory, deleteOrderHistory }