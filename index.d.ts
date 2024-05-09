import { BinaryLike } from 'crypto';

declare class SundaneseCrypto {
    private sundaneseCharacters: string;
    private hafiz: string;
    private random: string;

    constructor();

    generateKey(len: number): Buffer;

    encrypt(data: BinaryLike, key: BinaryLike): Buffer;

    decrypt(data: BinaryLike, key: BinaryLike): string;
}

export = SundaneseCrypto;
