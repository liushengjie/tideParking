const co = require('co');
const {redisConfig} = require('../../config');
const redis = require('redis');

const { host, port, password} = redisConfig;
console.log('========================================');
console.log('REDIS CONNECTION =>', `${host}:${port}`);
console.log('========================================\n');

exports.connect = co.wrap(function *() {
    let client = null;

    try {
        client = yield redis.createClient(port, host,{auth_pass:password});
        return client;
    } catch (err) {
        console.error({ err });
        client && client.close();
        throw err;
    }
});
