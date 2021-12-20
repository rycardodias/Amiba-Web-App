import { sendRequest} from './requests'
import Cookies from 'js-cookie';

const getUsers = async () => {
    return await sendRequest('GET', 'users');
};

const getUserId = async (id) => {
    return await sendRequest('GET', 'users/id/' + id);
};

const createUser = async (name, email, password, address, locale, zipcode, fiscalNumber, telephone, mobilePhone) => {
    return await sendRequest('POST', 'users/create', { name, email, password, address, locale, zipcode, fiscalNumber, telephone, mobilePhone })
};

const updateUser = async (token, id, name, email, password, address, locale, zipcode, fiscalNumber, telephone, mobilePhone) => {
    return await sendRequest('PUT', 'users/update', { token, id, name, email, password, address, locale, zipcode, fiscalNumber, telephone, mobilePhone })
};

const deleteUser = async (token, id) => {
    return await sendRequest('DELETE', 'users/delete', { token, id })
}

const login = async (email, password) => {
    return await sendRequest('POST', 'users/login', { email, password });
}

const logout = async () => {
    Cookies.remove('user_token')
    return await sendRequest('POST', 'users/logout');
};

const getUserByToken = async (token) => {
    return await sendRequest('GET', 'users/me/' + token)
}

const updateAddress = async (id, token, address, locale, zipcode) => {
    return await sendRequest('PUT', 'users/update', { id, token, address, locale, zipcode });
};

const updatePassword = async (id, oldPassword, newPassword) => {
    const token = Cookies.get('user_token')
    return await sendRequest('PUT', 'users/update/password', { id, token, oldPassword, newPassword });
};

export { getUsers, getUserId, createUser, updateUser, deleteUser, login, logout, updateAddress, updatePassword, getUserByToken }