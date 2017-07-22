<template>
    <div id="home">
        <!-- 搜索框 -->
        <form action="" class="search center-center">
            <i v-if="!name" class="iconfont icon-search-in"></i>
            <input type="search" v-model="name" placeholder='搜索'>
        </form>

        <!-- 热门景点 -->
        <div class="hot-point">
            <h3 class="border-bottom">热门景点</h3>
            <ul class="cf">
                <li class="fl">
                    <img src="" alt="">
                    <p>颐和园</p>
                    <span></span>
                </li>
                <!-- 以下重复 -->
                <li class="fl">
                    <img src="" alt="">
                    <p>颐和园</p>
                    <span></span>
                </li>
                <li class="fl">
                    <img src="" alt="">
                    <p>颐和园</p>
                    <span></span>
                </li>
                <li class="fl">
                    <img src="" alt="">
                    <p>颐和园</p>
                    <span></span>
                </li>
                <li class="fl">
                    <img src="" alt="">
                    <p>颐和园</p>
                    <span></span>
                </li>
            </ul>
        </div>

        <!-- 按字母分类 -->
        <ul class="item-box">
            <li class="item">
                <h3 class="border-top">G</h3>
                <p class="border-top">故宫</p>
            </li>
            <!-- 以下重复 -->
            <li class="item">
                <h3 class="border-top">G</h3>
                <p class="border-top">故宫</p>
            </li>
            <li class="item">
                <h3 class="border-top">G</h3>
                <p class="border-top">故宫</p>
            </li>
            <li class="item">
                <h3 class="border-top">G</h3>
                <p class="border-top">故宫</p>
            </li>
            <li class="item">
                <h3 class="border-top">G</h3>
                <p class="border-top">故宫</p>
            </li>
        </ul>

        <!-- 右边条字母 -->
        <ul class="nav">
            <i class="iconfont icon-search-in"></i>
            <li>A</li>
            <li>B</li>
            <li>C</li>
            <li>D</li>
            <li>E</li>
            <li>F</li>
            <li>G</li>
            <li>H</li>
            <li>I</li>
            <li>J</li>
            <li>K</li>
        </ul>
    </div>
</template>

<script>
export default {
    name: 'home',

    data () {
        return {
            config: vm.config,             // 配置
            name: '',                      // 输入景点名称

        }
    },
 
    created () {
        this.config.title('我的')
        // this.fetchInfo()
    },

    methods: {
        fetchInfo() {
            this.$http.post('/user/info')
            .then(rst => {
                
            })
            .catch(err => {
                this.$vux.toast.show({
                    text: err.body.msg,
                    type: 'text'
                })
            })
        },

        a(){
            this.$dialog.toast({mes: 'aaaa'})
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
            background: green
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
    position: absolute
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