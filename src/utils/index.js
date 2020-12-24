import LocalStorage from './local-storage';
import { FC_AUTH_TOKEN } from '../const';

export const getAuthToken = ()=>{
    return LocalStorage.getItem(FC_AUTH_TOKEN);
}

export const setAuthToken = (authToken)=>{
    LocalStorage.setItem(FC_AUTH_TOKEN,authToken);
}
