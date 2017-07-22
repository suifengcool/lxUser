<template>
    <vm-layout id="confirm">
        <!-- 头部 -->
        <div class="header border-bottom">
            <img src="../../../assets/confirm.png" alt="">
            <div class="header-main">
                <div class="header-main-top">
                    <h3>已确认，待支付</h3>
                    <i>倒计时：10：00</i>
                </div>
                <span>请尽快支付</span>
            </div>
        </div>
        
        <!-- title -->
        <div class="title border-bottom">订单详情</div>

        <div class="order-msg border-bottom item">
            <p>订单号：20170606110523</p>
            <p>故宫城墙一日游</p>
            <p>路线：从故宫正门出发，沿着XX到正阳门，沿途</p>
            <p>带您领略不一样的故宫建筑文化...</p>
            <p>出发时间：</p>
        </div>
        <div class="guide-msg border-bottom item">
            <p>导游：</p>
            <p>联系方式：</p>
            <p>集合地点：</p>
        </div>
        <div class="user-msg border-bottom item">
            <p>预订人：</p>
            <p>联系方式：</p>
            <p>预定人数：</p>
        </div>
    </vm-layout>
</template>

<script>
export default {
    name: 'confirm',

    data () {
        return {
            config: vm.config,                        // 配置
            orderNum: this.$route.query.orderNum,     // 订单号
            init: {}                                  // 数据
        }
    },

    created () {
        this.config.title('支付旅费')
        // this.fetchData()
    },

    methods: {
        // 获取用户信息
        fetchData(){
            this.$http.get(`/guide/order/detail?orderNum=${this.orderNum}`)
            .then((rst) => {
                this.init = rst.body.data
            })
            .catch(err => {
                this.$vux.toast.show({
                    text: err.body.msg,
                    type: 'text'
                })
            })
        },

        // 取消订单
        cancel() {
            this.$http.get(`/guide/order/cancel?orderNum=${this.orderNum}`)
            .then((rst) => {
                if(rst.body && rst.body.res_code === 200){
                    this.$vux.toast.show({
                        text: '订单取消成功',
                        type: 'text'
                    })
                }
            })
            .catch(err => {
                this.$vux.toast.show({
                    text: err.body.msg,
                    type: 'text'
                })
            })
        }
    }
}
</script>

<style scoped lang="sass">
// 头部
.header
    padding: 25px 22px 20px 15px
    display: flex
    justify-content: space-between
    img 
        width: 28px
        height: 28px
        margin-right: 8px
    .header-main
        flex: 1
        .header-main-top
            display: flex
            justify-content: space-between
            font-size: 18px
            color: #333
            height: 18px
            line-height: 18px
            i 
                font-style: normal
                font-size: 15px
                color: #5d668c
        span
            font-size: 15px
            color: #666
            margin-top: 15px
            display: block
// 列表(公用样式)
.title
    height: 40px
    line-height: 40px
    padding-left: 24px
    font-size: 18px
    color: #000
    position: relative
    &:before
        content: ''
        position: absolute
        left: 14px
        top: 50%
        transform: translateY(-50%)
        display: inline-block
        width: 3px
        height: 18px
        background: #03ca9d
.item
    padding: .2rem 0
    p 
        height: .83rem
        line-height: .83rem
        margin-bottom: .2rem
        font-size: .6rem
        padding-left: 1.12rem 
</style>
<style lang="sass">
.vm-flexview
    background: #fff
</style>