<template>
    <vm-layout id="commmentList">
        <ul>
            <Li>
                <h3 class="border-bottom">2017年6月</h3>
                <div class="msg border-bottom">
                    <div class="img"></div>
                    <div class="main">
                        <h4>艾子豪</h4>
                        <div class="star-box"></div>
                        <p>服务热情，讲解专业，本地土著</p>
                    </div>
                </div>
            </Li>
        </ul>
    </vm-layout>
</template>

<script>
export default {
    name: 'commmentList',

    data () {
        return {
            config: vm.config,            // 配置
        }
    },

    components: {
        
    },

    created () {
        this.config.title('全部评价')
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
ul li 
    h3
        height: 2.1rem
        line-height: 2.1rem
        font-size: .9rem
        color: #000
        padding-left: 1.07rem
        position: relative
        font-weight: 300
        &:before
            position: absolute
            left: .68rem
            top: 50%
            transform: translateY(-50%)
            content: ''
            display: inline-block
            width: .13rem
            height: .9rem
            background: #00C99D
    .msg
        padding: .56rem 0 .56rem .89rem
        display: flex
        .img
            width: 3.18rem
            height: 3.18rem
            border-radius: 50%
            background: red
            margin-right: 1.04rem
        .main
            flex: 1
            h4
                font-size: .75rem
                height: 1.05rem
                line-height: 1.05rem
                margin: .1rem 0 .16rem 0

</style>
<style lang="sass">
.vm-flexview
    background: #fff
</style>