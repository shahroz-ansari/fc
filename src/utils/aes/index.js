import aesjs from 'aes-js';

const encryptionKey = process.env.REACT_APP_ENCRYPTION_KEY;

export const createAESKeys = (_genesis) => {
    let genesis = _genesis || '';
    let encryptionKey = '';
    let initVector = '';
    if (genesis.length > 0) {
        genesis = genesis.repeat(Math.ceil(16 / genesis.length)).substr(0, 16);
        const charCodes = genesis.split('').map((c) => c.charCodeAt(0));
        encryptionKey = charCodes.map((c) => String.fromCharCode(c + 1)).join('');
        initVector = charCodes.map((c) => String.fromCharCode(c - 1)).join('');
    }
    return [encryptionKey, initVector];
};

export const aesEncrypt = (text, eKey, iv) => {
    if (!eKey || !iv) {
        [eKey, iv] = createAESKeys(encryptionKey);
    }

    const key = aesjs.utils.utf8.toBytes(eKey);
    const iv = aesjs.utils.utf8.toBytes(iv);
    const textBytes = aesjs.utils.utf8.toBytes(text);
    const textBytesPadded = aesjs.padding.pkcs7.pad(textBytes);
    // eslint-disable-next-line new-cap
    const aesCbc = new aesjs.ModeOfOperation.cbc(key, iv);
    const encryptedBytes = aesCbc.encrypt(textBytesPadded);
    const base64String = btoa(String.fromCharCode(...new Uint8Array(encryptedBytes)));
    return base64String;
};


export const aesDecrypt = (base64String, keyStr, ivStr) => {
    const key = aesjs.utils.utf8.toBytes(keyStr);
    const iv = aesjs.utils.utf8.toBytes(ivStr);
    const encryptedBytes = Uint8Array.from(atob(base64String), (c) => c.charCodeAt(0));
    // eslint-disable-next-line new-cap
    const aesCbc = new aesjs.ModeOfOperation.cbc(key, iv);
    const textBytesPadded = aesCbc.decrypt(encryptedBytes);
    const textBytes = aesjs.padding.pkcs7.strip(textBytesPadded);
    const text = aesjs.utils.utf8.fromBytes(textBytes);
    return text;
};


