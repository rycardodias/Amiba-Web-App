import { sendRequest } from '../requests'

const createOrderOrderLines = async (UserId, OrderLines) => {
    return await sendRequest('POST', 'transactions/createOrderOrderLines', { UserId, OrderLines });
};

export { createOrderOrderLines }