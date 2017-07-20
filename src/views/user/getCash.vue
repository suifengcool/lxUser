<template>
    
</template>

<script>

export default {
    name: 'userMoney',

    data () {
        return {
            config: vm.config,        // 配置
            deposit: null,            // 冻结金额
            total: null,              // 余额
        }
    },

    created () {
        this.config.title('余额')
        this.fetchInfo()
    },

    methods: {
        // 获取用户信息
        fetchInfo(){
            this.$http.get('/user/account/info')
            .then(rst => {
                this.total = rst.body && rst.body.data && rst.body.data.total_amount
                this.deposit = rst.body && rst.body.data && rst.body.data.deposit_amount
            })
            .catch(err => {
                this.$vux.toast.show({
                    text: err.body.msg,
                    type: 'text'
                })
            })
        },

        // 收支明细
        goDetail(){
            this.$router.push('/user/detail')
        }
    }
}
</script>

<style scoped lang="sass">
.userMoney
    ul 
        li 
            height: 45px
            line-height: 45px
            padding: 0 15px 
            display: flex
            justify-content: space-between
            color: #333
            font-size: 14px
        i 
            font-style: normal
            color: #979797
    h3
        margin: 20px 0 10px
        font-weight: 300
        padding: 0 15px
        font-size: 14px
    p 
        padding: 0 15px
        line-height: 26px
        font-size: 13px
</style>