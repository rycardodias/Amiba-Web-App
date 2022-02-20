import { sendRequest } from './requests'

const getEggsBatchsLines = async () => {
    return await sendRequest('GET', 'eggsBatchsLines');
};

const getEggsBatchsLinesUserId = async () => {
    return await sendRequest('GET', 'eggsBatchsLines/UserId');
};

const getEggsBatchsLinesId = async (id) => {
    return await sendRequest('GET', 'eggsBatchsLines/id/' + id);
};

const createEggsBatchsLines = async (EggsBatchId, quantity) => {
    return await sendRequest('POST', 'eggsBatchsLines/create', { EggsBatchId, quantity, })
};

const updateEggsBatchsLines = async (id, quantity) => {
    return await sendRequest('PUT', 'eggsBatchsLines/update', { id, quantity })
};

const deleteEggsBatchsLines = async (id) => {
    return await sendRequest('DELETE', 'eggsBatchsLines/delete', { id })
}

export {
    getEggsBatchsLines, getEggsBatchsLinesUserId, getEggsBatchsLinesId, createEggsBatchsLines,
    updateEggsBatchsLines, deleteEggsBatchsLines
}