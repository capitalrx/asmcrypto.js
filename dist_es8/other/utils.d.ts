export declare function string_to_bytes(str: string, utf8?: boolean): Uint8Array;
export declare function hex_to_bytes(str: string): Uint8Array;
export declare function base64_to_bytes(str: string): Uint8Array;
export declare function bytes_to_string(bytes: Uint8Array, utf8?: boolean): string;
export declare function bytes_to_hex(arr: Uint8Array): string;
export declare function bytes_to_base64(arr: Uint8Array): string;
export declare function pow2_ceil(a: number): number;
export declare function is_number(a: number): boolean;
export declare function is_string(a: string): boolean;
export declare function is_buffer(a: ArrayBuffer): boolean;
export declare function is_bytes(a: Uint8Array): boolean;
export declare function is_typed_array(a: any): boolean;
export declare function _heap_init(heap?: Uint8Array, heapSize?: number): Uint8Array;
export declare function _heap_write(heap: Uint8Array, hpos: number, data: Uint8Array, dpos: number, dlen: number): number;
export declare function joinBytes(...arg: Uint8Array[]): Uint8Array;
