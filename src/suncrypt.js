const crypto = require('crypto');
const zlib = require('zlib');

class SundaneseCrypto {
    constructor() {
        this.sundaneseCharacters = 'ᮃᮄᮅᮆᮇᮈᮉᮊᮋᮌᮍᮎᮏᮐᮑᮒᮓᮔᮕᮖᮗᮘᮙᮚᮛᮜᮝᮞᮟᮠᮡᮢᮣᮤᮥᮦᮧᮨᮩ᮪᮫ᮬᮭᮮᮯ᮰᮱᮲᮳᮴᮵᮶᮷᮸᮹ᮺᮻᮼᮽᮾᮿᯀᯁᯂᯃᯄᯅᯆᯇᯈᯉᯊᯋᯌᯍᯎᯏᯐᯑᯒᯓᯔᯕᯖᯗᯘᯙᯚᯛᯜᯝᯞᯟᯠᯡᯢᯣᯤᯥ᯦ᯧᯨᯩᯪᯫᯬᯭᯮᯯᯰᯱ᯲᯳᯴᯵᯶᯷᯸᯹᯺᯻᯼᯽᯾᯿';
        this.header = 'SunCrypt';
        this.random = crypto.randomBytes(1).toString('hex');
        this.delimiter = Buffer.from('_@SC@_').toString('hex');
    }

    generateKey(len = 32) {
        if (len % 2 !== 0) throw new Error('Key length must be an even number');
        if (len !== 32 && len != 16) throw new Error('Key length must be 32 or 16');

        const randomBytes = crypto.randomBytes(32);
        const result = Buffer.from(randomBytes.toString('hex').split('').map(char => {
            const index = parseInt(char, 16);
            return this.sundaneseCharacters[index];
        }).join(''));
        return result.slice(0, len);
    }

    _encrypt(data, key) {
        if (!this._isValidKey(key)) throw new Error('Invalid key');

        const iv = this.generateKey(16);
        const cipher = crypto.createCipheriv('aes-256-cbc', key, iv);
        let encrypted = cipher.update(data, 'utf8', 'hex');
        encrypted += cipher.final('hex');
        const res = this.header + this.delimiter + this.random + this.delimiter + iv.toString('hex') + this.delimiter + encrypted;
        return this._compress(Buffer.from(res));
    }

    _decrypt(data, key) {
        if (!this.isValid(data, key)) throw new Error('Invalid encrypted data or key');

        const datax = this._decompress(data).toString('utf8');
        // eslint-disable-next-line no-unused-vars
        const [h, _, ivHex, encryptedHex] = datax.split(this.delimiter);
        const ivx = Buffer.from(ivHex, 'hex');
        const encrypted = Buffer.from(encryptedHex, 'hex');
        const decipher = crypto.createDecipheriv('aes-256-cbc', key, ivx);
        let decrypted = decipher.update(encrypted, 'hex', 'utf8');
        decrypted += decipher.final('utf8');
        return decrypted;
    }

    // Buffer to Sundanese Characters
    _toSundanese(buffer) {
        return buffer.toString('hex').split('').map(char => {
            const index = parseInt(char, 16);
            return this.sundaneseCharacters[index];
        }).join('');
    }

    // Sundanese Characters to Buffer
    _fromSundanese(sundanese) {
        return Buffer.from(`${sundanese}`.split('').map(char => {
            const index = this.sundaneseCharacters.indexOf(char);
            return index.toString(16);
        }).join(''), 'hex');
    }

    _compress(data, ...opt) {
        return zlib.deflateSync(data, ...opt);
    }

    _decompress(data, ...opt) {
        return zlib.inflateSync(data, ...opt);
    }

    _isValidSundanese(str) {
        return (typeof str === 'string' || typeof str == 'object') && this._fromSundanese(str).length > 0;
    }

    _isValidKey(key) {
        return (typeof key === 'string' || typeof key == 'object') && key.length > 0;
    }

    _isValidEncrypted(encrypted) {
        return (typeof encrypted == 'object');
    }

    isValid(data, key) {
        return this._isValidEncrypted(data) && this._isValidKey(key);
    }

    encrypt(data, key) {
        const encrypted = this._encrypt(data, key);
        return this._toSundanese(encrypted);
    }

    decrypt(sundanese, key) {
        if (!this._isValidSundanese(sundanese)) throw new Error('Invalid Sundanese characters');
        const encrypted = this._fromSundanese(sundanese);
        return this._decrypt(encrypted, key);
    }

    getMeta(enc, key) {
        return {
            char: this.sundaneseCharacters,
            header: this.header,
            random: this.random,
            delimiter: this.delimiter,
            data: this.decrypt(enc, key)
        };
    }

    setMeta(meta) {
        this.sundaneseCharacters = meta.char || this.sundaneseCharacters;
        this.header = meta.header || this.header;
        this.random = meta.random || this.random;
        this.delimiter = meta.delimiter || this.delimiter;
    }

}

module.exports = SundaneseCrypto;