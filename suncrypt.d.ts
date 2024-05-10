import { BinaryLike } from 'crypto';

declare class SundaneseCrypto {
    private sundaneseCharacters: string;
    private hafiz: string;
    private random: string;

    constructor();
    generateKey(len?: number = 32): Buffer;
    encrypt(data: BinaryLike, key: BinaryLike): string;
    decrypt(data: BinaryLike, key: BinaryLike): string;
    isValid(data: BinaryLike, key: BinaryLike): boolean;
    getMeta(enc: BinaryLike, key: BinaryLike): { char: string, header: string, random: BinaryLike, delimiter: BinaryLike, data: any };
    setMeta(data: { char: string, header: string, random: BinaryLike, delimiter: BinaryLike }): void;
    private _encrypt(data: BinaryLike, key: BinaryLike): Buffer;
    private _decrypt(data: BinaryLike, key: BinaryLike): string;
    private _toSundanese(data: BinaryLike): string;
    private _fromSundanese(data: BinaryLike): Buffer;
    private _compress(data: BinaryLike, ...opt): Buffer;
    private _decompress(data: BinaryLike, ...opt): Buffer;
    
}

export = SundaneseCrypto;
