# suncrypt
[![npm version](https://badge.fury.io/js/suncrypt.svg)](https://badge.fury.io/js/suncrypt)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![GitHub issues](https://img.shields.io/github/issues/SundaPro/suncrypt.svg)]()

### suncrypt is a NodeJS library that provides [Sundanese Unicode](https://id.wikipedia.org/wiki/Aksara_Sunda) Cryptography Algorithm using AES-256 CBC Encryption.

# Installation
```bash
npm install suncrypt
```

# Usage
```javascript
const suncrypt = require('suncrypt');

const key = suncrypt.generateKey();

const encrypted = suncrypt.encrypt('Hello, World!', key);
console.log(encrypted);

const decrypted = suncrypt.decrypt(encrypted, key);
console.log(decrypted);
```

# Example 
- [Example](https://github/com/SundaPro/suncrypt/tree/main/example)

# Contributors
- [mrdhanz](https://github.com/mrdhanz)

# Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.
