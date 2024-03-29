import { sendRequest } from './requests'

const getOrdersLines = async () => {
    return await sendRequest('GET', 'orderLines');
};
const getOrdersLinesUserId = async () => {
    return await sendRequest('GET', 'orderLines/UserId');
};

const getOrderLinesId = async (id) => {
    return await sendRequest('GET', 'orderLines/id/' + id);
};

const getOrderLinesOrderId = async (OrderId) => {
    return await sendRequest('GET', 'orderLines/OrderId/' + OrderId);
};

const createOrderLine = async (OrderId, quantity, AnimalProductId, EggsBatchProductId) => {
    return await sendRequest('POST', 'orderLines/create', { OrderId, quantity, AnimalProductId, EggsBatchProductId })
};

const updateOrderLine = async (id, quantity) => {
    return await sendRequest('PUT', 'orderLines/update', { id, quantity })
};

const deleteOrderLine = async (id) => {
    return await sendRequest('DELETE', 'orderLines/delete', { id })
}

export { getOrdersLines, getOrdersLinesUserId, getOrderLinesId, getOrderLinesOrderId, createOrderLine, updateOrderLine, deleteOrderLine }