import { createAESKeys, aesDecrypt, aesEncrypt } from '../aes';

const encryptionKey = process.env.REACT_APP_ENCRYPTION_KEY;
class LocalStorage {

  setItem(key, value, useEncryption = false) {
    if (!key || !value) return null;
    else {
      try {
        if (!useEncryption) localStorage.setItem(key, JSON.stringify(value));
        const [eKey, iv] = createAESKeys(encryptionKey);
        const encryptedData = aesEncrypt(JSON.stringify(value), eKey, iv);
        localStorage.setItem(key,encryptedData);
      } catch (err) {
        console.error('Error in encryption', err);
      }
    }
  }

  getItem(key, useEncryption = false) {
    if (!key) return null;
    try {
      if (!useEncryption) return JSON.parse(localStorage.getItem(key));
      const [eKey, iv] = createAESKeys(encryptionKey);
      const data = localStorage.getItem(key);
      const decryptedData = aesDecrypt(data, eKey, iv);
      return JSON.parse(decryptedData);
    } catch (err) {
      console.error('error in decryption', err);
    }

  }

  removeItem(key) {
    localStorage.removeItem(key);
  }
}

export default new LocalStorage();
