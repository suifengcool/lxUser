<template>
    <div class="user">
        我的

        <!-- 公用底部 -->
        <wx-footer></wx-footer>
    </div>
</template>

<script>
import WxFooter from '../../components/WxFooter'
export default {
    name: 'user',

    data () {
        return {
            config: vm.config,                               // 配置
        }
    },

    components: {
        WxFooter
    },

    created () {
        this.config.title('我的')
    },

    methods: {
        
    }
}
</script>

<style scoped lang="sass">

</style>
<style lang="sass">
.user
</style>