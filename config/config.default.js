/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
    /**
     * built-in config
     * @type {Egg.EggAppConfig}
     **/
    const config = exports = {};
    config.mysql = {
        // 单数据库信息配置
        client: {
            // host
            host: '120.77.137.125',
            // 端口号
            port: '3306',
            // 用户名
            user: 'root',
            // 密码
            password: '123456',
            // 数据库名
            database: 'testBase',
        },
        // 是否加载到 app 上，默认开启
        app: true,
        // 是否加载到 agent 上，默认关闭
        agent: false,
    };
    // use for cookie sign key, should change to your own and keep security
    config.keys = appInfo.name + '_1649357380636_221';
    config.cors = {
        origin: '*',
        allowMethods: 'GET,PUT,POST,DELETE,PATCH',
    };
    config.security = {
        csrf: {
            enable: false,
        },
        domainWhiteList: ['http://localhost:8080'],
    };
    // add your middleware config here
    config.middleware = [];

    // add your user config here
    const userConfig = {
        // myAppName: 'egg',
    };

    return {
        ...config,
        ...userConfig,
    };
};
