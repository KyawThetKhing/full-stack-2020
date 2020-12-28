import axios from 'axios';
const baseUrl = '/api/';

const getAll = () => {
    const request = axios.get(baseUrl + 'persons');
    return request.then(response => response.data);
}

const createPhone = (person) => {
    const request = axios.post(baseUrl + 'persons', person);
    return request.then(response => response.data);
}

const updatePhone = (id, person) => {
    const request = axios.put(baseUrl + `persons/${id}`, person);
    return request.then(response => response.data);
}

const deletePhone = (id) => {
    const request = axios.delete(baseUrl + `persons/${id}`)
    return request.then(response => response.data);
}

export default {
    getAll,
    createPhone,
    updatePhone,
    deletePhone
}