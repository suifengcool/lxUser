<template>
    <div class="collect">
        我的收藏
    </div>
</template>

<script>

export default {
    name: 'collect',

    data () {
        return {
            config: vm.config,
        }
    },

    created () {
        this.config.title('收藏')
        // this.fetchData()
    },

    methods: {
        fetchData(){
            this.$http.get(`/user/account/log?pageNo=${this.pageNo}`)
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