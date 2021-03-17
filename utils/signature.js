//this block is used to make this module works with Node (CommonJS module format)
if (typeof define !== 'function') {
    var define = require('amdefine')(module)
}

// <script src="https://unpkg.com/crypto-js@4.0.0/crypto-js.js"></script>
define(['./crypto-js.js'], function (CryptoJS) {

    function genSignagure(result) {

        // 编码字符串
        function encode (str) {
            const result = encodeURIComponent(str);

            return result.replace(/!/g, '%21')
            .replace(/'/g, '%27')
            .replace(/\(/g, '%28')
            .replace(/\)/g, '%29')
            .replace(/\*/g, '%2A');
        }

        // 列表处理
        function repeatList (list, key, repeat) {
            for (let i = 0; i < repeat.length; i++) {
            const item = repeat[i];
            const prefix = `${key}.${i + 1}`;
            list.push([encode(prefix), encode(item)]);
            }
        }

        /**
         * 对参数的key进行字典排序，编码键值对
         * @param {Object} params
         * @returns {List}
         */
        function normalize (params) {
            const list = [];
            // 对参数key进行字典排序
            const keys = Object.keys(params).sort();
            for (let i = 0; i < keys.length; i++) {
            const key = keys[i];
            const value = params[key];
            if (Array.isArray(value)) {
                // 处理列表
                repeatList(list, key, value);
            } else {
                // 编码键值
                if (value !== undefined) {
                list.push([encode(key), encode(value)]); // push []
                }
            }
            }
            return list;
        }

        /**
         * 把参数拼接成字符串，格式如key=value&key=value
         * @param {List} normalized 排序编码处理的参数列表，示例 [[key, value], ...]
         * @returns {String}
         */
        function canonicalize (normalized) {
            const fields = [];
            for (let i = 0; i < normalized.length; i++) {
            const [key, value] = normalized[i];
            if (key === 'signature') continue;
            fields.push(`${key}=${value}`);
            }
            return fields.join('&');
        }

        /**
         * 计算参数签名
         * @param {String} secretAccessKey 签名秘钥
         * @param {Object} params HTTP参数
         */
        function calSignature (secretAccessKey, params) {
            const normalized = normalize(params);
            const canonicalized = canonicalize(normalized);
            // 2.1 get string to sign
            const signText = `${encode(canonicalized)}`;
            // 2.2 get signature
            const key = secretAccessKey + '&';
            const signature = CryptoJS.HmacSHA1(signText, key).toString(CryptoJS.enc.Base64);// sha1(signText, key, 'base64');
            return { signature, signText };
        }

        /**
         * 计算签名
         */
        result.timestamp = new Date().valueOf();
        var key = window.key  || 'this-is-keythis-is-key';
        result.accessKey = key.substr(0, key.length / 2);
        var signObj = calSignature(key.substr(key.length / 2), result); 

        // debug
        signObj.key = key;
        console.log('signature', signObj);

        // add signature
        result.signature = signObj.signature;
    }

    return { genSignagure };
});
