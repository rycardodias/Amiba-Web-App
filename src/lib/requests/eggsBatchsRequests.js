import { sendRequest } from './requests'

const getEggsBatchs = async () => {
    return await sendRequest('GET', 'eggsBatchs');
};

const getEggsBatchsUserId = async () => {
    return await sendRequest('GET', 'eggsBatchs/UserId');
}
const getEggsBatchId = async (id) => {
    return await sendRequest('GET', 'eggsBatchs/id/' + id);
};

const getEggsBatchsByExploration = async (ExplorationId) => {
    return await sendRequest('GET', 'eggsBatchs/ExplorationId/' + ExplorationId);
};

const createEggsBatch = async (name, ExplorationId) => {
    return await sendRequest('POST', 'eggsBatchs/create', { name, ExplorationId })
};

const updateEggsBatch = async (id, name,) => {
    return await sendRequest('PUT', 'eggsBatchs/update', { id, name })
};

const deleteEggsBatch = async (id) => {
    return await sendRequest('DELETE', 'eggsBatchs/delete', { id })
}

export { getEggsBatchs, getEggsBatchsUserId, getEggsBatchId, getEggsBatchsByExploration, createEggsBatch, updateEggsBatch, deleteEggsBatch }
