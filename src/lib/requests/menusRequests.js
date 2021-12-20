import { sendRequest } from './requests'

const getMenus = async () => {
    return await sendRequest('GET', 'menus');
};

const getMenuId = async (id) => {
    return await sendRequest('GET', 'menus/id/' + id);
};


const getMenuUserId = async (UserId) => {
    return await sendRequest('GET', 'menus/UserId/' + UserId);
};

const createMenu = async (RestaurantId, name, description, image, active) => {
    return await sendRequest('POST', 'menus/create', { RestaurantId, name, description, image, active })
};

const updateMenu = async (id, RestaurantId, name, description, image, active) => {
    return await sendRequest('PUT', 'menus/update', { id, RestaurantId, name, description, image, active })
};

const deleteMenu = async (id) => {
    return await sendRequest('DELETE', 'menus/delete', { id })
}

export { getMenus, getMenuId, getMenuUserId, createMenu, updateMenu, deleteMenu }