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
            <p>订单号：{{init.order_num}}</p>
            <p>故宫城墙一日游</p>
            <p>路线：{{init.view_line_content}}</p>
            <p>出发时间：{{init.visit_date}}&nbsp;{{init.visit_time}}</p>
        </div>
        <div class="guide-msg border-bottom item">
            <p>导游：</p>
            <p>联系方式：</p>
            <p>集合地点：</p>
        </div>
        <div class="user-msg border-bottom item">
            <p>预订人：{{init.contact_name}}</p>
            <p>联系方式：{{init.contact_phone}}</p>
            <p>预定人数：{{init.person_num}}</p>
        </div>

        <!-- 底部按钮 -->
        <vm-tabbar slot="tabbar" class="tabbar-box">
            <input type="text">
            <span>支付金额：{{init.amount}}</span>
            <button class="tabbar-item" type="button">去支付</button>
        </vm-tabbar>
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
        this.fetchData()
    },

    methods: {
        // 获取订单信息
        fetchData(){
            vm.fetch.get({
                url: '/user/order/detail',
                data:{
                    orderNum: this.orderNum
                }
            })
            .then(res => {
                if(res.res_code === 200){
                    this.imgOrigin = res.prefix 
                    this.init = res.data
                }else{
                    this.$dialog.toast({mes: res.msg})
                }
            })
            .catch(err => this.$dialog.toast({mes: err.msg}))
        },
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
// title
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
// 按钮
.tabbar-box
    height: 2.5rem
    text-align: center
    box-sizing: border-box
    padding: 0 .75rem
    button
        height: 1.9rem
        line-height: 1.9rem
        border: none
        background: #03ca9d
        border-radius: 4px
        font-size: .75rem
        color: #fff 
        width: 5.3rem
    input 
        border: .1rem solid #03ca9d
        height: 1.9rem
        line-height: 1.9rem
        padding-left: 4rem
        width: 11.37rem
        margin-right: .59rem
        border-radius: .2rem
        color: #03ca9d
    span
        position: absolute
        left: 1.25rem
        top: 50%
        transform: translateY(-50%)
        font-size: .75rem
        color: #03ca9d
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