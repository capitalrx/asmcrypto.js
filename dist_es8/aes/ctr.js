import { AES } from './aes';
import { IllegalArgumentError } from '../other/errors';
import { joinBytes } from '../other/utils';
export class AES_CTR extends AES {
    static encrypt(data, key, nonce) {
        return new AES_CTR(key, nonce).encrypt(data);
    }
    static decrypt(data, key, nonce) {
        return new AES_CTR(key, nonce).encrypt(data);
    }
    constructor(key, nonce) {
        super(key, undefined, false, 'CTR');
        delete this.padding;
        this.AES_CTR_set_options(nonce);
    }
    encrypt(data) {
        const r1 = this.AES_Encrypt_process(data);
        const r2 = this.AES_Encrypt_finish();
        return joinBytes(r1, r2);
    }
    decrypt(data) {
        const r1 = this.AES_Encrypt_process(data);
        const r2 = this.AES_Encrypt_finish();
        return joinBytes(r1, r2);
    }
    AES_CTR_set_options(nonce, counter, size) {
        if (size !== undefined) {
            if (size < 8 || size > 48)
                throw new IllegalArgumentError('illegal counter size');
            let mask = Math.pow(2, size) - 1;
            this.asm.set_mask(0, 0, (mask / 0x100000000) | 0, mask | 0);
        }
        else {
            size = 48;
            this.asm.set_mask(0, 0, 0xffff, 0xffffffff);
        }
        if (nonce !== undefined) {
            let len = nonce.length;
            if (!len || len > 16)
                throw new IllegalArgumentError('illegal nonce size');
            let view = new DataView(new ArrayBuffer(16));
            new Uint8Array(view.buffer).set(nonce);
            this.asm.set_nonce(view.getUint32(0), view.getUint32(4), view.getUint32(8), view.getUint32(12));
        }
        else {
            throw new Error('nonce is required');
        }
        if (counter !== undefined) {
            if (counter < 0 || counter >= Math.pow(2, size))
                throw new IllegalArgumentError('illegal counter value');
            this.asm.set_counter(0, 0, (counter / 0x100000000) | 0, counter | 0);
        }
    }
}
