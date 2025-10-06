import CryptoJS from 'crypto-js';

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig(event);
  const secretKey = config.cryptoSecretKey;

  if (!secretKey) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Crypto secret key is not configured on the server.',
    });
  }

  const { encryptedData } = await readBody(event);

  if (!encryptedData) {
    throw createError({
      statusCode: 400,
      statusMessage: 'No data provided for decryption.',
    });
  }

  try {
    const bytes = CryptoJS.AES.decrypt(encryptedData, secretKey);
    const decryptedString = bytes.toString(CryptoJS.enc.Utf8);

    if (!decryptedString) {
      // This can happen if the key is wrong or the data is corrupted
      return { decryptedData: null };
    }

    const decryptedData = JSON.parse(decryptedString);
    return { decryptedData };
  } catch (error) {
    console.error('Decryption failed on the server:', error);
    // Return null instead of throwing an error to handle cases like invalid tokens gracefully
    return { decryptedData: null };
  }
});