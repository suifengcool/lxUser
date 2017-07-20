<template>
    <div id="confirm" class="confirm">
        <!-- 头部 -->
        <div class="header border-bottom">
            <img src="../../assets/images/confirm.png" alt="">
            <div class="header-main">
                <div class="header-main-top">
                    <span>{{['待确认','已确认'][init.book_status - 1]}}</span>
                    <i>倒计时：10：00</i>
                </div>
                <p>导游正在查看您的订单信息，核实没问题后，接受订单即刻出发旅行</p>
            </div>
        </div>

        <!-- 行程信息 -->
        <div class="travel-title border-bottom item">行程信息</div>
        <div class="desc-travel border-bottom">
            <p class="title">{{init.view_spot_id}}</p>
            <p class="line">路线：{{init.view_line_content}}</p>
            <p class="time">出发时间：{{init.visit_date}}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{init.visit_time}}</p>
            <p class="num">人数：{{init.person_num}}人</p>
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
        </div>

        <!-- 按钮 -->
        <tabbar>
            <tabbar-item v-if="init.status && init.status==1"><span slot="label" @click="confirm">确认订单</span></tabbar-item>
            <tabbar-item v-else-if="init.status && init.status==2"><span slot="label" @click="cancel">取消订单</span></tabbar-item>
        </tabbar>
    </div>
</template>

<script>
import { Tabbar, TabbarItem} from 'vux'
export default {
    name: 'confirm',

    data () {
        return {
            config: vm.config,                        // 配置
            orderNum: this.$route.query.orderNum,     // 订单号
            init: {}                                  // 数据
        }
    },

    components: {
        Tabbar,
        TabbarItem
    },

    created () {
        this.config.title('订单号：'+ this.orderNum)
        this.fetchData()
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

        // 确认订单
        confirm() {
            this.$http.get(`/guide/order/confirm?orderNum=${this.orderNum}`)
            .then((rst) => {
                if(rst.body && rst.body.res_code === 200){
                    this.$vux.toast.show({
                        text: '订单确认成功',
                        type: 'text'
                    })
                    this.$router.push('#/order?status=2')
                }
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
.confirm
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
    .desc-travel
        font-size: 14px
        color: #333
        padding: 10px 24px 8px
        p 
            line-height: 24px
        .time
            margin-top: 24px 
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
</style>
<style lang="sass">
.confirm .vux-tabbar-simple .weui-tabbar__label
    background: #03ca9d
    color: #fff 
    font-size: 14px
.confirm .vux-tabbar-simple .weui-tabbar__label
    width: 93.3%
    margin: 0 auto
    border-radius: 6px
    height: 35px
    line-height: 35px
.confirm .weui-tabbar__item.vux-tabbar-simple
    background: #fff
.confirm .weui-tabbar:before
    border: none
</style>