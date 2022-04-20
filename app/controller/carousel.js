'use strict';

const BaseController = require('./baseController');
const utility = require('utility');

class carouselController extends BaseController {
    async getCarouselList() {
        const {ctx} = this
        const result = await this.app.mysql.select('carousel')
        await this.success(result)
    }

    async addCarousel() {
        const {ctx} = this
        const result = await this.app.mysql.insert('carousel', ctx.request.body)
        if (result.affectedRows === 1) {
            await this.success('添加轮播图成功!');
        } else {
            await this.error('添加失败');
        }
    }

    async deleteCarousel() {
        const {ctx} = this
        const result = await this.app.mysql.delete('carousel', {id: ctx.query.id})
        if (result.affectedRows === 1) {
            await this.success('删除成功');
        } else {
            await this.error('删除失败');
        }
    }
}

module.exports = carouselController;
