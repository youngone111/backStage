'use strict';

const BaseController = require('./baseController');
const utility = require('utility');

class userController extends BaseController {
    async login() {
        const {ctx} = this;
        let {username, password} = ctx.request.body;
        const result = await this.app.mysql.get('user', {
            username,
        });
        if (result) {
            let {salt, password: psw} = result;
            let validatePsw = utility.md5(password + salt) === psw;
            if (validatePsw) {
                await this.success('登陆成功');
            } else {
                await this.error('密码错误');
            }
        } else {
            await this.error('请先注册');
        }
    }

    async register() {
        const {ctx} = this;
        let {phone, username, password} = ctx.request.body;
        let randomString = utility.randomString('8');
        password = utility.md5(password + randomString);
        const result = await this.app.mysql.insert('user', {
            username, password, salt: randomString, phone,
        });
        if (result.affectedRows === 1) {
            await this.success('注册成功');
        }
    }

    async getUserList() {
        const {ctx} = this;
        let {page, pageSize} = ctx.query;
        if (page && pageSize) {
            const records = await this.app.mysql.select('user_mp', {
                limit: parseInt(pageSize),
                offset: parseInt(pageSize) * (parseInt(page) - 1),
            });
            const total = (await this.app.mysql.select('user_mp')).length;
            let data = {
                records,
                total,
                page,
                pageSize,
            };
            await this.success(data);
        } else {
            const result = await this.app.mysql.select('user_mp');
            await this.success(result);
        }
    }

    async getLandlordList() {
        const {ctx} = this;
        let {page, pageSize} = ctx.query;
        if (page && pageSize) {
            const records = await this.app.mysql.select('landlord', {
                limit: parseInt(pageSize),
                offset: parseInt(pageSize) * (parseInt(page) - 1),
            });
            const total = (await this.app.mysql.select('landlord')).length;
            let data = {
                records,
                total,
                page,
                pageSize,
            };
            await this.success(data);
        }
    }
}

module.exports = userController;
