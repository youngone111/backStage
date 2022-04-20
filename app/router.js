'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
    const {router, controller} = app;
    //登录
    router.post('/login', controller.user.login);

    //出租房源
    router.get('/lease', controller.leaseHouse.getLeaseHouse)
    router.get('/lease/:id', controller.leaseHouse.getLeaseHouseById);
    router.post('/lease', controller.leaseHouse.addLeaseHouse);
    router.put('/lease', controller.leaseHouse.editLeaseHouse);
    router.delete('/lease', controller.leaseHouse.deleteLeaseHouse);

    //用户
    router.get('/user', controller.user.getUserList)
    router.get('/landlord', controller.user.getLandlordList)

    //轮播图
    router.get('/carousel', controller.carousel.getCarouselList)
    router.post("/carousel",controller.carousel.addCarousel)
    router.delete('/carousel',controller.carousel.deleteCarousel)
};
