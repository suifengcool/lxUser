<template>
    <div class="home">
        首页--景点

        <!-- 公用底部 -->
        <wx-footer></wx-footer>
    </div>
</template>

<script>
import WxFooter from '../../components/WxFooter'
import { Cell, Group } from 'vux'
export default {
    name: 'home',

    data () {
        return {
            config: vm.config,             // 配置
            info: {},                      // 数据
            headImg: ''                    // 头像
        }
    },

    components: {
        WxFooter,
        Group,
        Cell
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
        }
    }
}
</script>

<style scoped lang="sass">

</style>
<style lang="sass">
.home 
</style>