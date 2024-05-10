const Suncrypt = require('./index');

// Example usage
const sundaneseCrypto = new Suncrypt();

console.time('Execution Time');
const key = sundaneseCrypto.generateKey(32);
console.log('Generated Key:', key + ' (length: ' + key.length + ')');
console.log();
const data = JSON.stringify({ name: 'Umat', age: 25, email: 'umat@duck.com'});

const encrypted = sundaneseCrypto.encrypt(data, key);

console.log('Encrypted:', encrypted + ' (length: ' + encrypted.length + ')\n');
console.log();

const decrypted = sundaneseCrypto.decrypt(encrypted, key);
console.log('Decrypted:', JSON.parse(decrypted));
console.timeEnd('Execution Time');