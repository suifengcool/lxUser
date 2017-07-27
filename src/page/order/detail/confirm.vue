<template>
    <vm-layout id="confirm">
        <!-- 头部 -->
        <div class="header border-bottom">
            <img src="../../../assets/confirm.png" alt="">
            <div class="header-main">
                <div class="header-main-top">
                    <span>待确认</span>
                    <i>倒计时：{{minute}}{{second}}</i>
                </div>
                <p>导游正在查看您的订单信息，核实没问题后，接受订单即刻出发旅行</p>
            </div>
        </div>

        <!-- 行程&导游信息 -->
        <div class="travel-title border-bottom item">{{init.view_line_name}}</div>
        <div class="guide border-bottom">
            <div class="img">
                <!-- <img :src="(init.resource_path).indexOf('http')>-1 ? init.resource_path : imgOrigin + init.resource_path" alt=""> -->
                <img :src="init.resource_path" alt="">
            </div>
            <div class="guide-desc">
                <h3 class="cf">
                    <span class="fl">导游：</span>
                    <span class="fr">{{init.real_name}}</span>
                </h3>
                <p class="cf">
                    <span class="fl">联系方式：</span>
                    <span class="fr">{{init.phone_num}}</span>
                </p>
                <p class="cf">
                    <span class="fl">游览地址：</span>
                    <span class="fr">{{init.view_spot_id}}</span>
                </p>
            </div>
        </div>

        <!-- 交易信息 -->
        <div class="travel-title border-bottom item">交易信息</div>
        <div class="desc-change border-bottom">
            <p>
                <span>导游费：</span>
                <i>￥{{init.amount}}</i>
            </p>
            <p>
                <span>预订人：</span>
                <i>{{init.contact_name}}</i>
            </p>
            <p>
                <span>预订人电话：</span>
                <i>{{init.contact_phone}}</i>
            </p>
            <p>
                <span>预订人数：</span>
                <i>{{init.person_num}}人</i>
            </p>
        </div>

        <!-- 底部按钮 -->
        <vm-tabbar slot="tabbar" class="tabbar-box">
            <button class="tabbar-item" type="button" @click="cancel">取消订单</button>
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
            imgOrigin: '',                            // 图片前缀
            totolTime: 600,
            day:'',
            hour:'',
            minute:'',
            second:''
        }
    },

    created () {
        this.fetchData()
        this.config.title('订单号：'+ this.orderNum)
        this.countdowm(this.totolTime)
    },

    methods: {
        // 获取订单信息
        fetchData(){
            this.$http.get(`/user/order/detail?oid=test1234&orderNum=${this.orderNum}`)
            .then(res => {
                if(res.body.res_code === 200){
                    this.imgOrigin = res.body.prefix 
                    this.init = res.body.data
                }else{
                    this.$dialog.toast({mes: res.body.msg})
                }
            })
            .catch(err => this.$dialog.toast({mes: err.body.msg}))
        },

        // 取消订单
        cancel() {
            this.$http.get(`/user/order/cancel?oid=test1234&orderNum=${this.orderNum}`)
            .then(res => {
                if(res.body.res_code === 200){
                    this.$dialog.toast({
                        mes: '订单取消成功',
                        timeout: 1500,
                        callback: () => {
                            this.$router.replace('/order/list')
                        }
                    })
                }else{
                    this.$dialog.toast({mes: res.body.msg})
                }
                
            })
            .catch(err => this.$dialog.toast({mes: err.body.msg}))
        },

        countdowm (value){
            let timer = setInterval(()=>{
               
                var days=0,hours=0,minutes=0,seconds=0; //时间默认值
                if(value > 0){
                    days = Math.floor(value / (60 * 60 * 24))
                    hours = Math.floor(value / (60 * 60)) - (days * 24)
                    minutes = Math.floor(value / 60) - (days * 24 * 60) - (hours * 60)
                    seconds = Math.floor(value) - (days * 24 * 60 * 60) - (hours * 60 * 60) - (minutes* 60)
                }
                if (minutes <= 9) minutes = '0' + minutes
                if (seconds <= 9) seconds = '0' + seconds

                this.day=days+'天'
                this.hour=hours+'时'
                this.minute = minutes+ ':'
                this.second = seconds
                value --

            }, 1000)
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
        overflow: hidden
        margin-right: .64rem
        img 
            width: 100%
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