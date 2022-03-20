import { sendRequest } from '../requests'

const createOrderOrderLines = async (OrderLines, address, locale, zipcode, observation, fiscalNumber) => {
    return await sendRequest('POST', 'transactions/createOrderOrderLines', { address, locale, zipcode, observation, fiscalNumber, OrderLines });
};


const createEggsBatchEggsBatchProducts = async (name, ExplorationId, EggsBatchProducts) => {
    return await sendRequest('POST', 'transactions/createEggsBatchEggsBatchProducts', { name, ExplorationId, EggsBatchProducts });
}

export { createOrderOrderLines, createEggsBatchEggsBatchProducts }