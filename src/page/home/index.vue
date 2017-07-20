<template>
    <div class="home">
        <div @click="a">首页--景点</div>
    </div>
</template>

<script>
export default {
    name: 'home',

    data () {
        return {
            config: vm.config,             // 配置
            info: {},                      // 数据
            headImg: ''                    // 头像
        }
    },
 
    created () {
        this.config.title('我的')
        // this.fetchInfo()
    },

    methods: {
        fetchInfo() {
            this.$http.post('/guide/login')
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

</style>
<style lang="sass">
.home 
</style>