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

  const { data } = await readBody(event);

  if (data === undefined || data === null) {
    throw createError({
      statusCode: 400,
      statusMessage: 'No data provided for encryption.',
    });
  }

  try {
    const dataString = JSON.stringify(data);
    const encryptedData = CryptoJS.AES.encrypt(dataString, secretKey).toString();
    return { encryptedData };
  } catch (error) {
    console.error('Encryption failed on the server:', error);
    throw createError({
      statusCode: 500,
      statusMessage: 'An error occurred during data encryption.',
    });
  }
});