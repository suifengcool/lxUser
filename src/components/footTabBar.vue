<template>
	<vm-layout id="footTabBar">
		<keep-alive>
            <router-view></router-view>
        </keep-alive>
       
	    <vm-tabbar slot="tabbar">
            <vm-tabbar-item
                v-for="(item, index) in foots"
                :title="item.text"
                :link="item.link"
                :active="item.link == pathname"
                :dot="false"
            >
                <i slot="icon" :class="['iconfont', item.link == pathname ? item.activeIcon : item.icon]"></i>
            </vm-tabbar-item>
        </vm-tabbar>
  	</vm-layout>
</template>

<script>
export default {
	name: 'footTabBar',

    data () {
        return {
            foots: [{
                link: '/',
                text: '景点',
                icon: 'icon-menpiao',
                activeIcon: 'icon-menpiao'
            },{
                link: '/order/list',
                text: '订单',
                icon: 'icon-icon-2',
                activeIcon: 'icon-icon-2'
            },{
                link: '/user',
                text: '我的',
                icon: 'icon-wode',
                activeIcon: 'icon-wode'
            }],
            pathname: location.pathname
        }
    },

    watch: {
        // 如果路由有变化，会再次执行该方法: 修复返回bug
        $route (val, old) {
            this.pathname = location.pathname
        }
    },

    methods: {
        
    }
}
</script>

<style scoped lang="sass">
@import '../styles/variables'

.vm-tabbar
    &:after
        border-top-color: $color-split
    .iconfont
        font-size: .9rem
    .icon-cart-full
        font-size: 1.05rem
    .icon-user
        font-size: 1.1rem
    .icon-lips
        font-size: .84rem
    .icon-cart
        font-size: 1.05rem
    .icon-_fuzhi
        font-size: 1.1rem
    .tabbar-active
        color: $color-danger
</style>
<style lang="sass">
#footTabBar .vm-tabbar
    height: 2.45rem
    padding: 0
    position: fixed
    bottom: 0
    .tabbar-item
        height: 100%
        background: #F8F8FA
        .tabbar-txt
            display: inline-block
            font-size: .48rem
        .tabbar-icon
            display: inline-block
            width: 1.34rem
            height: 1.33rem
            margin-bottom: .08rem
            position: relative
            .iconfont
                position: absolute
                left: 50%
                top: 50%
                transform: translate(-50%,-42%)
#footTabBar .vm-scrollview
    padding-bottom: 2.4rem
#footTabBar .vm-tabbar .tabbar-active
    color: #03ca9d
</style>