import { sendRequest } from '../requests'

const createOrderOrderLines = async (OrderLines, address, locale, zipcode, observation, fiscalNumber) => {
    return await sendRequest('POST', 'transactions/createOrderOrderLines', { address, locale, zipcode, observation, fiscalNumber, OrderLines });
};

const createEggsBatchEggsBatchLines = async (name, ExplorationId, EggsBatchLines) => {
    return await sendRequest('POST', 'transactions/createEggsBatchEggsBatchLines', { name, ExplorationId, EggsBatchLines });
}

export { createOrderOrderLines, createEggsBatchEggsBatchLines }