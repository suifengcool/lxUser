<template>
    <div id="rules" class="rules">
        <h3>成为导游标准与审核细则</h3>
        <h3>如何成为导游</h3>
        <p>1.完成导游身份认证：认证链接</p>
        <p>2.发布导游路线：路线链接</p>
        <p>3.导游认证通过后，发布线路并通过审核，导游可以接受游客预订。</p>
        <h3>如何接受订单</h3>
        <p>1.游客下订单后，导游根据自己的时间安排，选择是否接单。</p>
        <p>2.接单后请按照订单中规定的时间完成导游服务，该笔订单完成</p>
    </div>
</template>

<script>
export default {
    name: 'rules',

    data () {
        return {
            config: vm.config,         // 配置
        }
    },

    created() {
        this.config.title('完善导游信息')
    }
}
</script>

<style scoped lang="sass">
.rules
    color: #1b1b1b
    h3 
        text-align: center
        font-size: 15px
        margin: 23px 0 13px
    p 
        font-size: 12px
        padding: 0 15px
        margin-bottom: 10px
        text-indent: 2em
</style>