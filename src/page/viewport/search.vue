<template>
    <vm-layout id="home">
        <!-- 搜索框 -->
        <form class="search center-center" @submit.prevent="search">
            <i v-if="!name" class="iconfont icon-search-in"></i>
            <input type="search" v-model="name" name="keyword" placeholder='搜索'>
            <span v-if="name" @click="search" class="searchbar-cancel">确认</span>
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

        <!-- 空态 -->
        <dummyStatus v-if="!count" :text="text"></dummyStatus>
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
            count: 1,
            text: '未找到相关景点，换个词试试~',

        }
    },
 
    created () {
        this.config.title('景点')
        this.fetchViews()
    },

    methods: {
        // 获取数据
        fetchViews() {
            if(this.keyWord && this.keyWord.trim()){
                this.$http.post('/view/search',{
                    keyWord: this.keyWord.trim()
                })
                .then(res => {
                    this.name = this.keyWord
                    if(this.isEmptyObject(res.body.data)){
                        this.count = 0
                    }else{
                        this.lists = res.body.data
                        this.count = 1
                    }
                })
                .catch(err => this.$dialog.toast({mes: err.body.msg}))
            }else{
                vm.fetch.get({
                    url: '/view/index',
                })
                .then(res => {
                    this.lists = res.data.list
                })
                .catch(err => this.$dialog.toast({mes: err.body.msg}))
            }
        },

        // 查看景点明细
        goViewDetail(id){
            this.$router.push('/viewport/detail?id=' + id)
        },

        search(){
            this.keyWord = this.name
            this.lists = []
            this.fetchViews()
        },

        isEmptyObject(e) {  
            var t;  
            for (t in e)  
                return !1;  
            return !0  
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
        top: 50%
        transform: translateY(-50%)
        color: #888
    .searchbar-cancel
        width: 9.6%
        border: none
        height: 2rem
        line-height: 2rem
        text-align: center
        margin-left: .5rem
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