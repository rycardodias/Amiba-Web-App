import { sendImageRequest } from './requests'

const createFile = async (file) => {
    return await sendImageRequest('uploadFiles/create', file)
};

export { createFile }