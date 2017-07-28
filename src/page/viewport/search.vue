<template>
    <vm-layout id="home">
        <!-- 搜索框 -->
        <form action="" method="get" class="search center-center" @submit.prevent="search">
            <i v-if="!name" class="iconfont icon-search-in"></i>
            <input type="search" v-model="name" name="keyword" placeholder='搜索'>
        </form>

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

    </vm-layout>
</template>

<script>
export default {
    name: 'home',

    data () {
        return {
            config: vm.config,             // 配置
            lists: [],                     // 景点列表
            name: '',                      // 搜索框内容
            keyWord: this.$route.query.keyword,

        }
    },
 
    created () {
        this.config.title('景点')
        this.fetchViews()
    },

    methods: {
        // 获取数据
        fetchViews() {
            if(this.keyWord && this.keyWord.trim() || this.name.trim()){
                this.$http.post('/view/search',{
                    keyWord: this.keyWord.trim()
                })
                .then(res => {
                    this.name = this.keyWord
                    this.lists = res.body.data
                })
                .catch(err => this.$dialog.toast({mes: err.msg}))
            }else{
                vm.fetch.get({
                    url: '/view/index',
                })
                .then(res => {
                    this.lists = res.data.list
                })
                .catch(err => this.$dialog.toast({mes: err.msg}))
            }
        },

        // 查看景点明细
        goViewDetail(id){
            this.$router.push('/viewport/detail?id=' + id)
        },

        search(){
            this.fetchViews()
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
        height: 1.4rem
        border-radius: .2rem
        border: none
        background: #fff
        padding: 0 1.25rem
        text-align: center
    i 
        position: absolute
        left: 40%
        color: #888
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
</style>
<style lang="sass">
.vm-flexview
    background: #fff
</style>