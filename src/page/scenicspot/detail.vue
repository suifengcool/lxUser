<template>
    <div class="scenicspotDetail">
        景点详情页
    </div>
</template>

<script>
export default {
    name: 'user',

    data () {
        return {
            config: vm.config,                               // 配置
        }
    },

    components: {
    },

    created () {
        this.config.title('出发')
    },

    methods: {
        
    }
}
</script>

<style scoped lang="sass">

</style>
<style lang="sass">
.scenicspotDetail
</style>