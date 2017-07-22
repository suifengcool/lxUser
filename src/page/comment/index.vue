<template>
    <vm-layout id="comment">
        <!-- 头部 -->
        <div class="header">
            <div class="msg">
                <div class="img"></div>
                <div class="msg-main">
                    <h3>导游：艾子豪</h3>
                    <div class="star-box cf">
                        <span class="fl star">
                            <i
                                class="iconfont icon-star-full"
                                v-for="(star, i) in [0,1,2,3,4]"
                            ></i>
                        </span>
                        <span class="score fl">5.0</span>
                        <span class="num fl">45单</span>
                    </div>
                    <p>旅行时长：2小时</p>
                    <p>擅长内容：古建筑 胡同游 书画展</p>
                </div>
            </div>
            <div class="desc">
                导游简介：北京土著，从小生活在北京，对老北京有特殊的情感。
            </div> 
        </div> 

        <!-- 评价 -->
        <div class="content">
            <h3>匿名评价导游</h3>
            <p class="star">
                <i
                    class="iconfont icon-star-full"
                    v-for="(star, i) in [0,1,2,3,4]"
                ></i>
            </p>
            <textarea placeholder="请输入对该导游的评价~"></textarea>
        </div>

        <!-- 按钮 -->
        <button type="button">提交</button>
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
        this.config.title('已完成订单')
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
    padding: .99rem 0 0 .79rem
    .msg  
        display: flex
        .img    
            height: 4.38rem
            width: 4.38rem
            border-radius: 50%
            background: #ccc
            margin-right: .81rem
        .msg-main
            flex: 1
            h3
                height: .9rem
                line-height: .9rem
                font-weight: 300
                font-size: .75rem
                color: #333
                margin: .4rem 0 .5rem 0
            .star-box
                height: .65rem
                line-height: .65rem
                font-size: .55rem
                margin: .15rem 0 .45rem 0
                .star
                    i 
                        font-size: .6rem
                        color: #FF9500
                        margin-right: .1rem
                .score
                    width: 1.27rem
                    height: .6rem
                    line-height: .6rem
                    background: #FF9500
                    color: #fff
                    text-align: center
                    font-size: .55rem
                    margin: 0 .69rem 0 .1rem
                .num
                    color: #000
            p 
                height: .85rem
                line-height: .85rem
                font-size: .6rem
    .desc
        line-height: .75rem
        margin-top: .6rem
        font-size: .6rem
// 评价区域
.content
    margin-top: 1.45rem
    text-align: center
    color: #979797
    h3
        height: .83rem
        line-height: .83rem
        font-size: .6rem
        color: #333
        text-align: center
        position: relative
        font-weight: 300
        &:before,&:after
            content: ''
            display: inline-block
            position: absolute
            top: 50%
            transform: translateY(-50%)
            height: 1px 
            transform: scaleY(.5)
            background: #dedede
            width: 4.5rem
        &:after
            right: 15%
        &:before
            left: 15%
    p   
        margin: 1rem 0 .85rem 0
        height: 2rem
        line-height: 2rem
        i 
            font-size: 1.98rem
    textarea
        width: 11.75rem
        height: 7.45rem
        border-color: #dedede
        padding: .5rem
        box-sizing: border-box
        font-size: .65rem
// 按钮
button
    width: 8.37rem
    height: 1.9rem
    line-height: 1.9rem
    display: block
    margin: .73rem auto 
    color: #fff
    border: none
    border-radius: .2rem
    background: #03ca9d
</style>
<style lang="sass">
.vm-flexview
    background: #fff
</style>