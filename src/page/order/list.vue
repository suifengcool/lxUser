<template>
    <div class="orderList">
        订单列表页
    </div>
</template>

<script>
export default {
    name: 'orderList',

    data () {
        return {
            config: vm.config,                        // 配置
        }
    },

    created () {
        this.config.title('订单')
        // this.fetchData()
    },

    methods: {
        // 获取用户信息
        fetchData(){
            this.$http.get(`/guide/order/detail?orderNum=${this.orderNum}`)
            .then((rst) => {

            })
            .catch(err => {
                this.$vux.toast.show({
                    text: err.body.msg,
                    type: 'text'
                })
            })
        }
    }
}
</script>

<style scoped lang="sass">

</style>
<style lang="sass">
// .orderList
</style>