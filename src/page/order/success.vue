<template>
    <vm-layout id="success">
        <i class="iconfont icon-duigou"></i>
        <h3>预定成功</h3>
        <p>请耐心等待{{real_name}}导游确认</p>

        <!-- 底部按钮 -->
        <vm-tabbar slot="tabbar" class="tabbar-box">
            <button class="tabbar-item" type="button" @click="goOrderDetail()">查看订单</button>
        </vm-tabbar>
    </vm-layout>
</template>

<script>
export default {
    name: 'success',

    data () {
        return {
            real_name: this.$route.query.real_name       // 导游姓名
        }
    },

    methods: {
        goOrderDetail(){
            this.$router.push('/order/list')
        }
    }
}
</script>
<style scoped lang="sass">
#success
    text-align: center
    i 
        display: block
        font-size: 3.53rem
        color: #03ca9d
        margin: 8.75rem 0 .62rem 0
    h3 
        height: 1.68rem
        line-height: 1.68rem
        font-size: 1.2rem
        color: #000
        font-weight: 300
    p 
        height: 1.05rem
        line-height: 1.05rem
        font-size: .75rem
        color: #666
    // 按钮
    .tabbar-box
        height: 2.5rem
        text-align: center
        box-sizing: border-box
        button
            height: 1.9rem
            line-height: 1.9rem
            border: none
            background: #03ca9d
            border-radius: 4px
            margin: .3rem 0.5rem
            font-size: .75rem
            color: #fff
</style>
<style lang="sass">
.vm-flexview
    background: #fff
.vm-tabbar 
    position: fixed
    bottom: 0
    &:after
        border-top: none
</style>