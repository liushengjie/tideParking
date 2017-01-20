module.exports = {
    port: '8080',
    ROUTE_BASE_PATH: '/tideServer',

    // Redis 配置
    // @see https://www.npmjs.com/package/redis#options-object-properties
    redisConfig: {
        host: '10.120.147.117',
        port: '6379',
        password: 'foobared',
    },

    // MongoDB 配置
    // @see https://www.qcloud.com/doc/product/240/3979
    mongoConfig: {
        username: 'admin',
        password: '1qaz2wsX',
        host: '123.207.169.53',
        port: '27017',
        query: '?authMechanism=MONGODB-CR&authSource=admin',
        database: 'myhome',
    },

    host: '10.120.147.117',
    user: 'root',
    password: '1qaz2wsx',
    database: 'tide'
};