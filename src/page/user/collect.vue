<template>
    <vm-layout id="collect">
        <vm-infinitescroll :on-infinite="fetchData" class="goodsList">
            <ul slot="list">
                <li v-for="(item, index) in lists" class="border-bottom">
                    <div class="msg">
                        <!-- <vm-lazyimg
                            class="img"
                            :src="item.resource_path && (item.resource_path).indexOf('http')>-1?item.resource_path:imgOrigin+item.resource_path"
                            :defaultSrc="require('../../assets/lazyDefault.jpg')"
                        /> -->
                        <vm-clip
                            :src="item.resource_path  && (item.resource_path).indexOf('http')>-1?item.resource_path:imgOrigin+item.resource_path"
                            :defaultSrc="require('../../assets/lazyDefault.jpg')"
                            scale="cover"
                            width="4rem"
                            height="4rem"
                            class="img"
                        ></vm-clip>
                        <div class="msg-main">
                            <h3>导游：{{item.real_name}}</h3>
                            <!-- <p>旅行时长：2小时</p> -->
                            <p>评分：{{item.score && (item.score).toString().length >1 ? item.score : item.score + '.0'}}分</p>
                            <i
                                :class="['iconfont', {'red': item.score > i}, Math.round(item.score) > i ? 'icon-xing2' : 'icon-xing1',]"
                                v-for="(star, i) in [0,1,2,3,4]"
                            ></i>
                            <!-- <p>擅长内容：古建筑 胡同游 书画展</p> -->
                        </div>
                    </div>
                    <div class="desc">
                        导游简介：{{item.introduce || '专业导游~'}}
                    </div> 
                    <div class="cancel" @click="cancel(item.id)">取消收藏</div> 
                </li>
            </ul>
        </vm-infinitescroll>

        <!-- 空态 -->
        <dummyStatus v-if="!count" :text="text"></dummyStatus>
    </vm-layout>
</template>

<script>
export default {
    name: 'collect',

    data () {
        return {
            config: vm.config,             // 配置
            page: 1,                       // 分页，第几页
            pageSize: 10,                  // 分页，每页数量
            count: 10,                     // 分页，总条数
            lists: [],                     // 列表
            imgOrigin: '',                 // 图片前缀
            loadOnce: false,               // 单次请求完毕
            lastPage: false,               // 是否为最后一页
            text: '暂时还没有收藏哦~'
        }
    },

    created () {
        this.config.title('收藏')
        this.fetchData()
    },

    methods: {
        fetchData () {
            if(!this.loadOnce && !this.lastPage){
                this.loadOnce = true
                this.$http.get(`/user/favorite/list?pageNo=${this.page}&pageSize=${this.pageSize}`)
                .then(res => {
                    const _list = res.body.data.list
                    this.lists = [...this.lists, ..._list]
                    this.imgOrigin = res.body.prefix
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
                .catch(err => this.$dialog.toast({mes: err.body.msg}))
            }
        },

        // 取消收藏
        cancel(id){
            this.$http.post('/user/favorite/cancel',{favoriteId: id})
            .then(res => {
                if(res.body.res_code === 200){
                    this.$dialog.toast({mes: '取消收藏成功'})
                    this.loadOnce = false
                    this.lastPage = false
                    this.page = 0
                    this.pageSize = 10
                    this.lists = []
                    this.fetchData()
                }else{
                    this.$dialog.toast({mes: res.body.msg})
                }
            })
            .catch(err => {this.$dialog.toast({mes: err.body.msg})})
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
                margin: .75rem 0 .6rem 0
            p 
                height: .85rem
                line-height: .85rem
                margin-bottom: .15rem
            .red
                color: #FF9500
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