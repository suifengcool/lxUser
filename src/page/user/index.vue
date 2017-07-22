<template>
    <vm-layout id="user">
        <!-- 头部 -->
        <div class="header">
            <h3>艾子豪</h3>
            <i class="iconfont icon-write"></i>
        </div>

        <!-- 列表 -->
        <div class="list">
            <router-link to="/order/list" class="border-bottom cf">
                <i class="iconfont icon-icon-2 fl"></i>
                <p class="fl">我的订单</p>
                <i class="iconfont icon-right fr"></i>
            </router-link>
            <router-link to="/user/collect" class="border-bottom cf">
                <i class="iconfont icon-shoucang1 fl"></i>
                <p class="fl">我的收藏</p>
                <i class="iconfont icon-right fr"></i>
            </router-link>
            <router-link to="/user/support" class="border-bottom cf">
                <i class="iconfont icon-wenhao fl"></i>
                <p class="fl">帮助支持</p>
                <i class="iconfont icon-right fr"></i>
            </router-link>
        </div>
    </vm-layout>
</template>

<script>
export default {
    name: 'user',

    data () {
        return {
            config: vm.config,                               // 配置
        }
    },

    created () {
        this.config.title('我的')
    },

    methods: {
        
    }
}
</script>

<style scoped lang="sass">
// 头部
.header
    padding-top: 10rem
    background: #ccc
    position: relative
    h3
        height: 2.5rem
        line-height: 2.5rem
        font-size: 1.10rem
        color: #fff
        padding-left: .75rem
    i   
        position: absolute
        right: 1rem
        bottom: -.75rem
        display: inline-block
        height: 2rem
        line-height: 2rem
        text-align: center
        width: 2rem
        background: #03ca9d
        border-radius: 50%
        font-size: 1.1rem
        color: #fff
// 列表
.list 
    margin-top: .8rem
    a 
        padding: 0 .75rem
        height: 2.25rem
        line-height: 2.25rem
        font-size: .75rem
        display: block
        p 
            margin-left: .75rem
</style>
<style lang="sass">
.user
</style>