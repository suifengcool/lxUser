<template>
    <vm-layout id="collect">
        <vm-infinitescroll :on-infinite="fetchData" class="goodsList">
            <ul slot="list">
                <li v-for="(item, index) in lists" class="border-bottom">
                    <div class="msg">
                        <vm-lazyimg
                            class="img"
                            :src="imgOrigin + item.resource_path"
                            :defaultSrc="require('../../assets/lazyDefault.jpg')"
                        />
                        <div class="msg-main">
                            <h3>导游：{{item.real_name}}</h3>
                            <p>旅行时长：2小时</p>
                            <p>擅长内容：古建筑 胡同游 书画展</p>
                        </div>
                    </div>
                    <div class="desc">
                        导游简介：{{item.introduce}}
                    </div> 
                    <div class="cancel" @click="cancel(item.id)">取消收藏</div> 
                </li>
            </ul>
        </vm-infinitescroll>

        <!-- 空态 -->
        <dummyStatus v-if="!count" :text="text"></dummyStatus>

        <!-- backtop -->
        <backTop content='.vm-scrollview'></backTop>
    </vm-layout>
</template>

<script>
export default {
    name: 'collect',

    data () {
        return {
            config: vm.config,             // 配置
            page: 0,                       // 分页，第几页
            pageSize: 10,                  // 分页，每页数量
            count: 10,                     // 分页，总条数
            lists: [],                     // 列表
            imgOrigin: '',                 // 图片前缀
            text: '暂时还没有收藏哦~'
        }
    },

    created () {
        this.config.title('收藏')
        this.fetchData()
    },

    methods: {
        fetchData () {
            vm.fetch.get({
                url: '/user/favorite/list',
                data: {
                    pageNo: this.page,
                    pageSize: this.pageSize
                }
            })
            .then(res => {
                const _list = res.data.list
                this.lists = [...this.lists, ..._list]
                this.imgOrigin = res.prefix
                this.count = res.data.totalRow
                console.log('this.count:',this.count)

                if (this.page && (_list.length < this.pageSize || Math.floor(this.count / this.pageSize) == this.page)) {
                    // 所有数据加载完毕
                    window.$vm.$emit('vmui.infinitescroll.loadedAll')
                    return
                }

                // 单次请求数据完毕
                window.$vm.$emit('vmui.infinitescroll.loadedOnce')

                this.page ++
            })
            .catch(err => this.$dialog.toast({mes: err.msg}))
        },

        // 取消收藏
        cancel(id){
            vm.fetch.post({
                url: '/user/favorite/cancel',
                data: {
                    favoriteId: id
                }
            })
            .then(res => {
                if(res.res_code === 200){
                    this.$dialog.toast({mes: '取消收藏成功'})
                    this.page = 0
                    this.pageSize = 10
                    this.fetchData()
                }else{
                    this.$dialog.toast({mes: res.msg})
                }
            })
            .catch(err => {this.$dialog.toast({mes: err.msg})})
        }
    }
}
</script>

<style scoped lang="sass">
ul li 
    padding: .75rem
    font-size: .6rem
    color: #666
    background: #fff
    position: relative
    .msg  
        display: flex
        .img    
            height: 4rem
            width: 4rem
            border-radius: 50%
            background: #ccc
            margin-right: .75rem
            overflow: hidden
        .msg-main
            flex: 1
            h3
                height: .9rem
                line-height: .9rem
                font-weight: 300
                font-size: .75rem
                color: #000
                margin: .4rem 0 .8rem 0
            p 
                height: .85rem
                line-height: .85rem
    .desc
        line-height: .75rem
        margin-top: .35rem
    .cancel
        position: absolute
        right: .15rem
        top: .15rem
        height: 1rem
        line-height: 1rem
        padding: 0 .25rem
        background: rgba(0, 0, 0, 0.25)
        text-align: right
        font-size: .6rem
        color: #fff
</style>
<style lang="sass">
// .vm-flexview
//     height: 100% !important
</style>