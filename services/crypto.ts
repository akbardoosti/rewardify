import CryptoJS from 'crypto-js';

// This function retrieves the secret key from the public runtime config.
const getSecretKey = (): string => {
  const config = useRuntimeConfig();
  const secretKey = config.public.cryptoSecretKey;

  if (!secretKey) {
    console.error("FATAL: Crypto secret key is not defined in public runtime config.");
    // A fallback key is provided, but this signals a critical configuration error.
    return 'default-fallback-key-if-not-set';
  }

  return secretKey;
};

/**
 * Encrypts data synchronously using AES on the client-side.
 * @param data The data to encrypt (can be any serializable object).
 * @returns The encrypted string.
 */
export const encrypt = (data: any): string => {
  const secretKey = getSecretKey();
  const dataString = JSON.stringify(data);
  return CryptoJS.AES.encrypt(dataString, secretKey).toString();
};

/**
 * Decrypts data synchronously using AES on the client-side.
 * @param encryptedData The encrypted string.
 * @returns The decrypted data, or null if decryption fails.
 */
export const decrypt = (encryptedData: string): any | null => {
  if (!encryptedData) {
    return null;
  }

  try {
    const secretKey = getSecretKey();
    const bytes = CryptoJS.AES.decrypt(encryptedData, secretKey);
    const decryptedData = bytes.toString(CryptoJS.enc.Utf8);

    if (!decryptedData) {
      return null;
    }
    return JSON.parse(decryptedData);
  } catch (error) {
    console.error("Decryption failed. This may be due to an invalid key or corrupted data.", error);
    return null;
  }
};