import LocalStorage from './local-storage';
import { FC_AUTH_TOKEN, FC_DATA } from '../const';


export const getAuthToken = () => {
    return LocalStorage.getItem(FC_AUTH_TOKEN);
}

export const setAuthToken = (authToken) => {
    LocalStorage.setItem(FC_AUTH_TOKEN, authToken);
}

export const setFcData = (data) => {
    if (!data) return null;
    LocalStorage.setItem(FC_DATA,data,true);
}

export const getFcData = () => {
    return LocalStorage.getItem(FC_DATA,true);
}
