import { base64ToHex, hexToBase64, uuid } from '@/assets/js/api'
import JSEncrypt from 'jsencrypt'

//发送的数据需要加密
//接收的数据一般不需要解密

//获取RSA key 长度
JSEncrypt.prototype.getKeyLength = function () {
    return ((this.key.n.bitLength() + 7) >> 3);
};


/**
 * 分段加密，支持中文
 * @param data 原始数据
 * @returns {string|boolean} 加密后的密文数据
 */
JSEncrypt.prototype.customEncrypt = function (data) {
    let k = this.getKey();
    
    //根据key所能编码的最大长度来定分段长度。key size - 11：11字节随机padding使每次加密结果都不同。
    let maxLength = ((k.n.bitLength() + 7) >> 3) - 11;
    try {
        let subStr = "", encryptedString = "";
        let subStart = 0, subEnd = 0;
        let bitLen = 0, tmpPoint = 0;
        for (let i = 0, len = data.length; i < len; i++) {
            //js 是使用 Unicode 编码的，每个字符所占用的字节数不同
            let charCode = data.charCodeAt(i);
            if (charCode <= 0x007f) {
                bitLen += 1;
            }
            else if (charCode <= 0x07ff) {
                bitLen += 2;
            }
            else if (charCode <= 0xffff) {
                bitLen += 3;
            }
            else {
                bitLen += 4;
            }
            //字节数到达上限，获取子字符串加密并追加到总字符串后。更新下一个字符串起始位置及字节计算。
            if (bitLen > maxLength) {
                subStr = data.substring(subStart, subEnd)
                encryptedString += k.encrypt(subStr);
                //encryptedString += this.encrypt(subStr);
                subStart = subEnd;
                bitLen = bitLen - tmpPoint;
            }
            else {
                subEnd = i;
                tmpPoint = bitLen;
            }
        }
        
        if (subStart < data.length) {
            //subStr = data.substring(subStart, len)
            subStr = data.substring(subStart)
            encryptedString += k.encrypt(subStr);
        }
        
        //return hex2b64(encryptedString);
        return hexToBase64(encryptedString);
    }
    catch (ex) {
        return false;
    }
};


/**
 * 分段解密，支持中文
 * @param data 密文数据
 * @returns {string|boolean} 原始数据
 */
JSEncrypt.prototype.customDecrypt = function (data) {
    let k = this.getKey();
    //解密长度=key size.hex2b64结果是每字节每两字符，所以直接*2
    let maxLength = ((k.n.bitLength() + 7) >> 3) * 2;
    try {
        let hexString = base64ToHex(data);
        let decryptedString = "";
        let rexStr = ".{1," + maxLength + "}";
        let rex = new RegExp(rexStr, 'g');
        let subStrArray = hexString.match(rex);
        if (subStrArray) {
            subStrArray.forEach(function (entry) {
                decryptedString += k.decrypt(entry);
            });
            return decryptedString;
        }
    }
    catch (ex) {
        return false;
    }
};


export default JSEncrypt;

/**
 * 签名加密 - RSA
 * @param publicKey 公钥 ：加密
 * @param privateKey 私钥 ：签名
 * @returns {*} 加密后的字符 - base64
 */
export function signEncrypt(publicKey, privateKey) {
    //https://github.com/travist/jsencrypt
    let timestamp = (new Date()).getTime();
    let nonce = uuid();
    let data = [timestamp, nonce].sort().join('');
    
    // 创建签名对象实例
    let signatureInstance = new JSEncrypt();
    signatureInstance.setPrivateKey(privateKey);
    let signature = signatureInstance.sign(data, SHA256, 'sha256');
    // 创建加密对象实例
    let encryptInstance = new JSEncrypt();
    encryptInstance.setPublicKey(publicKey);
    
    data = [`timestamp@${ timestamp }`, `nonce@${ nonce }`, `signature@${ signature }`].sort().join('&');
    return encryptInstance.customEncrypt(data);
}

/**
 * RSA加密 - 使用公钥加密
 * @param publicKey 公钥
 * @param data 需要加密的数据
 * @returns {*} 加密后的字符 - base64
 */
export function encrypt(publicKey, data) {
    
    // 创建加密对象实例
    let instance = new JSEncrypt();
    instance.setPublicKey(publicKey);
    return instance.customEncrypt(data);
}

/**
 * RSA解密 - 使用私钥解密
 * @param privateKey 私钥
 * @param data 需要解密的密文
 * @returns {*} 原原始数据
 */
export function decrypt(privateKey, data) {
    // 创建加密对象实例
    let instance = new JSEncrypt();
    instance.setPrivateKey(privateKey);
    return instance.customDecrypt(data);
}

/**
 *
 * Secure Hash Algorithm (SHA256)
 * http://www.webtoolkit.info/
 *
 * Original code by Angel Marin, Paul Johnston.
 *
 **/
function SHA256(s) {
    const chrsz = 8
    const hexcase = 0
    
    function safe_add(x, y) {
        const lsw = (x & 0xFFFF) + (y & 0xFFFF)
        const msw = (x >> 16) + (y >> 16) + (lsw >> 16)
        return (msw << 16) | (lsw & 0xFFFF)
    }
    
    function S(X, n) {
        return (X >>> n) | (X << (32 - n))
    }
    
    function R(X, n) {
        return (X >>> n)
    }
    
    function Ch(x, y, z) {
        return ((x & y) ^ ((~x) & z))
    }
    
    function Maj(x, y, z) {
        return ((x & y) ^ (x & z) ^ (y & z))
    }
    
    function Sigma0256(x) {
        return (S(x, 2) ^ S(x, 13) ^ S(x, 22))
    }
    
    function Sigma1256(x) {
        return (S(x, 6) ^ S(x, 11) ^ S(x, 25))
    }
    
    function Gamma0256(x) {
        return (S(x, 7) ^ S(x, 18) ^ R(x, 3))
    }
    
    function Gamma1256(x) {
        return (S(x, 17) ^ S(x, 19) ^ R(x, 10))
    }
    
    function core_sha256(m, l) {
        const K = [0x428A2F98, 0x71374491, 0xB5C0FBCF, 0xE9B5DBA5, 0x3956C25B, 0x59F111F1, 0x923F82A4, 0xAB1C5ED5, 0xD807AA98, 0x12835B01, 0x243185BE, 0x550C7DC3, 0x72BE5D74, 0x80DEB1FE, 0x9BDC06A7, 0xC19BF174, 0xE49B69C1, 0xEFBE4786, 0xFC19DC6, 0x240CA1CC, 0x2DE92C6F, 0x4A7484AA, 0x5CB0A9DC, 0x76F988DA, 0x983E5152, 0xA831C66D, 0xB00327C8, 0xBF597FC7, 0xC6E00BF3, 0xD5A79147, 0x6CA6351, 0x14292967, 0x27B70A85, 0x2E1B2138, 0x4D2C6DFC, 0x53380D13, 0x650A7354, 0x766A0ABB, 0x81C2C92E, 0x92722C85, 0xA2BFE8A1, 0xA81A664B, 0xC24B8B70, 0xC76C51A3, 0xD192E819, 0xD6990624, 0xF40E3585, 0x106AA070, 0x19A4C116, 0x1E376C08, 0x2748774C, 0x34B0BCB5, 0x391C0CB3, 0x4ED8AA4A, 0x5B9CCA4F, 0x682E6FF3, 0x748F82EE, 0x78A5636F, 0x84C87814, 0x8CC70208, 0x90BEFFFA, 0xA4506CEB, 0xBEF9A3F7, 0xC67178F2]
        const HASH = [0x6A09E667, 0xBB67AE85, 0x3C6EF372, 0xA54FF53A, 0x510E527F, 0x9B05688C, 0x1F83D9AB, 0x5BE0CD19]
        const W = new Array(64)
        let a, b, c, d, e, f, g, h, i, j
        let T1, T2
        m[l >> 5] |= 0x80 << (24 - l % 32)
        m[((l + 64 >> 9) << 4) + 15] = l
        for (i = 0; i < m.length; i += 16) {
            a = HASH[0]
            b = HASH[1]
            c = HASH[2]
            d = HASH[3]
            e = HASH[4]
            f = HASH[5]
            g = HASH[6]
            h = HASH[7]
            for (j = 0; j < 64; j++) {
                if (j < 16) {
                    W[j] = m[j + i]
                }
                else {
                    W[j] = safe_add(safe_add(safe_add(Gamma1256(W[j - 2]), W[j - 7]), Gamma0256(W[j - 15])), W[j - 16])
                }
                T1 = safe_add(safe_add(safe_add(safe_add(h, Sigma1256(e)), Ch(e, f, g)), K[j]), W[j])
                T2 = safe_add(Sigma0256(a), Maj(a, b, c))
                h = g
                g = f
                f = e
                e = safe_add(d, T1)
                d = c
                c = b
                b = a
                a = safe_add(T1, T2)
            }
            HASH[0] = safe_add(a, HASH[0])
            HASH[1] = safe_add(b, HASH[1])
            HASH[2] = safe_add(c, HASH[2])
            HASH[3] = safe_add(d, HASH[3])
            HASH[4] = safe_add(e, HASH[4])
            HASH[5] = safe_add(f, HASH[5])
            HASH[6] = safe_add(g, HASH[6])
            HASH[7] = safe_add(h, HASH[7])
        }
        return HASH
    }
    
    function str2binb(str) {
        const bin = []
        const mask = (1 << chrsz) - 1
        for (let i = 0; i < str.length * chrsz; i += chrsz) {
            bin[i >> 5] |= (str.charCodeAt(i / chrsz) & mask) << (24 - i % 32)
        }
        return bin
    }
    
    function Utf8Encode(string) {
        string = string.replace(/\r\n/g, '\n')
        let utfText = ''
        for (let n = 0; n < string.length; n++) {
            const c = string.charCodeAt(n)
            if (c < 128) {
                utfText += String.fromCharCode(c)
            }
            else if ((c > 127) && (c < 2048)) {
                utfText += String.fromCharCode((c >> 6) | 192)
                utfText += String.fromCharCode((c & 63) | 128)
            }
            else {
                utfText += String.fromCharCode((c >> 12) | 224)
                utfText += String.fromCharCode(((c >> 6) & 63) | 128)
                utfText += String.fromCharCode((c & 63) | 128)
            }
        }
        return utfText
    }
    
    function binb2hex(binarray) {
        const hex_tab = hexcase ? '0123456789ABCDEF' : '0123456789abcdef'
        let str = ''
        for (let i = 0; i < binarray.length * 4; i++) {
            str += hex_tab.charAt((binarray[i >> 2] >> ((3 - i % 4) * 8 + 4)) & 0xF) +
                   hex_tab.charAt((binarray[i >> 2] >> ((3 - i % 4) * 8)) & 0xF)
        }
        return str
    }
    
    s = Utf8Encode(s)
    return binb2hex(core_sha256(str2binb(s), s.length * chrsz))
}
