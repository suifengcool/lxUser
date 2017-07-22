<template>
    <vm-layout id="user">
        <!-- 头部 -->
        <div class="header">
            <h3>{{name}}</h3>
            <i class="iconfont icon-write"></i>
            <input @change="upload($event)" type="file" accept="image/*" id="bUploadBtn" ref="input">
        </div>

        <!-- 列表 -->
        <div class="list">
            <router-link to="/order/list" class="border-bottom cf">
                <i class="iconfont icon-icon-2 fl"></i>
                <p class="fl">我的订单</p>
                <i class="iconfont icon-right fr"></i>
            </router-link>
            <router-link to="/user/collect" class="border-bottom cf">
                <i class="iconfont icon-shoucang1 fl"></i>
                <p class="fl">我的收藏</p>
                <i class="iconfont icon-right fr"></i>
            </router-link>
            <router-link to="/user/support" class="border-bottom cf">
                <i class="iconfont icon-wenhao fl"></i>
                <p class="fl">帮助支持</p>
                <i class="iconfont icon-right fr"></i>
            </router-link>
        </div>
    </vm-layout>
</template>

<script>
export default {
    name: 'user',

    data () {
        return {
            config: vm.config,         // 配置
            name: '',                  // 昵称
            headImg: '',               // 头像
        }
    },

    created () {
        this.config.title('我的')
        this.fetchInfo()
    },

    methods: {
        // 获取用户信息
        fetchInfo() {
            this.$http.get('/user/info?oid=test1234')
            .then(rst => {
                this.name = rst.body.data.nick_name
                this.headImg = rst.body.data.resource_path
                document.querySelector('.header').style.backgroundImage = `url(${this.headImg ? rst.body.prefix + this.headImg: require('../../assets/bg-home1.jpg')})`
            })
            .catch(err => this.$dialog.toast({mes: err.body.msg}))
        },

        // 上传头像
        upload(event){
            var formData = new FormData()
                formData.append("file", event.target.files[0])
                formData.append("remotePath", '/agent')
                formData.append("oid", 'test1234')
            this.$http.post('/upload/uploadFile',formData)
            .then(rst => {
                if(rst.body.res_code === 200){
                    // this.save(rst.body.data.path)
                }
            })
            .catch(err => this.$dialog.toast({mes: err.body.msg}))
        },
    }
}
</script>

<style scoped lang="sass">
// 头部
.header
    padding-top: 10rem
    background-size: cover
    position: relative
    h3
        height: 2.5rem
        line-height: 2.5rem
        font-size: 1.10rem
        color: #fff
        padding-left: .75rem
    i,input  
        position: absolute
        right: 1rem
        bottom: -.75rem
        display: inline-block
        height: 2rem
        line-height: 2rem
        text-align: center
        width: 2rem
    i 
        background: #03ca9d
        border-radius: 50%
        font-size: 1.1rem
        color: #fff
    input
        opacity: 0
        border: none
        outline: none
// 列表
.list 
    margin-top: .8rem
    a 
        padding: 0 .75rem
        height: 2.25rem
        line-height: 2.25rem
        font-size: .75rem
        display: block
        p 
            margin-left: .75rem
</style>
<style lang="sass">
.user
</style>