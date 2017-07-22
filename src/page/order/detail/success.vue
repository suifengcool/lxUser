<template>
    <vm-layout id="orderSuccess">
        <!-- 头部 -->
        <div class="header border-bottom">
            <i class="iconfont icon-duigou"></i>
            <div class="header-right">
                <h3>订单预定成功</h3>
                <span>请务必在约定时间到达集合地点</span>
            </div>
        </div>

        <!-- title -->
        <div class="title border-bottom">订单详情</div>

        <!-- 列表 -->
        <p>订单号：20170606110523</p>
        <p>故宫城墙一日游</p>
        <p>路线：从故宫正门出发，沿着XX到正阳门，沿途</p>
        <p>带您领略不一样的故宫建筑文化...</p>
        <p>出发时间：</p>
        <p>导游：张泉灵</p>
        <p>联系方式：13428888888</p>
        <p>集合地点：天安门广场</p>
        <p>预订人：5人</p>
        <p>联系电话：1342xxxxxxx</p>
        <p>预定人数：5人</p>
    </vm-layout>
</template>

<script>
export default {
    name: 'orderSuccess',

    data () {
        return {
            config: vm.config,                        // 配置
            orderNum: this.$route.query.orderNum,     // 订单号
            init: {}                                  // 数据
        }
    },

    created () {
        this.config.title('预定成功')
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
.header
    padding: .65rem
    display: flex
    i 
        font-size: 2.83rem
        color: #03ca9d
        margin-right: .8rem 
    .header-right
        flex: 1
        h3
            font-weight: 300
            font-size: .9rem
            color: #000
            height: 1.25rem
            line-height: 1.25rem
            margin: .25rem 0 .37rem 0
        span
            height: 1.05rem
            line-height: 1.05rem
            color: #979797
            display: inline-block
.title
    height: 40px
    line-height: 40px
    padding-left: 24px
    font-size: 18px
    color: #000
    position: relative
    margin-bottom: .45rem
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