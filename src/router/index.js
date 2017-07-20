import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

// 页面路径(相对 ./views)
let config = [
    // 个人相关
    '/home/index',                  // 首页(‘我的’页面)

    '/user/line',                   // 线路管理
    '/user/create',                 // 旅游内容(修改路线)
    '/user/money',                  // 我的钱包
    '/user/detail',                 // 收支明细
    '/user/getCash',                // 收支明细

    // 完善信息
    '/info/index',                  // 个人信息-首页
    '/info/rules',                  // 个人信息-细则
    '/info/identify',               // 个人信息-审核页
    '/info/detail',                 // 个人信息详情

    // 订单相关
    '/order/index',                 // 订单列表(已确认、未确认)
    '/order/confirm',               // 确认订单  

    // 未授权
    '/auth' // 未授权页
]

// 定义路由
const routes = []

// 解析路由配置，添加进routes
config.forEach((value, index, arr) => {
    routes.push({
        path: value.replace(/(\/index|home\/index)$/g, ''),
        component: resolve => require(
            ['../views' + value.replace(/\/(\:|\?)[A-z]+$/g, '') + '.vue'],
            resolve
        )
    })
})

// 404 页面
routes.push({
    path: '*',
    component: resolve => require(['../views/404.vue'], resolve)
})

export default new Router({
    mode: 'hash',
    linkActiveClass: 'active',
    routes: routes
})