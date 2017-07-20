<!--
    分页插件
    ajax 入参：{page: 0, pageSize: 0}
         出参：{data: {count: 100, rows: []}}
    用法：
        <Pager
            url="/system/config"
            :data="{}"
            callback="alert()"
            inline-template
        >
            <ul class="pager">
                <li v-for="item in items" @click="emit('aa')">
                {{item}}
                <Lazyload
                    :src="require('../assets/activity/getNew11/guideSave.png')"
                    :defaultsrc="require('../assets/404.png')"
                ></Lazyload>
                </li>
                <li class="swipLoad" v-if="cur < all">
                    <span class="preloader"></span>
                </li>
                <li class="loadAll" v-if="cur == all && all > 1">
                    <span>我是有底线的</span>
                </li>
            </ul>
        </Pager>

        <script>
            created () {
                vm.$on('aa', this.aa)
            },

            beforeDestroy () {
                vm.$off('aa', this.aa)
            },

            methods: {
                aa (args) {
                    console.log(args)
                }
            }
        </script>
 -->

<template>
    <ul class="pager">
        <li v-for="item in items">
            {{item}}
        </li>
        <li class="swipLoad" v-if="cur < all">
            <span class="preloader"></span>
        </li>
        <li class="loadAll" v-if="cur == all && all > 1">
            <span>我是有底线的</span>
        </li>
    </ul>
</template>

<script>
import $ from 'zepto'
import Ajax from '../components/Ajax'
import Lazyload from '../components/Lazyload'
import Filters from '../components/Filters.js'

export default {
    name: 'Pager',

    props: [
        'content',  // 滚动父元素 class or id, 默认 '.content'
        'url',      // ajax 请求地址
        'data',     // ajax 入参
        'type',     // ajax 请求方式(默认 GET)
        'pagename', // 页面名称（唯一，返回定位必传）
        'pagesize', // 每页数量(默认20)
        'callback', // ajax 请求成功的回调函数
        'complete'  // ajax 请求完成的回调函数
    ],

    data () {
        return {
            config: vm.config,  // 配置
            cur: this.pagename ? (sessionStorage[`${this.pagename}_curPage`] || 0) : 0,             // 当前页
            all: 0,             // 总页数(从返回的 json 字段读取，如 res.data.count)
            count: 0,           // 总数
            items: this.pagename ? JSON.parse(sessionStorage[`${this.pagename}_pagerData`] || '[]') : [],          // 循环的数组(如 res.data.rows)
            pending: false,     // 正在加载标记
            completed: () => {
                this.pending = false
                this.complete && this.complete()
            },
            scrollTop: 0        // 距离顶部滚动距离
        }
    },

    filters: Filters,

    components: {
        Lazyload
    },

    created () {
        this.fetch()
    },

    mounted () {
        this.scrollLoad()
    },

    methods: {
        // 请求数据
        fetch () {
            if (this.pending) return
            this.pending = true

            Ajax.yFetch(
                this.url,
                $.extend(
                    { page: this.cur, pageSize: this.pagesize || 20 },
                    this.data
                ),
                this.type || 'GET',
                this.completed,
                !this.cur
            ).then(res => {
                // 若数据更新，重新加载
                if (this.pagename && sessionStorage[`${this.pagename}_totalPage`] && sessionStorage[`${this.pagename}_totalPage`] != res.data.count) {
                    sessionStorage.removeItem(`${this.pagename}_totalPage`)
                    sessionStorage.removeItem(`${this.pagename}_curPage`)
                    sessionStorage.removeItem(`${this.pagename}_pagerData`)
                    sessionStorage.removeItem(`${this.pagename}_scrollTop`)
                    this.cur = 0
                    this.items = []
                    this.fetch()
                    return
                }

                // 缓存当前页数
                if (this.pagename)
                    sessionStorage[`${this.pagename}_curPage`] = this.cur
                // 计算下一页数
                this.cur ++
                // 更新总数
                this.count = res.data.count
                // 缓存总页数
                if (this.pagename)
                    sessionStorage[`${this.pagename}_totalPage`] = this.count
                // 缓存本页之前数据
                if (this.pagename)
                    sessionStorage[`${this.pagename}_pagerData`] = JSON.stringify(this.items)
                // 衔接数组
                this.items = this.items.concat(res.data.rows)
                // 更新总页数 向上取整
                if(!this.all)
                    this.all = Math.ceil(res.data.count / (this.pagesize || 20))
                // 请求成功的回调
                if (this.callback) {
                    typeof this.callback == 'function' && this.callback(res)
                    typeof this.callback == 'string' && eval(this.callback)
                }
                // 定位
                if (this.pagename) {
                    setTimeout(()=> {
                        $(this.content || '.content').scrollTop(sessionStorage[`${this.pagename}_scrollTop`])
                    })
                }
            }).catch(err => $.toast(err.errMsg))
        },

        // 下拉加载
        scrollLoad () {
            $(this.content || '.content').on('scroll', () => {
                // 记录滚动位置
                if (this.pagename) {
                    this.scrollTop = $(this.content || '.content').scrollTop()
                    sessionStorage[`${this.pagename}_scrollTop`] = this.scrollTop
                }

                // 全部已加载 无操作
                if (this.cur == this.all) return

                // 当前页滑动到页底 加载下一页
                if ($('.pager li').last().find('span').offset().top < 2 * $(window).height()) {
                    this.fetch();
                }

            })
        },

        // 发送到父组件的事件
        emit (name, args = []) {
            vm.$emit(name, args)
        }
    }
}
</script>

<style scoped lang="sass">
.swipLoad, .loadAll
    text-align: center
    line-height: 4rem
    color: #999
    font-size: .6rem
    display: block
    background: url('./Pager-bg.png') no-repeat center center
    background-size: 10rem .3rem
.swipLoad
    background: none
    line-height: 1
    padding: 1rem 0
</style>
