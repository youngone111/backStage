'use strict';
const baseController = require('./baseController');

class leaseHouse extends baseController {
    async getLeaseHouse() {
        const {ctx} = this;
        let {page, pageSize} = ctx.query;
        if (page && pageSize) {
            const records = await this.app.mysql.select('lease_house', {
                limit: parseInt(pageSize),
                offset: parseInt(pageSize) * (parseInt(page) - 1),
            });
            const total = (await this.app.mysql.select('lease_house')).length;
            let data = {
                records,
                total,
                page,
                pageSize,
            };
            await this.success(data);
        } else {
            const result = await this.app.mysql.select('lease_house');
            await this.success(result);
        }
    }

    async getMyReleaseHouse() {
        const {ctx} = this
        const result = await this.app.mysql.select('lease_house', {
            where: {openId: ctx.state.user.openid},
        })
        await this.success(result)
    }

    async getLeaseHouseById() {
        const {ctx} = this;
        const {id} = ctx.params;
        const result = await this.app.mysql.get('lease_house', {
            id,
        });
        await this.success(result);
    }

    async deleteLeaseHouse() {
        const {ctx} = this;
        const {id} = ctx.query;
        const result = await this.app.mysql.delete('lease_house', {
            id,
        });
        if (result.affectedRows === 1) {
            await this.success('删除成功');
        } else {
            await this.error('删除失败');
        }
    }

    async addLeaseHouse() {
        const {ctx} = this;
        let {
            city,
            address,
            rent,
            rental_mode,
            lessor_name,
            lessor_phone,
            house_type,
            area_size,
            area,
            lever,
        } = ctx.request.body;
        const result = await this.app.mysql.insert('lease_house', {
            city,
            address,
            rent,
            rental_mode,
            lessor_name,
            lessor_phone,
            house_type,
            area_size,
            area,
            lever,
        });
        if (result.affectedRows === 1) {
            await this.success('发布出租房源成功!');
        } else {
            await this.error('发布失败');
        }
    };

    async editLeaseHouse() {
        const row = this.ctx.request.body;
        const result = await this.app.mysql.update('lease_house', row);
        if (result.affectedRows === 1) {
            await this.success('修改成功');
        } else {
            await this.error('修改失败');
        }
    }
}

module.exports = leaseHouse;
