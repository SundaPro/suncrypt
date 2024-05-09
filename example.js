const zlib = require('zlib');
const SundaneseCrypto = require('./index');

// Example usage
const sundaneseCrypto = new SundaneseCrypto();
const key = sundaneseCrypto.generateKey(32);
console.log('Generated Key[Sundanese]:', key + ' (length: ' + key.length + ')');
console.log('Generated Key[Hex]:', key.toString('hex') + ' (length: ' + key.toString('hex').length + ')');

const data = `{ "message": "Super Secret ᮃᮄ " }`;

const encrypted = sundaneseCrypto.encrypt(data, key);

console.log('Encrypted:', encrypted);
const decrypted = sundaneseCrypto.decrypt(encrypted, key);
console.log('Decrypted:', decrypted);

// Encode the encrypted buffer to base64 for easier storage and transmission purposes
const base64Encoded = encrypted.toString('base64');
console.log('Base64 Encoded:', base64Encoded);
// Decode the base64 encoded buffer back to the original encrypted buffer
const base64Decoded = Buffer.from(base64Encoded, 'base64');
console.log('Base64 Decoded:', base64Decoded);
// Decrypt the base64 decoded buffer
const base64Decrypted = sundaneseCrypto.decrypt(base64Decoded, key);
console.log('Base64 Decrypted:', base64Decrypted);

// Compress the encrypted buffer to reduce its size
// Compression method using zlib
zlib.deflate(encrypted, (err, compressedBuffer) => {
    if (err) {
        console.error('Compression error:', err);
    } else {
        console.log('Original size:', encrypted.length);
        console.log('Compressed buffer:', compressedBuffer);
        console.log('Compressed buffer size:', compressedBuffer.length);
        // Decompress the buffer and decrypt it
        zlib.inflate(compressedBuffer, (err, decompressedBuffer) => {
            if (err) {
                console.error('Decompression error:', err);
            } else {
                console.log('Decompressed buffer:', decompressedBuffer);
                console.log('Decompressed buffer size:', decompressedBuffer.length);
                const decrypted = sundaneseCrypto.decrypt(decompressedBuffer, key);
                console.log('Decrypted:', decrypted);
            }
        });
    }
});