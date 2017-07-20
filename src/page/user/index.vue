<template>
    <div class="user">
        我的
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