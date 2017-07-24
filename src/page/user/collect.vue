<template>
    <vm-layout id="collect">
        <vm-infinitescroll :on-infinite="fetchData" class="goodsList">
            <ul slot="list">
                <li v-for="(item, index) in lists" class="border-bottom">
                    <div class="msg">
                        <vm-lazyimg
                            class="img"
                            :src="imgOrigin + item.resource_path"
                            :defaultSrc="require('../../assets/lazyDefault.png')"
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
                </li>
            </ul>
        </vm-infinitescroll>
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
        }
    },

    created () {
        this.config.title('收藏')
        this.fetchData()
    },

    methods: {
        fetchData () {
            this.$http.get(`/user/favorite/list?pageNo=${this.page}&pageSize=${this.pageSize}`)
            .then(res => {
                res.body = {
                    "msg": "success",
                    "data": {
                        "totalRow": 1,//总条数
                        "pageNumber": 1,//当前第几页
                        "lastPage": true,//是否最后一页
                        "firstPage": true,//是否为最后一页
                        "totalPage": 1,//总页数
                        "pageSize": 10,//每页行数
                        "list": [
                            {
                                "id": 1,//收藏ID
                                "real_name": "矮子好",//导游姓名
                                "score": 5,//导游评分
                                "introduce": "专业导游30年",//导游介绍
                                "user_id": 10,//导游ID
                                "resource_path": '201707/16/201707161619588485.JPG',//导游头像地址
                            }
                        ]
                    },
                    "prefix": "http://r.361web.net/lx/",
                    "res_code": 200
                }
                const _list = res.body.data.list
                this.lists = [...this.lists, ..._list]
                this.imgOrigin = res.body.prefix
                this.count = res.body.data.totalRow

                if (this.page && (_list.length < this.pageSize || Math.floor(this.count / this.pageSize) == this.page)) {
                    // 所有数据加载完毕
                    window.$vm.$emit('vmui.infinitescroll.loadedAll')
                    return
                }

                // 单次请求数据完毕
                window.$vm.$emit('vmui.infinitescroll.loadedOnce')

                this.page ++
            })
            .catch(err => this.$dialog.toast({mes: err.errMsg}))
        },
    }
}
</script>

<style scoped lang="sass">
ul li 
    padding: .75rem
    font-size: .6rem
    color: #979797
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
                color: #333
                margin: .4rem 0 .8rem 0
            p 
                height: .85rem
                line-height: .85rem
    .desc
        line-height: .75rem
        margin-top: .35rem
</style>