<template>
    <vm-layout id="orderList">
        <!-- tab -->
        <vm-tab :change.native="tabHandler" class="tab">
            <vm-tab-panel
                v-for="(item, index) in ['全部', '已取消', '待评价', '待支付', '已评价']"
                :label="item"
                :active="status == index"
            >
            <ul class="list">
                <li class="border-bottom">
                    <div class="item">
                        <div class="top cf">
                            <h3 class="fl">故宫城墙一日游，让你见证不一样的历史...</h3>
                            <span class="fr">已取消</span>
                        </div>
                        <div class="main">
                            <div class="img"></div>
                            <div class="desc">
                                <h3>游览时间：2017年6月6日</h3>
                                <p>游客人数：3ren</p>
                                <span>订单金额：￥500</span>
                            </div>
                        </div>
                    </div>
                </li>
                <li>
                    <div class="item">
                        <div class="top cf">
                            <h3 class="fl">故宫城墙一日游，让你见证不一样的历史...</h3>
                            <span class="fr">已取消</span>
                        </div>
                        <div class="main">
                            <div class="img"></div>
                            <div class="desc">
                                <h3>游览时间：2017年6月6日</h3>
                                <p>游客人数：3ren</p>
                                <span>订单金额：￥500</span>
                            </div>
                        </div>
                    </div>
                </li>
                <li>
                    <div class="item">
                        <div class="top cf">
                            <h3 class="fl">故宫城墙一日游，让你见证不一样的历史...</h3>
                            <span class="fr">已取消</span>
                        </div>
                        <div class="main">
                            <div class="img"></div>
                            <div class="desc">
                                <h3>游览时间：2017年6月6日</h3>
                                <p>游客人数：3ren</p>
                                <span>订单金额：￥500</span>
                            </div>
                        </div>
                    </div>
                </li>
            </ul>

            </vm-tab-panel>
        </vm-tab>
    </vm-layout>
</template>

<script>
export default {
    name: 'orderList',

    data () {
        return {
            config: vm.config,                        // 配置
        }
    },

    created () {
        this.config.title('订单')
        // this.fetchData()
    },

    methods: {
        // 获取用户信息
        fetchData(){
            this.$http.get(`/guide/order/detail?orderNum=${this.orderNum}`)
            .then((rst) => {

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
// tab 样式重置
.vm-tab-panel-item
    padding: 2rem 0 0 0
// 列表
.list
    li 
        margin-top: .65rem
        background: #f3f3f3
        padding: 0 .2rem
        .item
            padding: 0 .5rem .4rem .2rem
            border-radius: .3rem
            background: #fff
            .top
                height: 1.3rem
                line-height: 1.3rem
                margin-bottom: .15rem
                h3
                    font-size: .65rem
                    color: #333
                    width: 80%
                    font-weight: 300
                span
            .main
                display: flex
                .img 
                    width: 7rem
                    height: 3.2rem
                    background: red
                    margin-right: .8rem
                .desc
                    flex: 1
                    h3
                        font-size: .7rem
                        color: #666
                        height: .85rem
                        line-height: .85rem
                        margin: .1rem 0 .5rem 0
                        font-weight: 300
                    p 
                        font-size: .6rem
                        color: #979797
                    span
                        font-size: .65rem
                        color: #979797
</style>
<style lang="sass">
#orderList
    .vm-tab-panel
        background: #f3f3f3
    .vm-tab-nav
        position: fixed
        width: 100%
        top: 0
        left: 0
        margin-bottom: .5rem
        z-index: 1
        &:after
            display: none
    .vm-tab-nav-item
        color: #7f7f7f
        &:before
            height: 1px
        &:after
            display: none
        &.vm-tab-active
            color: #D01C2B
</style>