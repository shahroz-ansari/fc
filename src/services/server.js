import axios from 'axios';
import { getAuthToken } from '../utils/ls';


//setting up base url for axios request
axios.defaults.baseURL = process.env.REACT_APP_BASE_URL;

//setting request interceptor to add authToken to every request if available.
axios.interceptors.request.use(function (config) {
    const authToken = getAuthToken();
    if (authToken) {
        config.headers = {
            'Authorization': `Bearer ${authToken}`,
            'Accept': 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    }
    return config;
}, function (error) {
    return Promise.reject(error);
});



export const handleGoogleAuth = (idToken) => {
    return new Promise((resolve, reject) => {
        axios.get('auth/authenticate/google', {
            headers: {
                Authorization: `Bearer ${idToken}`
            }
        }).then(res => {
            if (res.status === 200) {
                axios.defaults.headers.Authorization = `Bearer ${res.data.data || ''}`;
                resolve(res.data.data);
            } else {
                reject('Error in auth request');
            }

        }).catch(err => {
            console.error('error in res', err);
            reject(err);
        })
    });
}

export const searchUser = (username) => {
    return new Promise((resolve, reject) => {
        axios.get('common/search/user/' + username).then(res => {
            resolve(res.data);
        }).catch(err => {
            console.error('error in res', err);
            reject(err);
        })
    });
}

