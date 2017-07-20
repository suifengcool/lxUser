<template>
    <div class="support">
        帮助与支持
    </div>
</template>

<script>
export default {
    name: 'support',

    data () {
        return {
            config: vm.config,                               // 配置
        }
    },

    components: {
    },

    created () {
        this.config.title('帮助与支持')
    },

    methods: {
        
    }
}
</script>

<style scoped lang="sass">

</style>
<style lang="sass">
.support
</style>