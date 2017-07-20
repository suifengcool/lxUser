<template>
    <div>订单详情页</div>
</template>

<script>

export default {
    name: 'orderList',

    data () {
        return {
            config: vm.config,            // 配置
        }
    },

    components: {
        
    },

    created () {
        this.config.title('订单号:20170606')
        // this.fetchList()
    },
    
    methods: {
        fetchList() {
            this.$http.get(`/guide/order/list?pageNo=${this.pageNo}&status=${this.status}&pageSize=${this.pageSize}`)
            .then(rst => {
                
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

</style>