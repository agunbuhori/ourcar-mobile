import axios from 'axios';
import {API_URL} from '@env'
import { store } from '../../store';

const http = axios.create({
    baseURL: API_URL,
    headers: {
        "Content-Type": "application/json"
    }
})

store.subscribe(() => {
    const auth = store.getState().AuthReducer;

    if (auth.isAuthenticated) {
        http.defaults.headers.common["Authorization"] = `Bearer ${auth.token}`
    }
})


export default http;
