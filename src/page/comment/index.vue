<template>
    <div class="commment">
        评论页
    </div>
</template>

<script>

export default {
    name: 'commment',

    data () {
        return {
            config: vm.config,            // 配置
        }
    },

    components: {
        
    },

    created () {
        this.config.title('已完成订单')
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
.commment
</style>