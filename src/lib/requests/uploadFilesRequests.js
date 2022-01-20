import { sendImageRequest, sendRequest } from './requests'


// const getFile = async (id) => {
//     return await sendRequest('GET', 'uploadFiles/' + id);
// };

const createFile = async (file) => {
    return await sendImageRequest('uploadFiles/create', file)
};

export { createFile }