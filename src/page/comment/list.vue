<template>
    <vm-layout id="commmentList">
        <vm-infinitescroll :on-infinite="fetchData" class="orderList">
            <ul slot="list">
                <Li v-for="(item, index) in lists">
                    <h3 class="border-bottom">2017年6月</h3>
                    <div class="msg border-bottom">
                        <div class="img"></div>
                        <div class="main">
                            <h4>{{item.nick_name}}</h4>
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
                            <p>{{item.COMMENT}}</p>
                        </div>
                    </div>
                </Li>
            </ul>
        </vm-infinitescroll>
    </vm-layout>
</template>

<script>
export default {
    name: 'commmentList',

    data () {
        return {
            config: vm.config,                         // 配置
            imgOrigin: '',                             // 图片前缀
            page: 0,                                   // 分页
            pageSize: 10,                              // 分页
            lists: [],                                 // 列表
            count: null,                               // 总条数
            guideId: this.$route.query.guideId,        // 导游id
        }
    },

    components: {
        
    },

    created () {
        this.config.title('全部评价')
        this.init()
    },
    
    methods: {
        // 初始化
        init () {
            this.page = 0
            this.pageSize = 10
            this.lists = []
            this.fetchData()
        },

        fetchData () {
            vm.fetch.post({
                url: '/user/comment/list',
                data: {
                    pageNo: this.page,
                    pageSize: this.pageSize,
                    guideId: this.guideId
                }
            })
            .then(res => {
                const _list = res.data.list
                this.imgOrigin = res.prefix
                this.lists = [...this.lists, ..._list]
                this.count = res.data.totalRow
                if (_list.length < this.pageSize || Math.floor(this.count / this.pageSize) == this.page) {
                    // 所有数据加载完毕
                    setTimeout(()=> {
                        window.$vm.$emit('vmui.infinitescroll.loadedAll')
                    })
                    return
                }

                // 单次请求数据完毕
                window.$vm.$emit('vmui.infinitescroll.loadedOnce')

                this.page ++
            })
            .catch(err => {this.$dialog.toast({mes: err.msg})})
        },
    }
}
</script>

<style scoped lang="sass">
ul li 
    h3
        height: 2.1rem
        line-height: 2.1rem
        font-size: .9rem
        color: #000
        padding-left: 1.07rem
        position: relative
        font-weight: 300
        &:before
            position: absolute
            left: .68rem
            top: 50%
            transform: translateY(-50%)
            content: ''
            display: inline-block
            width: .13rem
            height: .9rem
            background: #00C99D
    .msg
        padding: .56rem 0 .56rem .89rem
        display: flex
        .img
            width: 3.18rem
            height: 3.18rem
            border-radius: 50%
            background: red
            margin-right: 1.04rem
        .main
            flex: 1
            h4
                font-size: .75rem
                height: 1.05rem
                line-height: 1.05rem
                margin: .1rem 0 .16rem 0
                font-weight: 300
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
                font-size: .6rem
</style>
<style lang="sass">
.vm-flexview
    background: #fff
</style>