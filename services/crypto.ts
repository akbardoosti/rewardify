/**
 * Encrypts data by sending it to the server-side encryption endpoint.
 * @param data The data to encrypt.
 * @returns A promise that resolves with the encrypted string.
 */
export const encrypt = async (data: any): Promise<string> => {
  try {
    const response = await $fetch('/api/encrypt', {
      method: 'POST',
      body: { data },
    });
    // @ts-ignore
    return response.encryptedData;
  } catch (error) {
    console.error('Client-side encryption call failed:', error);
    throw new Error('Failed to encrypt data.');
  }
};

/**
 * Decrypts data by sending it to the server-side decryption endpoint.
 * @param encryptedData The encrypted string.
 * @returns A promise that resolves with the decrypted data, or null.
 */
export const decrypt = async (encryptedData: string): Promise<any | null> => {
  if (!encryptedData) {
    return null;
  }

  try {
    const response = await $fetch('/api/decrypt', {
      method: 'POST',
      body: { encryptedData },
    });
    // @ts-ignore
    return response.decryptedData;
  } catch (error) {
    console.error('Client-side decryption call failed:', error);
    // Return null to handle errors gracefully, e.g., an invalid token.
    return null;
  }
};