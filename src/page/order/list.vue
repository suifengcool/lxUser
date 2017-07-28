<template>
    <vm-layout id="orderList">
        <!-- tab -->
        <vm-tab :change.native="tabHandler" class="tab">
            <vm-tab-panel
                v-for="(item, index) in ['全部', '待付款', '待评价', '待出行' , '待确认']"
                :label="item"
                :active="status == index"
            >
                <!-- 分页 -->
                <vm-infinitescroll :on-infinite="fetchData" class="orderList" v-if="count">
                    <ul slot="list" class="list">
                        <li v-for="(item, index) in lists" class="border-bottom" @click="goDetail(item,index)">
                            <div class="item">
                                <div class="top cf">
                                    <h3 class="fl">{{item.view_line_name}}</h3>
                                    <span class="fr">{{['待确认','已取消','已取消','已取消','待付款','已取消','未出行','已完成','投诉待确认','已退款','待评价','已评价'][+item.book_status-1]}}</span>
                                </div>
                                <div class="main">
                                    <vm-lazyimg
                                        class="img"
                                        :src= "item.resource_path ? imgOrigin + item.resource_path : ''"
                                        :defaultSrc="require('../../assets/lazyDefault.jpg')"
                                    />
                                    <div class="desc">
                                        <h3>游览时间：{{item.visit_date}}</h3>
                                        <p>游客人数：{{item.person_num}}</p>
                                        <span>订单金额：￥{{item.amount}}</span>
                                    </div>
                                </div>
                            </div>
                        </li>
                    </ul>
                </vm-infinitescroll>
            </vm-tab-panel>
        </vm-tab>
        
        <!-- 空态 -->
        <dummyStatus v-if="!count" :text="text"></dummyStatus>
    </vm-layout>
</template>

<script>
export default {
    name: 'orderList',

    data () {
        return {
            config: vm.config,  // 配置
            page: 0,            // 分页
            pageSize: 10,       // 分页
            lists: [],          // 订单列表
            status: 0,          // 0：全部，1：待付款，2：待评价，3：未出行，4：待确认
            count: 1,           // 订单总条数
            text: '没有相关订单哦~',
            loadOnce: false,    // 单次请求完毕
            lastPage: false,    // 是否为最后一页
        }
    },

    filters: vm.$Filters,

    created () {
        this.config.title('订单')
        this.init()
    },

    methods: {
        // 初始化
        init () {
            this.loadOnce = false
            this.lastPage = false
            this.page = 1
            this.pageSize = 10
            this.lists = []
            this.status = this.$route.query.index ? this.$route.query.index : 0
            this.fetchData()
        },

        fetchData () {
            if(!this.loadOnce && !this.lastPage){
                this.loadOnce = true
                this.$http.post('/user/order/list',{
                    status: parseInt(this.status),
                    pageNo: this.page,
                    pageSize: this.pageSize,
                    oid: 'test1234'.toString()
                })
                .then(res => {
                    const _list = res.body.data.list
                    this.imgOrigin = res.body.prefix
                    this.lists = [...this.lists, ..._list]
                    this.count = res.body.data.totalRow
                    if(res.body && res.body.data && res.body.data.lastPage){
                        this.lastPage = true
                        setTimeout(()=> {
                            window.$vm.$emit('vmui.infinitescroll.loadedAll')
                        })
                        return
                    }else{
                        this.lastPage = false
                    }
                    this.loadOnce = false
                    
                    // 单次请求数据完毕
                    window.$vm.$emit('vmui.infinitescroll.loadedOnce')

                    this.page ++

                })
                .catch(err => {this.$dialog.toast({mes: err.body.msg})})}
        },

        // tab 切换回调
        tabHandler (label) {
            let index = ['全部', '待付款', '待评价', '待出行' ,'待确认'].indexOf(label)
            this.$router.replace(`/order/list?index=${index}`)
            this.status = index 
            this.init()
        },

        // 点击详情
        goDetail(item,index) {
            if(item.book_status === 1){
                this.$router.push(`/order/detail/confirm?orderNum=${item.order_num}`)
            }else if(item.book_status === 5){
                this.$router.push(`/order/detail/pay?orderNum=${item.order_num}`)
            }else if(item.book_status === 7){
                this.$router.push(`/order/detail/success?orderNum=${item.order_num}`)
            }else if(item.book_status === 11){
                this.$router.push(`/comment?orderNum=${item.order_num}`)
            }
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
            padding: .5rem
            border-radius: .3rem
            background: #fff
            .top
                height: 1.6rem
                line-height: 1.6rem
                margin-bottom: .25rem
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
#orderList .vm-tab-nav-item.vm-tab-active
    color: #03ca9d
</style>