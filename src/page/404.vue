<template>
    <div class="notfound">
        <div class="content">
            <img src="../assets/404.png">
            <p>玩脱了，页面找不到了(o?□?)o</p>
            <p>{{second}}秒后，将自动跳转到首页</p>
            <router-link to="/">
                返回首页
            </router-link>
        </div>
    </div>
</template>

<script>

export default {
    name: 'notfound',

    data () {
        return {
            second: 5
        }
    },

    mounted () {
        this.interval()
    },

    methods: {
        // 倒计时
        interval () {
            let countDown = setInterval(() => {
                if(this.second-- == 1){
                    clearInterval(countDown);
                    vm.$router.push('/')
                }
            }, 1000);
        }
    }
}
</script>

<style scoped lang="sass">
.content
    text-align: center
    background: #fff
    font-size: .8rem
img
    padding-top: 2.5rem
    width: 100%
p
    color: #999
    margin: .5rem 0
a
    display: inline-block
    width: 9rem
    line-height: 1.75rem
    border: 1px solid #09c375
    background: #0EDF87
    color: #fff
    border-radius: .25rem
    -webkit-border-radius: .25rem
    margin-top: .8rem
</style>
