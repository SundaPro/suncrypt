const assert = require('assert');
const Suncrypt = require('../dist/suncrypt');

describe('Suncrypt', () => {
    const sundaneseCrypto = new Suncrypt();
    const secretKey = Buffer.from([0xe1, 0xae, 0x8d, 0xe1, 0xae, 0x8c, 0xe1, 0xae, 0x89, 0xe1, 0xae, 0x91, 0xe1, 0xae, 0x8b, 0xe1, 0xae, 0x8a, 0xe1, 0xae, 0x8a, 0xe1, 0xae, 0x90, 0xe1, 0xae, 0x83, 0xe1, 0xae, 0x86, 0xe1, 0xae]);
    const data = JSON.stringify({
        name: 'Umat',
        age: 25,
        email: 'umat@duck.com'
    });

    it('should throw an error when invalid key length is not even number', () => {
        assert.throws(() => sundaneseCrypto.generateKey(31), /Key length must be an even number/);
    });

    it('should throw an error when invalid key length is not 32 or 16', () => {
        assert.throws(() => sundaneseCrypto.generateKey(36), /Key length must be 32 or 16/);
    });

    it('should throw an error when invalid key is used for encryption', () => {
        assert.throws(() => sundaneseCrypto.encrypt(data, Buffer.from('invalid-key')), /Invalid key/);
    });

    it('should throw an error when invalid key is used for decryption', () => {
        const encrypted = sundaneseCrypto.encrypt(data, secretKey);
        assert.throws(() => sundaneseCrypto.decrypt(encrypted, Buffer.from('invalid-key')), /Invalid key/);
    });

    it('should generate a key', () => {
        const key = sundaneseCrypto.generateKey(32);
        assert.strictEqual(key.length, 32);
    });

    it('should encrypt and decrypt data', () => {
        const encrypted = sundaneseCrypto.encrypt(data, secretKey);
        const decrypted = sundaneseCrypto.decrypt(encrypted, secretKey);
        assert.deepStrictEqual(JSON.parse(decrypted), JSON.parse(data));
    });

    // getMetaInfo
    it('should return meta info', () => {
        const enc = sundaneseCrypto.encrypt(data, secretKey);
        const meta = sundaneseCrypto.getMeta(enc, secretKey);
        assert.strictEqual(meta.char, sundaneseCrypto.sundaneseCharacters);
        assert.strictEqual(meta.header, sundaneseCrypto.header);
        assert.strictEqual(meta.random, sundaneseCrypto.random);
        assert.strictEqual(meta.delimiter, sundaneseCrypto.delimiter);
        assert.deepStrictEqual(JSON.parse(meta.data), JSON.parse(data));
    });

    // setMetaInfo
    it('should set meta info', () => {
        const enc = sundaneseCrypto.encrypt(data, secretKey);
        const meta = sundaneseCrypto.getMeta(enc, secretKey);
        meta.char = 'ᮃᮄᮅᮆᮇᮈᮉᮊᮋᮌᮍᮎᮏᮐᮑᮒᮓᮔᮕᮖᮗᮘᮙᮚᮛᮜᮝᮞᮟᮠᮡᮢᮣᮤᮥᮦᮧᮨᮩ᮪᮫ᮬᮭᮮᮯ᮰᮱᮲᮳᮴᮵᮶᮷᮸᮹ᮺᮻᮼᮽᮾᮿᯀᯁᯂᯃᯄᯅᯆᯇᯈᯉᯊᯋᯌᯍᯎᯏᯐᯑᯒᯓᯔᯕᯖᯗᯘᯙᯚᯛᯜᯝᯞᯟᯠᯡᯢᯣᯤᯥ᯦ᯧᯨᯩᯪᯫᯬᯭᯮᯯᯰᯱ᯲᯳᯴᯵᯶᯷᯸᯹᯺᯻᯼᯽᯾᯿';
        meta.header = 'SunCrypt';
        meta.delimiter = Buffer.from('_@SC@_').toString('hex');
        sundaneseCrypto.setMeta(meta);
        const meta2 = sundaneseCrypto.getMeta(enc, secretKey);
        assert.strictEqual(meta2.char, meta.char);
        assert.strictEqual(meta2.header, meta.header);
        assert.doesNotMatch(meta2.random, /a/);
        assert.strictEqual(meta2.delimiter, meta.delimiter);
        assert.deepStrictEqual(JSON.parse(meta2.data), JSON.parse(data));
    });
});