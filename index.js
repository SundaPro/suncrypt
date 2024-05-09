const crypto = require('crypto');

class SundaneseCrypto {
    constructor() {
        this.sundaneseCharacters = 'ᮃᮄᮅᮆᮇᮈᮉᮊᮋᮌᮍᮎᮏᮐᮑᮒᮓᮔᮕᮖᮗᮘᮙᮚᮛᮜᮝᮞᮟᮠᮡᮢᮣᮤᮥᮦᮧᮨᮩ᮪᮫ᮬᮭᮮᮯ᮰᮱᮲᮳᮴᮵᮶᮷᮸᮹ᮺᮻᮼᮽᮾᮿᯀᯁᯂᯃᯄᯅᯆᯇᯈᯉᯊᯋᯌᯍᯎᯏᯐᯑᯒᯓᯔᯕᯖᯗᯘᯙᯚᯛᯜᯝᯞᯟᯠᯡᯢᯣᯤᯥ᯦ᯧᯨᯩᯪᯫᯬᯭᯮᯯᯰᯱ᯲᯳᯴᯵᯶᯷᯸᯹᯺᯻᯼᯽᯾᯿';
        this.hafiz = Buffer.from(`umat@duck.com`).toString("hex");
        this.random = crypto.randomBytes(1).toString('hex');
    }

    generateKey(len) {
        const randomBytes = crypto.randomBytes(32);
        const result = Buffer.from(randomBytes.toString('hex').split('').map(char => {
            const index = parseInt(char, 16);
            return this.sundaneseCharacters[index];
        }).join(''));
        return result.slice(0, len);
    }

    encrypt(data, key) {
        const iv = this.generateKey(16);
        const cipher = crypto.createCipheriv('aes-256-cbc', key, iv);
        let encrypted = cipher.update(data, 'utf8', 'hex');
        encrypted += cipher.final('hex');
        const res = this.random + this.hafiz + iv.toString('hex') + this.hafiz + encrypted;
        return Buffer.from(res);
    }

    decrypt(data, key) {
        const datax = Buffer.from(data).toString('utf8');
        const [_, ivHex, encryptedHex] = datax.split(this.hafiz);
        const ivx = Buffer.from(ivHex, 'hex');
        const encrypted = Buffer.from(encryptedHex, 'hex');
        const decipher = crypto.createDecipheriv('aes-256-cbc', key, ivx);
        let decrypted = decipher.update(encrypted, 'hex', 'utf8');
        decrypted += decipher.final('utf8');
        return decrypted;
    }
}

module.exports = SundaneseCrypto;