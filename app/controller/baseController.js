'use strict';

const Controller = require('egg').Controller;

class BaseController extends Controller {
    async success(result = '成功', msg = '请求成功') {
        this.ctx.body = {
            code: 200,
            success: true,
            result,
            msg,
        };
    }

    async error(error) {
        this.ctx.body = {
            code: 200,
            success: false,
            result: null,
            msg: error,
        };
    }
}

module.exports = BaseController;
