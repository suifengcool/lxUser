<template>
    <vm-layout id="user">
        <!-- 头部 -->
        <div class="header">
            <h3>{{name}}</h3>
            <i class="iconfont icon-write"></i>
            <input @change="uploadFile($event, 'headImg')" class="" type="file" accept="image/*" id="bUploadBtn" ref="input">
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

        <!-- loading -->
        <div v-if='loading' class="loading">
            <img src="../../assets/loading.gif" alt="">
            <p>图片上传中...</p>
        </div>
    </vm-layout>
</template>

<script>
import LRZ from 'lrz'
export default {
    name: 'user',

    data () {
        return {
            config: vm.config,         // 配置
            name: '',                  // 昵称
            headImg: '',               // 头像
            loading: false             // loading
        }
    },

    created () {
        this.config.title('我的')
        this.fetchInfo()
    },

    methods: {
        // 获取用户信息
        fetchInfo() {
            vm.fetch.get({
                url: '/user/info',
            })
            .then(res => {
                this.name = res.data.nick_name
                this.headImg = res.data.resource_path
                document.querySelector('.header').style.backgroundImage = `url(${this.headImg && (this.headImg).indexOf('http') > -1 ? this.headImg :res.prefix + this.headImg})`
            })
            .catch(err => this.$dialog.toast({mes: err.msg}))
        },

        // 上传头像
        uploadFile (event, key) {
            let upload = (formData) => {
                
                this.$http.post('/upload/uploadFile',formData
                ).then((res)=> {
                    this[key] = res.body.data
                    this.save(res.body.data.path)
                })
            }
            this.loading = true
            // 图像处理：压缩、ios竖拍旋转90°bug
            LRZ(event.target.files[0], {quality: 0.5})
            .then((rst) => {
                // 处理成功会执行
                rst.formData.append("file", rst.file)
                rst.formData.append("remotePath", '/shop')

                upload(rst.formData)
            })
            .catch(function (err) {
                // 处理失败会执行
                let formData = new FormData()
                formData.append("file", event.target.files[0])
                formData.append("remotePath", '/shop')
                upload(formData)
            })
        },
        // 保存头像
        save(img) {
            this.$http.post('/user/setAvatar',{img: img})
            .then(rst => {
                if(rst.body.res_code === 200){
                    this.loading = false
                    this.headImg = rst.body.data.path
                    document.querySelector('.header').style.backgroundImage = `url(${rst.body.prefix + this.headImg})`
                    this.$dialog.toast({mes: '头像保存成功'})
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
// loading
.loading
    position: fixed
    left: 50%
    top: 36%
    transform: translate(-50%,0)
    text-align: center
    background: rgba(0,0,0,.5)
    color: #fff
    padding: .7rem 0
    width: 5rem
    img
        width: 19%
        display: inline
        margin-bottom: .3rem
</style>
<style lang="sass">
#user .vm-flexview
    background: #fff
</style>