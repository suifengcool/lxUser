<template>
    <div class="auth">
        <div id="auth">
            <img src="../assets/images/auth.png">
            <p>{{err}}</p>
            <a href="javascript:;">
                <h3>去官网了解更多<i>></i></h3>
            </a>
        </div>
    </div>
</template>

<script>

export default {
    name: 'auth',

    data() {
        return{
            config: vm.config,                                                    // 配置
            err: vm.$route.query.errMsg ? vm.$route.query.errMsg : '还没有注册'
        }
    },

    created () {
        vm.config.title('未授权')
    }
}
</script>

<style scoped lang="sass">
#auth
    margin: 6.35rem auto 0
    width: 6.75rem
    text-align: center
    font-size: .65rem
    img
        width: 6.25rem
        margin-left: .5rem
    p 
        font-family: PingFangSC-Regular
        color: #979797
        text-align: center
        margin: 1rem 0 1.25rem 0
    h3
        width: 6.75rem
        height: 1.9rem
        line-height: 1.9rem
        background: url('../assets/images/auth-border.png')
        background-size: cover
        color: #D0212F
        font-weight: 300
        i 
            vertical-align: 3%
</style>