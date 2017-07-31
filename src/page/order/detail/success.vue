<template>
    <vm-layout id="orderSuccess">
        <!-- 头部 -->
        <div class="header border-bottom">
            <i class="iconfont icon-duigou"></i>
            <div class="header-right">
                <h3>订单预订成功</h3>
                <span>请务必在约定时间到达集合地点</span>
            </div>
        </div>

        <!-- title -->
        <div class="title border-bottom">订单详情</div>

        <!-- 列表 -->
        <p>订单号：{{init.order_num}}</p>
        <p>{{init.view_line_name}}</p>
        <p>路线：{{init.view_line_content}}</p>
        <p>出发时间：{{init.visit_date}}&nbsp;{{init.visit_time}}</p>
        <p>导游:{{init.real_name}}</p>
        <p>联系方式：{{init.phone_num}}</p>
        <!-- <p>集合地点：天安门广场</p> -->
        <p>预订人：{{init.contact_name}}</p>
        <p>联系电话：{{init.contact_phone}}</p>
        <p>预定人数：{{init.person_num}}人</p>
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
        this.config.title('预订成功')
        this.fetchData()
    },

    methods: {
        // 获取订单信息
        fetchData(){
            this.$http.get(`/user/order/detail?orderNum=${this.orderNum}`)
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