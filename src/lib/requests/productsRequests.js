import { sendRequest } from './requests'

const getProducts = async () => {
    return await sendRequest('GET', 'products');
};
const getProductsUserId = async () => {
    return await sendRequest('GET', 'products/UserId');
};
const getProductId = async (id) => {
    return await sendRequest('GET', 'products/id/' + id);
};

const getProductByType = async (type) => {
    return await sendRequest('GET', 'products/type/' + type);
};

const getProductByExploration = async (ExplorationId, type) => {
    return await sendRequest('GET', 'products/ExplorationId/' + ExplorationId + '/type/' + type);
};

const getProductsAllAvailable = async () => {
    return await sendRequest('GET', 'products/allAvailable');
}

const getProductsAllAvailableId = async (id) => {
    return await sendRequest('GET', 'products/allAvailable/id/' + id);
}

const getProductsAllAvailableType = async (type) => {
    return await sendRequest('GET', 'products/allAvailable/type/' + type);
}
const getProductsAllAvailableTypeOrganization = async (type, organization) => {
    return await sendRequest('GET', 'products/allAvailable/type/' + type + '/organization/' + organization);
}

const getProductsAllAvailableInOrganization = async (organizations) => {
    return await sendRequest('POST', 'products/allAvailable/inOrganization', { organizations });
}

const createProduct = async (type, tax, name, description, price, unit, image, OrganizationId) => {
    return await sendRequest('POST', 'products/create', { type, tax, name, description, price, unit, image, OrganizationId })
};

const updateProduct = async (id, tax, name, description, price, image) => {
    return await sendRequest('PUT', 'products/update', { id, tax, name, description, price, image })
};

const deleteProduct = async (id) => {
    return await sendRequest('DELETE', 'products/delete', { id })
}

export {
    getProducts, getProductsUserId, getProductId, getProductByType, getProductByExploration,
    getProductsAllAvailable, getProductsAllAvailableId, getProductsAllAvailableType, getProductsAllAvailableTypeOrganization, getProductsAllAvailableInOrganization,
    createProduct, updateProduct, deleteProduct
}
