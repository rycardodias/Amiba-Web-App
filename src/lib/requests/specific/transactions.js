import { sendRequest } from '../requests'

const createOrderOrderLines = async (OrderLines, address, locale, zipcode, observation, fiscalNumber) => {
    return await sendRequest('POST', 'transactions/createOrderOrderLines', { address, locale, zipcode, observation, fiscalNumber, OrderLines });
};

export { createOrderOrderLines }