<template>
    <vm-layout id="commmentList">
        <vm-infinitescroll :on-infinite="fetchData" class="orderList">
            <ul slot="list">
                <Li v-for="(item, index) in lists">
                    <h3 class="border-bottom">{{item.create_time}}</h3>
                    <div class="msg border-bottom">
                        <div class="img">
                            <img :src="(item.avatar_img).indexOf('http') > -1 ? item.avatar_img : imgOrigin + item.avatar_img" alt="">
                        </div>
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
            loadOnce: false,                           // 单次请求完毕
            lastPage: false,                           // 是否为最后一页
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
            this.loadOnce = false
            this.lastPage = false
            this.page = 0
            this.pageSize = 10
            this.lists = []
            this.fetchData()
        },

        fetchData () {
            if(!this.loadOnce && !this.lastPage){
                this.loadOnce = true
                this.$http.post('/user/comment/list',{
                    pageNo: this.page,
                    pageSize: this.pageSize,
                    guideId: this.guideId
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
                .catch(err => {this.$dialog.toast({mes: err.body.msg})})
            }
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
            overflow: hidden
            margin-right: 1.04rem
            img 
                width: 100%
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