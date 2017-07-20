import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

// 页面路径(相对 ../page)
let config = [
    // 景点相关
    '/home/index',                   // 首页(景点列表页面)
    '/scenicspot/detail',            // 景点明细

    // 个人相关
    '/user/index',                   // 我的
    '/user/collect',                 // 我的收藏
    '/user/support',                 // 帮助与支持

    // 订单相关
    '/order/detail',                  // 订单(详情页)
    '/order/list',                   // 订单(列表页)
    '/order/success',                // 订单成功页

    // 评论相关
    '/comment/index',                // 评论页
    '/comment/list',                 // 评论列表comment页
]

// 定义路由
const routes = []

// 解析路由配置，添加进routes
config.forEach((value, index, arr) => {
    routes.push({
        path: value.replace(/(\/index|home\/index)$/g, ''),
        component: resolve => require(
            ['../page' + value.replace(/\/(\:|\?)[A-z]+$/g, '') + '.vue'],
            resolve
        )
    })
})

// 404 页面
routes.push({
    path: '*',
    component: resolve => require(['../page/404.vue'], resolve)
})

export default new Router({
    mode: 'hash',
    linkActiveClass: 'active',
    routes: routes
})