<template>
    <vm-layout id="home">
        <!-- 搜索框 -->
        <form action="/viewport/search" method="get" class="search center-center">
            <i v-if="!name" class="iconfont icon-search-in"></i>
            <input type="search" v-model="name" name="keyword" placeholder='搜索'>
        </form>

        <!-- 热门景点 -->
        <div class="hot-point">
            <h3 class="border-bottom">热门景点</h3>
            <ul class="cf">
                <li v-for="(item, index) in hots" class="fl" @click="goViewDetail(item.id)">
                    <img :src="imgOrigin + item.resource_path" alt="">
                    <p>{{item.view_name}}</p>
                    <!-- <span></span> -->
                </li>
            </ul>
        </div>

        <!-- 按字母分类 -->
        <ul class="item-box">
            <li v-for="(item, index) in lists" class="item">
                <h3 class="border-top" :id="item[0].first_letter">
                    {{item[0].first_letter}}
                </h3>
                <p v-for="(ele, index) in item" 
                    class="border-top"
                    @click="goViewDetail(ele.view_spot_id)"
                >{{ele.view_name}}</p>
            </li>
        </ul>

        <!-- 右边条字母 -->
        <ul class="nav">
            <router-link to="/viewport/search"><i class="iconfont icon-search-in"></i></router-link>
            <li v-for="(item, index) in lists"><a :href="'#'+item[0].first_letter">{{item[0].first_letter}}</a></li>
        </ul>
    </vm-layout>
</template>

<script>
export default {
    name: 'home',

    data () {
        return {
            config: vm.config,             // 配置
            hots: [],                      // 热门景点
            lists: [],                     // 景点列表
            imgOrigin: '',                 // 图片前缀
            name: '',                      // 搜索框内容
            numChoosed: '',                // 被选中的字母
        }
    },
 
    created () {
        this.config.title('景点')
        this.fetchViews()
    },

    methods: {
        fetchViews() {
            vm.fetch.get({
                url: '/view/index',
            })
            .then(res => {
                this.imgOrigin = res.prefix 
                this.hots = res.data.hots
                this.lists = res.data.list
            })
            .catch(err => this.$dialog.toast({mes: err.msg}))
        },

        // 查看景点明细
        goViewDetail(id){
            this.$router.push('/viewport/detail?id=' + id)
        }
    }
}
</script>

<style scoped lang="sass">
#home
    position: relative
// search
.search
    background: #EBEBEE
    height: 2.25rem
    padding: 0 .5rem
    position: fixed
    width: 100%
    font-size: .7rem
    position: relative
    &:after
        display: none
    input
        flex: 1
        line-height: 1.4rem
        border-radius: .2rem
        border: none
        background: #fff
        padding: 0 1.25rem
        text-align: center
    i 
        position: absolute
        left: 41%
        color: #888
// 热门景点
.hot-point
    font-size: .8rem
    h3
        height: 1.75rem
        line-height: 1.75rem
        padding-left: 1.5rem
        font-size: .8rem
        font-weight: 300
        position: relative
        &:before
            content: ''
            position: absolute
            left: 1.1rem
            top: 50%
            transform: translateY(-50%)
            height: 1rem
            width: .1rem
            background: #03ca9d
            display: inline-block
    .cf li 
        width: 25%
        text-align: center
        padding: .85rem 0 .25rem 0
        img 
            width: 78%
            height: 2.1rem
            border-radius: .2rem
            display: inline
        p 
            height: 1.2rem
            line-height: 1.2rem
        span
            display: block
            height: .15rem
            width: .85rem
            margin: 0 auto
            background: #03ca9d
            margin-top: .15rem
// 字母列表
.item-box
    margin-top: .5rem 
    li 
        h3 
            height: 2rem
            line-height: 2rem
            padding-left: 1.5rem
            font-size: .8rem
            font-weight: 300
            position: relative
            &:before
                content: ''
                position: absolute
                left: 1.1rem
                top: 50%
                transform: translateY(-50%)
                height: 1rem
                width: .1rem
                background: #03ca9d
                display: inline-block
        p 
            height: 2rem
            line-height: 2rem
            padding-left: 1.1rem
// 右边条字母
.nav
    top: 50%
    transform: translateY(-50%)
    position: fixed
    right: 0
    width: 1rem
    text-align: center
    i 
        font-size: .5rem
        color: #888
    li
        height: .85rem
        line-height: .85rem
        font-size: .5rem
</style>
<style lang="sass">
.vm-flexview
    background: #fff
</style>