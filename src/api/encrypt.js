import { uid } from 'quasar'
import { base64ToHex, hexToBase64 } from './api'


/** @type {import('jsencrypt').default} */
const JSEncrypt = Object.values(import.meta.globEager('jsencrypt'))[0].default;


const public_Key = '-----BEGIN PUBLIC KEY-----' +
                   'MIIBHDANBgkqhkiG9w0BAQEFAAOCAQkAMIIBBAKB/A3rAql3Cr5jHsOmAbgT+/I/' +
                   'qcKuRTpicrYOAZp4IN2T/JyI0jyEZG9LacisnPKJM6WtwqOFlSQrSQWftb/+iqq6' +
                   'hsqY6vbYrNb7KfbnYwNLk0zIoYxLW28WTdRcwaFtY56YH+J2V3LHZgla97Oh3Eq/' +
                   'M3Rl7IZfEDSHPF5PEC0kKkux3Z9mfwSg0KW09Wj+UH5gr78AD95JkKwC38Tll4Ep' +
                   'bab9UZAMnfk6D5lNKKgSUTsfn4U0YNdLblkVN99EssH69a8+LC1dCUIgPiCBkLOn' +
                   '3zT5TZ4Fp02rae4UxnFPdLPWIrgeu4UPxmGxgUvz4sdoINTmPP7Q99zkbQIDAQAB' +
                   '-----END PUBLIC KEY-----';
const private_Key = '-----BEGIN PRIVATE KEY-----' +
                    'MIIEVQIBADANBgkqhkiG9w0BAQEFAASCBD8wggQ7AgEAAoHrAs24Hj3zaoI4FhvD' +
                    'SRh7Wj3pyVPuUq36v2LgO9k+yDQfmELCBOAJ03dZxe0t+lc+2HeVYjZe7qop9ooI' +
                    'hN2ceyMi74KvM9jiFW6frL0Zb4LXjeTC0tlikzKo8WR9UnzoryuQwV5D2+iKxYA+' +
                    'j+nmQ90Xlxt+59+L5aIU/i6zHjTyZ4Ooo2K2phZJPON/0geEkfZXdAnsxEP0lxVq' +
                    '8B7ZVjuo0EElTxsGhUBv+S744EGoXdN4bjDtUj5lqkRYPr9JpMBKfq2/a8JKvCCP' +
                    'SysVhWZVI553NaTyvH0sQMp2VGJpTtETlHlDqwWv6QIDAQABAoHrALScHKAiXS8f' +
                    'xhB+eCp9AByMdGl2k7/MVdUf8G+e6OqU+M/z2x412s0x/ijNZS4HVpnhMbHU+eJA' +
                    'ZRYfRrAt7J7O787HIBj368TG0cVUXUdjzwU+MakasUgSU4yiLNvaAhrIdqCuGuzN' +
                    '3x2CoNyPYYyFnzUAHamxqD2hs11DG2WttWEL/VjofoGuF+s4dICvay+hUonyFDdJ' +
                    '2T+A3+myQzG3iyrJr5KGVvop8zJQgOEJ4RutaR/Zz9HSr6sNBIwRcW4ul1GjtADH' +
                    'cwOhUOvRdkfMXRJwYHwWkgC08fchT53WRw0TEn7T6QtJwQJ2Ab2mABGYymAY3Z+O' +
                    'yxOllWf4/JCKs68MQxgGjNKH6rCF/3ssr2XdSA37uaJUBG/4ze3LkJEGJXJsOFwS' +
                    'dP3tD8/ICi7JpKif1dQVfdWgh38edIMmjq7loPrNLT5p/BHUtensDa04wHX6ofM8' +
                    '5mThMNx/Bei/hQJ2AZxKFMOuC7ZpMLz8Xm2hmNzI2Pzy+lBTBvBswseZHIP8b5Ma' +
                    'Op4ydE3t3Zu11IkiqFpHSd2oFTz1KsKV8DLjxf1CGMDm0WzUyqH3xs5ZqLIm7pvK' +
                    'Bmc59H5bECxZGodliuZRaFm/Le85dzaEcFF3AYqpk04yFQJ2AWyLoD7Ex7d4X8Kn' +
                    '4kM+DkuxB5mNfJLS6wd6RDPr7vVbh7PQx+IB83FM23uIUuDtnDbLcITRjExfbnMS' +
                    'vhUBmQ+VSY8gb8tohFgrBHZ+DJjV5uVp4wn62YaP1FTcCdDkObMS39U1OWrJDTWW' +
                    'ObmH5JpaZhEQqQJ1GgnHs/ALB1MvY9AgepYJHHCG27rQuj/0IT0NNCPkXCWWOlke' +
                    'uJ0BIWbTZyEdsieBMGpuLNSPutDVCYMEr4IZH/yLqasqMNBjl8UZRjD9aXrx+N7S' +
                    'drR/T3ea1uItvb1Y/2DG0Vw0n3YmpEfK/Coi68n35qldAnYBSZovoBZs1j5iyHun' +
                    'CsE/g9pjZRHNNeD7ATwSqvtWokHde3d/FYFgj/ld+PBU3AhrNC6qVNcLyvbGH5kZ' +
                    'jvevyc+TiIb2KsxoA9wUiFbrTj5R2Lw+D3Soyxcnws37XIAXjqb0K5+r0mH24kF4' +
                    '0TopbdS/LFE6' +
                    '-----END PRIVATE KEY-----';

const Roles = ['None', 'Stair', 'Second', 'Admin'];

//发送的数据需要加密
//接收的数据一般不需要解密

/**
 * 获取RSA key 长度
 * @return {number} key的长度
 */
JSEncrypt.prototype.getKeyLength = function () {
    return ((this.key.n.bitLength() + 7) >> 3);
};


/**
 * 分段加密，支持中文
 * @param {string} data 原始数据
 * @return {string|boolean} 加密成功: 密文数据，失败: false
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
 * @param {string} data 密文数据
 * @return {string|boolean} 解密成功: 原始数据，失败: false
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
 * 签名加密 - RSA
 * @param Role 角色权限
 * @param publicKey 公钥 ：加密
 * @returns {*} 加密后的字符 - base64
 */
export function signEncrypt(Role = '', publicKey = public_Key) {
    //https://github.com/travist/jsencrypt
    let timestamp = (new Date()).getTime();
    let nonce = uid();
    if (!Roles.includes(Role)) {
        Role = Roles[0];
    }
    let data = [timestamp, nonce, Role].sort().join('');
    
    // 创建签名对象实例
    //let signatureInstance = new JSEncrypt();
    //signatureInstance.setPrivateKey(privateKey);
    //let signature = signatureInstance.sign(data, SHA256, 'sha256');
    let signature = sign(data);
    // 创建加密对象实例
    let encryptInstance = new JSEncrypt();
    encryptInstance.setPublicKey(publicKey);
    
    data = [`timestamp@${ timestamp }`, `nonce@${ nonce }`, `signature@${ signature }`, `Role@${ Role }`].sort().join('&');
    return encryptInstance.customEncrypt(data);
}

/**
 * 为http请求头添加Authorization字段
 * @return {string} 授权值
 */
export function authorization() {
    let timestamp = Date.now();
    let nonce = uid();
    
    let data = [timestamp, nonce].sort().join('');
    let params = [`nonce@${ nonce }`, `timestamp@${ timestamp }`, `signature@${ sign(data) }`].join('&');
    
    return btoa(params);
}

/**
 * 自定义签名
 * @param data 数据
 * @return {string} 签名值
 */
function sign(data) {
    return SHA256(MD5(data));
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
    const chr_sz = 8
    const hex_case = 0
    
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
    
    function str2bin(str) {
        const bin = []
        const mask = (1 << chr_sz) - 1
        for (let i = 0; i < str.length * chr_sz; i += chr_sz) {
            bin[i >> 5] |= (str.charCodeAt(i / chr_sz) & mask) << (24 - i % 32)
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
    
    function bin2hex(bin_array) {
        const hex_tab = hex_case ? '0123456789ABCDEF' : '0123456789abcdef'
        let str = ''
        for (let i = 0; i < bin_array.length * 4; i++) {
            str += hex_tab.charAt((bin_array[i >> 2] >> ((3 - i % 4) * 8 + 4)) & 0xF) +
                   hex_tab.charAt((bin_array[i >> 2] >> ((3 - i % 4) * 8)) & 0xF)
        }
        return str
    }
    
    s = Utf8Encode(s)
    return bin2hex(core_sha256(str2bin(s), s.length * chr_sz))
}

function MD5(string) {
    function RotateLeft(lValue, iShiftBits) {
        return (lValue << iShiftBits) | (lValue >>> (32 - iShiftBits));
    }
    
    function AddUnsigned(lX, lY) {
        let lX4, lY4, lX8, lY8, lResult;
        lX8 = (lX & 0x80000000);
        lY8 = (lY & 0x80000000);
        lX4 = (lX & 0x40000000);
        lY4 = (lY & 0x40000000);
        lResult = (lX & 0x3FFFFFFF) + (lY & 0x3FFFFFFF);
        if (lX4 & lY4) {
            return (lResult ^ 0x80000000 ^ lX8 ^ lY8);
        }
        if (lX4 | lY4) {
            if (lResult & 0x40000000) {
                return (lResult ^ 0xC0000000 ^ lX8 ^ lY8);
            }
            else {
                return (lResult ^ 0x40000000 ^ lX8 ^ lY8);
            }
        }
        else {
            return (lResult ^ lX8 ^ lY8);
        }
    }
    
    function F(x, y, z) {
        return (x & y) | ((~x) & z);
    }
    
    function G(x, y, z) {
        return (x & z) | (y & (~z));
    }
    
    function H(x, y, z) {
        return (x ^ y ^ z);
    }
    
    function I(x, y, z) {
        return (y ^ (x | (~z)));
    }
    
    function FF(a, b, c, d, z, s, ac) {
        a = AddUnsigned(a, AddUnsigned(AddUnsigned(F(b, c, d), z), ac));
        return AddUnsigned(RotateLeft(a, s), b);
    }
    
    function GG(a, b, c, d, z, s, ac) {
        a = AddUnsigned(a, AddUnsigned(AddUnsigned(G(b, c, d), z), ac));
        return AddUnsigned(RotateLeft(a, s), b);
    }
    
    function HH(a, b, c, d, z, s, ac) {
        a = AddUnsigned(a, AddUnsigned(AddUnsigned(H(b, c, d), z), ac));
        return AddUnsigned(RotateLeft(a, s), b);
    }
    
    function II(a, b, c, d, z, s, ac) {
        a = AddUnsigned(a, AddUnsigned(AddUnsigned(I(b, c, d), z), ac));
        return AddUnsigned(RotateLeft(a, s), b);
    }
    
    function ConvertToWordArray(string) {
        let lWordCount
        let lMessageLength = string.length;
        let lNumberOfWords_temp1 = lMessageLength + 8;
        let lNumberOfWords_temp2 = (lNumberOfWords_temp1 - (lNumberOfWords_temp1 % 64)) / 64;
        let lNumberOfWords = (lNumberOfWords_temp2 + 1) * 16;
        let lWordArray = Array(lNumberOfWords - 1);
        let lBytePosition = 0;
        let lByteCount = 0;
        while (lByteCount < lMessageLength) {
            lWordCount = (lByteCount - (lByteCount % 4)) / 4;
            lBytePosition = (lByteCount % 4) * 8;
            lWordArray[lWordCount] = (lWordArray[lWordCount] | (string.charCodeAt(lByteCount) << lBytePosition));
            lByteCount++;
        }
        lWordCount = (lByteCount - (lByteCount % 4)) / 4;
        lBytePosition = (lByteCount % 4) * 8;
        lWordArray[lWordCount] = lWordArray[lWordCount] | (0x80 << lBytePosition);
        lWordArray[lNumberOfWords - 2] = lMessageLength << 3;
        lWordArray[lNumberOfWords - 1] = lMessageLength >>> 29;
        return lWordArray;
    }
    
    function WordToHex(lValue) {
        let WordToHexValue = "", WordToHexValue_temp = "", lByte, lCount;
        for (lCount = 0; lCount <= 3; lCount++) {
            lByte = (lValue >>> (lCount * 8)) & 255;
            WordToHexValue_temp = "0" + lByte.toString(16);
            WordToHexValue = WordToHexValue + WordToHexValue_temp.substring(WordToHexValue_temp.length - 2);
        }
        return WordToHexValue;
    }
    
    function Utf8Encode(string) {
        string = string.replace(/\r\n/g, "\n");
        let utf_text = "";
        for (let n = 0; n < string.length; n++) {
            let c = string.charCodeAt(n);
            if (c < 128) {
                utf_text += String.fromCharCode(c);
            }
            else if ((c > 127) && (c < 2048)) {
                utf_text += String.fromCharCode((c >> 6) | 192);
                utf_text += String.fromCharCode((c & 63) | 128);
            }
            else {
                utf_text += String.fromCharCode((c >> 12) | 224);
                utf_text += String.fromCharCode(((c >> 6) & 63) | 128);
                utf_text += String.fromCharCode((c & 63) | 128);
            }
        }
        return utf_text;
    }
    
    let x;
    let k, AA, BB, CC, DD, a, b, c, d;
    let S11 = 7, S12 = 12, S13 = 17, S14 = 22;
    let S21 = 5, S22 = 9, S23 = 14, S24 = 20;
    let S31 = 4, S32 = 11, S33 = 16, S34 = 23;
    let S41 = 6, S42 = 10, S43 = 15, S44 = 21;
    string = Utf8Encode(string);
    x = ConvertToWordArray(string);
    a = 0x67452301;
    b = 0xEFCDAB89;
    c = 0x98BADCFE;
    d = 0x10325476;
    for (k = 0; k < x.length; k += 16) {
        AA = a;
        BB = b;
        CC = c;
        DD = d;
        a = FF(a, b, c, d, x[k], S11, 0xD76AA478);
        d = FF(d, a, b, c, x[k + 1], S12, 0xE8C7B756);
        c = FF(c, d, a, b, x[k + 2], S13, 0x242070DB);
        b = FF(b, c, d, a, x[k + 3], S14, 0xC1BDCEEE);
        a = FF(a, b, c, d, x[k + 4], S11, 0xF57C0FAF);
        d = FF(d, a, b, c, x[k + 5], S12, 0x4787C62A);
        c = FF(c, d, a, b, x[k + 6], S13, 0xA8304613);
        b = FF(b, c, d, a, x[k + 7], S14, 0xFD469501);
        a = FF(a, b, c, d, x[k + 8], S11, 0x698098D8);
        d = FF(d, a, b, c, x[k + 9], S12, 0x8B44F7AF);
        c = FF(c, d, a, b, x[k + 10], S13, 0xFFFF5BB1);
        b = FF(b, c, d, a, x[k + 11], S14, 0x895CD7BE);
        a = FF(a, b, c, d, x[k + 12], S11, 0x6B901122);
        d = FF(d, a, b, c, x[k + 13], S12, 0xFD987193);
        c = FF(c, d, a, b, x[k + 14], S13, 0xA679438E);
        b = FF(b, c, d, a, x[k + 15], S14, 0x49B40821);
        a = GG(a, b, c, d, x[k + 1], S21, 0xF61E2562);
        d = GG(d, a, b, c, x[k + 6], S22, 0xC040B340);
        c = GG(c, d, a, b, x[k + 11], S23, 0x265E5A51);
        b = GG(b, c, d, a, x[k], S24, 0xE9B6C7AA);
        a = GG(a, b, c, d, x[k + 5], S21, 0xD62F105D);
        d = GG(d, a, b, c, x[k + 10], S22, 0x2441453);
        c = GG(c, d, a, b, x[k + 15], S23, 0xD8A1E681);
        b = GG(b, c, d, a, x[k + 4], S24, 0xE7D3FBC8);
        a = GG(a, b, c, d, x[k + 9], S21, 0x21E1CDE6);
        d = GG(d, a, b, c, x[k + 14], S22, 0xC33707D6);
        c = GG(c, d, a, b, x[k + 3], S23, 0xF4D50D87);
        b = GG(b, c, d, a, x[k + 8], S24, 0x455A14ED);
        a = GG(a, b, c, d, x[k + 13], S21, 0xA9E3E905);
        d = GG(d, a, b, c, x[k + 2], S22, 0xFCEFA3F8);
        c = GG(c, d, a, b, x[k + 7], S23, 0x676F02D9);
        b = GG(b, c, d, a, x[k + 12], S24, 0x8D2A4C8A);
        a = HH(a, b, c, d, x[k + 5], S31, 0xFFFA3942);
        d = HH(d, a, b, c, x[k + 8], S32, 0x8771F681);
        c = HH(c, d, a, b, x[k + 11], S33, 0x6D9D6122);
        b = HH(b, c, d, a, x[k + 14], S34, 0xFDE5380C);
        a = HH(a, b, c, d, x[k + 1], S31, 0xA4BEEA44);
        d = HH(d, a, b, c, x[k + 4], S32, 0x4BDECFA9);
        c = HH(c, d, a, b, x[k + 7], S33, 0xF6BB4B60);
        b = HH(b, c, d, a, x[k + 10], S34, 0xBEBFBC70);
        a = HH(a, b, c, d, x[k + 13], S31, 0x289B7EC6);
        d = HH(d, a, b, c, x[k], S32, 0xEAA127FA);
        c = HH(c, d, a, b, x[k + 3], S33, 0xD4EF3085);
        b = HH(b, c, d, a, x[k + 6], S34, 0x4881D05);
        a = HH(a, b, c, d, x[k + 9], S31, 0xD9D4D039);
        d = HH(d, a, b, c, x[k + 12], S32, 0xE6DB99E5);
        c = HH(c, d, a, b, x[k + 15], S33, 0x1FA27CF8);
        b = HH(b, c, d, a, x[k + 2], S34, 0xC4AC5665);
        a = II(a, b, c, d, x[k], S41, 0xF4292244);
        d = II(d, a, b, c, x[k + 7], S42, 0x432AFF97);
        c = II(c, d, a, b, x[k + 14], S43, 0xAB9423A7);
        b = II(b, c, d, a, x[k + 5], S44, 0xFC93A039);
        a = II(a, b, c, d, x[k + 12], S41, 0x655B59C3);
        d = II(d, a, b, c, x[k + 3], S42, 0x8F0CCC92);
        c = II(c, d, a, b, x[k + 10], S43, 0xFFEFF47D);
        b = II(b, c, d, a, x[k + 1], S44, 0x85845DD1);
        a = II(a, b, c, d, x[k + 8], S41, 0x6FA87E4F);
        d = II(d, a, b, c, x[k + 15], S42, 0xFE2CE6E0);
        c = II(c, d, a, b, x[k + 6], S43, 0xA3014314);
        b = II(b, c, d, a, x[k + 13], S44, 0x4E0811A1);
        a = II(a, b, c, d, x[k + 4], S41, 0xF7537E82);
        d = II(d, a, b, c, x[k + 11], S42, 0xBD3AF235);
        c = II(c, d, a, b, x[k + 2], S43, 0x2AD7D2BB);
        b = II(b, c, d, a, x[k + 9], S44, 0xEB86D391);
        a = AddUnsigned(a, AA);
        b = AddUnsigned(b, BB);
        c = AddUnsigned(c, CC);
        d = AddUnsigned(d, DD);
    }
    let temp = WordToHex(a) + WordToHex(b) + WordToHex(c) + WordToHex(d);
    return temp.toLowerCase();
}
