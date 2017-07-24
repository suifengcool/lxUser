<template>
    <vm-layout id="confirm">
        <!-- 头部 -->
        <div class="header border-bottom">
            <img src="../../../assets/confirm.png" alt="">
            <div class="header-main">
                <div class="header-main-top">
                    <span>待确认</span>
                    <i>倒计时：10：00</i>
                </div>
                <p>导游正在查看您的订单信息，核实没问题后，接受订单即刻出发旅行</p>
            </div>
        </div>

        <!-- 行程&导游信息 -->
        <div class="travel-title border-bottom item">故宫城墙一日游</div>
        <div class="guide border-bottom">
            <div class="img"></div>
            <div class="guide-desc">
                <h3 class="cf">
                    <span class="fl">导游：</span>
                    <span class="fr">艾子豪</span>
                </h3>
                <p class="cf">
                    <span class="fl">联系方式：</span>
                    <span class="fr">13797071376</span>
                </p>
                <p class="cf">
                    <span class="fl">游览地址：</span>
                    <span class="fr">北京市西城区西单</span>
                </p>
            </div>
        </div>

        <!-- 交易信息 -->
        <div class="travel-title border-bottom item">交易信息</div>
        <div class="desc-change border-bottom">
            <p>
                <span>导游费：</span>
                <i>￥500</i>
            </p>
            <p>
                <span>预订人：</span>
                <i>艾子豪</i>
            </p>
            <p>
                <span>预订人电话：</span>
                <i>13797071376</i>
            </p>
            <p>
                <span>预订人数：</span>
                <i>5人</i>
            </p>
        </div>

        <!-- 底部按钮 -->
        <vm-tabbar slot="tabbar" class="tabbar-box">
            <button class="tabbar-item" type="button">取消订单</button>
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
            init: {},                                 // 数据
            imgOrigin: ''                             // 图片前缀
        }
    },

    created () {
        this.config.title('订单号：'+ this.orderNum)
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
                }else{
                    this.$dialog.toast({mes: res.msg})
                }
            })
            .catch(err => this.$dialog.toast({mes: err.msg}))
        },

        // 取消订单
        cancel() {
            vm.fetch.get({
                url: '/user/order/cancel',
                data:{
                    orderNum: this.orderNum
                }
            })
            .then(res => {
                if(res.res_code === 200){
                    this.$dialog.toast({
                        mes: '订单取消成功',
                        timeout: 1500,
                        callback: () => {
                            this.$router.replace('/order/list')
                        }
                    })
                }else{
                    this.$dialog.toast({mes: res.msg})
                }
                
            })
            .catch(err => this.$dialog.toast({mes: err.msg}))
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
        p 
            font-size: 15px
            color: #666
            margin-top: 15px
// 列表(公用样式)
.item
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
// 交易信息
.desc-change
    padding: 5px 24px
    p 
        height: 30px
        line-height: 30px
        display: flex
        font-size: 15px
        color: #666
        span,i
            display: inline-block
            width: 50%
        span
            text-align: left
        i 
            font-style: normal
            text-align: right 
// 导游信息
.guide
    padding: 1rem
    display: flex
    .img
        height: 3.3rem
        width: 3.3rem
        border-radius: 50%
        background: red
        margin-right: .64rem
    .guide-desc
        flex: 1
        h3
            height: 1.05rem
            line-height: 1.05rem
            margin: .1rem 0 .38rem 0
            font-size: .75rem
            font-weight: 300
        p   
            height: .84rem
            line-height: .84rem
            font-size: .6rem
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