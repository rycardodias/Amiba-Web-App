import { sendRequest } from './requests'

const getCertifications = async () => {
    return await sendRequest('GET', 'certifications');
};


const getCertificationId = async (id) => {
    return await sendRequest('GET', 'certifications/id/' + id);
};

const createCertification = async (ExplorationId, certificationCode, initialDate, finalDate, description) => {
    return await sendRequest('POST', 'certifications/create', { ExplorationId, certificationCode, initialDate, finalDate, description })
};

const updateCertification = async (id, description, finalDate) => {
    return await sendRequest('PUT', 'certifications/update', { id, description, finalDate })
};

const deleteCertification = async (id) => {
    return await sendRequest('DELETE', 'certifications/delete', { id })
}

export { getCertifications, getCertificationId, createCertification, updateCertification, deleteCertification }