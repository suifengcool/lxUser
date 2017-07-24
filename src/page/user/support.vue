<template>
    <vm-layout id="support">
        <div class="item cf border-bottom">
            <h3 class="fl">客服电话</h3>
            <a class="tel fr">{{mobile}}<i class="iconfont icon-right"></i></a>
        </div>
    </vm-layout>
</template>

<script>
export default {
    name: 'support',

    data () {
        return {
            config: vm.config,                  // 配置
            mobile: 13797071376                 // 电话
        }
    },

    created () {
        this.config.title('帮助支持')
        $('.tel').attr('href','tel:'+this.mobile)
    },

    methods: {
        
    }
}
</script>

<style scoped lang="sass">
.item
    height: 3.2rem
    line-height: 3.2rem
    padding: 0 .75rem
    h3 
        font-weight: 300
        font-size: .75rem
    i 
        font-size: .65rem
        margin-left: .3rem
</style>
<style lang="sass">
.vm-flexview
    background: #fff
</style>