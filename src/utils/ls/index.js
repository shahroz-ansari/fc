import { aesEncrypt, aesDecrypt } from "../aes";

export const getAuthToken = () => {
    return localStorage.getItem(FC_AUTH_TOKEN);
}

export const setAuthToken = (authToken) => {
    localStorage.setItem(FC_AUTH_TOKEN, authToken);
}

export const setFcData = (data) => {
    if (!data) return;

    data = JSON.stringify(data);
    const encryptedData = aesEncrypt(data)
    localStorage.setItem(FC_DATA, encryptedData);
}

export const getFcData = () => {
    const encryptedData = localStorage.getItem(FC_DATA);
    const data = aesDecrypt(encryptedData)
    return JSON.parse(data)
}