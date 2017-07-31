<template>
    <vm-layout id="confirm">
        <!-- 头部 -->
        <div class="header border-bottom">
            <img src="../../../assets/confirm.png" alt="">
            <div class="header-main">
                <div class="header-main-top">
                    <h3>已确认，待支付</h3>
                    <i>{{minute}}{{second}}</i>
                </div>
                <span>请尽快支付</span>
            </div>
        </div>
        
        <!-- title -->
        <div class="title border-bottom">订单详情</div>

        <div class="order-msg border-bottom">
            <p>订单号：{{init.order_num}}</p>
            <p>{{init.view_line_name}}</p>
            <p>路线：{{init.view_line_content}}</p>
            <p>出发时间：{{init.visit_date}}&nbsp;{{init.visit_time}}</p>
        </div>
        <div class="guide-msg border-bottom item">
            <p>导游：{{init.real_name}}</p>
            <p>联系方式：{{init.phone_num}}</p>
            <!-- <p>集合地点：</p> -->
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
            <button class="tabbar-item" type="button" @click="showPop=true">去支付</button>
        </vm-tabbar>

        <!-- 验证码弹框 -->
        <vm-popup v-model="showPop" position="center" width="75%" class="codePop">
            <h3 class="border-bottom"><i class="iconfont icon-shutdown" @click="showPop=false"></i>支付</h3>
            <p class="border-bottom">￥{{init.amount}}</p>
            <div class="payMethod border-bottom cf">
                <span class="fl">微信支付</span>
                <i class="iconfont icon-right fr"></i>
            </div>
            <button type="button" @click="createPaysign()">确认支付</button>
        </vm-popup>
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
            showPop: false,                           // 支付弹框
            totolTime: 600,
            day:'',
            hour:'',
            minute:'',
            second:'',
            timer: '',
            isWeixin: navigator.userAgent.toLowerCase().indexOf('micromessenger/') > -1,
        }
    },

    created () {
        this.config.title('支付旅费')
        this.fetchData()
    },

    destroyed() {
        clearInterval(this.timer)
    },

    methods: {
        // 获取订单信息
        fetchData(){
            this.$http.get(`/user/order/detail?orderNum=${this.orderNum}`)
            .then(res => {
                if(res.body.res_code === 200){
                    this.imgOrigin = res.body.prefix 
                    this.init = res.body.data

                    // 获取倒计时
                    if(res.body.data.visitor_pay_final_time){
                        let starttime = (res.body.data.visitor_pay_final_time).replace(new RegExp("-","gm"),"/")
                        let starttimeHaoMiao = (new Date(starttime)).getTime()
                        let timestamp = Date.parse(new Date())
                        this.totolTime = (starttimeHaoMiao - timestamp)/1000
                        this.countdowm(this.totolTime)
                    }
                }else{
                    this.$dialog.toast({mes: res.body.msg})
                }
            })
            .catch(err => this.$dialog.toast({mes: err.body.msg}))
        },

        countdowm (value){
            this.timer = setInterval(()=>{
                if(value <= 0){
                    clearInterval(this.timer)
                    this.$dialog.toast({
                        mes: '该订单支付已超时,请重新下单',
                        timeout: 1500,
                        callback: () => {
                            this.$router.replace('/order/list')
                        }
                    })
                }

                var days=0,hours=0,minutes=0,seconds=0; //时间默认值
                if(value > 0){
                    days = Math.floor(value / (60 * 60 * 24))
                    hours = Math.floor(value / (60 * 60)) - (days * 24)
                    minutes = Math.floor(value / 60) - (days * 24 * 60) - (hours * 60)
                    seconds = Math.floor(value) - (days * 24 * 60 * 60) - (hours * 60 * 60) - (minutes* 60)
                }
                if (minutes <= 9) minutes = '0' + minutes
                if (seconds <= 9) seconds = '0' + seconds

                this.day = days+'天'
                this.hour = hours+'时'
                this.minute = minutes+ ':'
                this.second = seconds
                value --
            }, 1000)
        },

        // 调用生成的支付签名
        createPaysign (orderIds) {
            this.$http.post("/user/order/toPay",{
                orderNum: this.orderNum
            })
            .then (res => {
                if (this.isWeixin){
                    this.weixinPay(res.body.data)
                }else{
                    this.$dialog.toast({mes: '暂时只支持微信支付'})
                    return
                }
            }).catch(err => {
                this.$dialog.toast({mes: err.body.msg})

                if (err.body.msg == '订单已付款')
                    setTimeout(this.goSuccess(), 1000)
                else
                    setTimeout("location.href='#/order/list?index=1", 2000)
            })
        },

        goSuccess() {
            this.$router.replace(`/order/detail/success?orderNum=${this.orderNum}`)
        },

        // 微信支付接口配置
        weixinPay (data) {
            let self = this

            function onBridgeReady(){
                WeixinJSBridge.invoke(
                    'getBrandWCPayRequest',
                    data,
                    // {
                    //     "timeStamp": "1501232700",
                    //     "package": "prepay_id=wx201707281704580e429008a20276086579",
                    //     "paySign": "E78236DC2D0BC42E3BFBEB7642F22855",
                    //     "appId": "wxda3d8252ef356117",
                    //     "signType": "MD5",
                    //     "nonceStr": "1501232700250"
                    // },
                    res => {
                        if (res.err_msg == 'get_brand_wcpay_request:ok') {
                            // 支付成功
                            self.$dialog.toast({mes: '支付成功'})
                            setTimeout(self.goSuccess(), 1000)
                        } else if (res.err_msg == 'get_brand_wcpay_request:fail') {
                            self.$dialog.toast({mes: '支付失败'})
                            setTimeout("location.href='#/order/list?index=1'", 2000)
                        } else if (res.err_msg == 'get_brand_wcpay_request:cancel') {
                            self.$dialog.toast({mes: '请继续付款，未完成付款，订单将关闭！'})
                            setTimeout("location.href='#/order/list?index=1'", 2000)
                        } else {
                            setTimeout("location.href='#/order/list?index=0'", 2000)
                        }
                    }
                )
            }

            if (typeof WeixinJSBridge == "undefined"){
                if( document.addEventListener ){
                    document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false)
                }else if (document.attachEvent){
                    document.attachEvent('WeixinJSBridgeReady', onBridgeReady)
                    document.attachEvent('onWeixinJSBridgeReady', onBridgeReady)
                }
            } else {
                onBridgeReady()
            }
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
.order-msg
    padding: .2rem .75rem 0 0
    p 
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
// 支付弹框
.codePop
    width: 10.18rem
    margin-left: 32%
    margin-top: -2rem
    z-index: 100000
    text-align: center
    color: #333
    h3
        height: 1.9rem
        line-height: 1.9rem
        font-size: .75rem
        position: relative
        i 
            position: absolute
            left: .25rem
            top: 0
            font-size: .65rem
            display: inline-block
            width: 2rem
    p 
        height: 3.73rem
        line-height: 3.73rem
        font-size: 1.3rem
        color: #000
    .payMethod
        height: 1.68rem
        line-height: 1.68rem
        padding: 0 .75rem
        i 
            font-size: .7rem
    button
        margin: .6rem auto .6rem
        border: none
        height: 1.45rem
        line-height: 1.45rem
        width: 9.18rem
        display: blcok
        background: #00C99D
        color: #fff
        border-radius: .3rem
</style>
<style lang="sass">
#confirm .vm-flexview
    background: #fff
#confirm .vm-scrollview
    height: 30rem
#confirm .vm-tabbar 
    position: fixed
    bottom: 0
    &:after
        border-top: none
// 支付弹框边框圆角
#confirm .vm-popup-center
    border-radius: .5rem
</style>