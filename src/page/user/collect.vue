<template>
    <vm-layout id="collect">
        <ul>
            <li class="border-bottom">
                <div class="msg">
                    <div class="img"></div>
                    <div class="msg-main">
                        <h3>导游：艾子豪</h3>
                        <p>旅行时长：2小时</p>
                        <p>擅长内容：古建筑 胡同游 书画展</p>
                    </div>
                </div>
                <div class="desc">
                    导游简介：北京土著，从小生活在北京，对老北京有特殊的情感。
                </div>  
            </li>
        </ul>
    </vm-layout>
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
ul li 
    padding: .75rem
    font-size: .6rem
    color: #979797
    .msg  
        display: flex
        .img    
            height: 4rem
            width: 4rem
            border-radius: 50%
            background: #ccc
            margin-right: .75rem
        .msg-main
            flex: 1
            h3
                height: .9rem
                line-height: .9rem
                font-weight: 300
                font-size: .75rem
                color: #333
                margin: .4rem 0 .8rem 0
            p 
                height: .85rem
                line-height: .85rem
    .desc
        line-height: .75rem
        margin-top: .35rem
</style>