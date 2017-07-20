import 'babel-polyfill'
import Vue from 'vue'
import Config from './config'
import VueResource from 'vue-resource'
import * as Storage from './plugin/storage'
import * as filters from './filters'
import Moment from 'moment'
import {sync} from 'vuex-router-sync'
import { mapGetters, mapActions } from 'vuex'

// vux相关组件
import {ToastPlugin, WechatPlugin, LoadingPlugin, AlertPlugin} from 'vux'

import App from './app'
import router from './router'
import store from './store'

// 点击延迟
import FastClick from 'fastclick'
FastClick.attach(document.body)

// 开发环境打开调试工具
Vue.config.debug = process.env.NODE_ENV === 'dev'

// 设置moment
Moment.locale('zh-cn')
global.moment = Moment

// 加载过滤器
Object.keys(filters).forEach(key => {
    Vue.filter(key, filters[key])
})

// 加载组件
Vue.use(VueResource)
Vue.use(WechatPlugin)
Vue.use(ToastPlugin)
Vue.use(LoadingPlugin)
Vue.use(AlertPlugin)

const wx = Vue.wechat

sync(store, router)
const {
    state
} = store

// vue-resource 初始化设置
Vue.http.options.emulateJSON = true
Vue.http.options.credentials = true
Vue.http.options.cache = true

// http请求添加token
let access_token = document.cookie.match(/access_token=(\w+)(?=;)/) ? document.cookie.match(/access_token=(\w+)(?=;)/)[1] : ''
Vue.http.interceptors.push((req, next) => {
    req.headers.set('token', access_token)
    // 判断授权重定向
    next((rsts)=>{
        if(parseInt(rsts.body.res_code) === 301 && rsts.body.url){
            window.location.href = rsts.body.url
        }
    })
})

// // 微信分享
// if (process.env.NODE_ENV === 'production') {
//     wx.ready(() => {
//         console.log('wechat ready')
//         wx.onMenuShareAppMessage({
//             title: '旅游', // 分享标题
//             desc: '基于 WeUI 和 Vue 的移动端 UI 组件库',
//             link: 'https://vux.li?x-page=wechat_share_message',
//             imgUrl: 'https://static.vux.li/logo_520.png'
//         })

//         wx.onMenuShareTimeline({
//             title: 'VUX', // 分享标题
//             desc: '基于 WeUI 和 Vue 的移动端 UI 组件库',
//             link: 'https://vux.li?x-page=wechat_share_timeline',
//             imgUrl: 'https://static.vux.li/logo_520.png'
//         })
//     })

//     const permissions = JSON.stringify(['onMenuShareTimeline', 'onMenuShareAppMessage'])
//     const url = document.location.href
//     Vue.http.post('https://vux.li/jssdk?url=' + encodeURIComponent(url.split('#')[0]) + '&jsApiList=' + permissions).then(res => {
//         wx.config(res.data.data)
//     })
// }

window.vm = new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App),
    data: {
        config: Config, // 全局注入配置
        mapGetters,     // 全局引入 vuex mapGetters 函数
        mapActions      // 全局引入 vuex mapActions 函数
    }
});