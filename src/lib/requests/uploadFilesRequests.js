import { sendImageRequest } from './requests'


const getFile = async (id) => {
    return await sendImageRequest('GET', 'uploadFiles/' + id);
};

const createFile = async (file) => {
    return await sendImageRequest('uploadFiles/create', file)
};

export { getFile, createFile }