<template>
    <div id="identify" class="identify">
        <!-- 列表 -->
        <ul>
            <li class="border-bottom">
                <span>真实姓名：</span>
                <input type="text" placeholder="请输入与身份证相符的真实姓名" v-model.trim="name" maxlength="6">
            </li>
            <li class="border-bottom">
                <span>性&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;别：</span>
                <label for="radio1" :class="{'active': sex == 0}">男</label>
                <input type="radio" name="sexStyle" value="0" id="radio1" v-model="sex">
                <label for="radio2" :class="{'active': sex == 1}">女</label>
                <input type="radio" name="sexStyle" value="1" id="radio2" v-model="sex">
            </li>
            <li class="border-bottom">
                <span>身份证号：</span>
                <input type="text" placeholder="请输入证件号" v-model.trim="idCard" maxlength="18">
            </li>
            <datetime 
                class = "border-bottom"
                title = "生&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;日：" 
                v-model = "birthday"
                :min-year = 1949
                placeholder = "请输入生日日期"
            ></datetime>
            <li class="border-bottom">
                <span>联系方式：</span>
                <input type="tel" placeholder="请输入手机号" v-model.trim="tel" maxlength="11">
                <i ref="i" @click="sendCode" :class="{on: codeText == '发送验证码', on2: codeText == '重新获取'}">{{codeText}}</i>
            </li>
            <li class="border-bottom">
                <span>验&nbsp;&nbsp;证&nbsp;&nbsp;码：</span>
                <input type="text" placeholder="请输入验证码" v-model.trim="authCode" maxlength="4">
            </li>
        </ul>

        <!-- 图片上传区域 -->
        <div class="pic-box">
            <div class="pic-id1 pic">
                <i class="iconfont icon-plus_fuzhi"></i>
                <p>请上传身份证正面</p>
                <img v-if="idCardShow1" :src="idCardShow1" alt="">
                <input @change="upload($event)" class="" type="file" accept="image/*" id="bUploadBtn1" ref="input">
            </div>
            <div class="pic-id2 pic">
                <i class="iconfont icon-plus_fuzhi"></i>
                <p>请上传身份证正面</p>
                <img v-if="idCardShow2" :src="idCardShow2" alt="">
                <input @change="upload($event)" class="" type="file" accept="image/*" id="bUploadBtn2" ref="input">
            </div>
        </div>
        <div class="pic-id3 pic">
            <i class="iconfont icon-plus_fuzhi"></i>
            <p>请上传导游证正面</p>
            <img v-if="idCardShow3" :src="idCardShow3" alt="">
            <input @change="upload($event)" class="" type="file" accept="image/*" id="bUploadBtn3" ref="input">
        </div>

        <button type="button" @click="confirm">提交审核</button>
    </div>
</template>

<script>
import { Datetime } from 'vux'
export default {
    name: 'identify',

    data () {
        return {
            config: vm.config,                      // 配置
            sex: null,                              // 性别
            name: '',                               // 姓名
            idCard: '',                             // 身份证
            tel: null,                              // 电话号码
            birthday: '',                           // 生日
            authCode: null,                         // 验证码
            codeText: '发送验证码',                   // 按钮文字
            isClicked: false,                       // 是否已点击按钮
            idCardShow1: '',                        // 身份证正面(显示用)
            frontImg: '',                           // 身份证正面
            idCardShow2: '',                        // 身份证反面(显示用)
            backImg: '',                            // 身份证反面
            idCardShow3: '',                        // 导游证(显示用)
            guideCardImg: '',                       // 导游证
        }
    },

    components: {
        Datetime
    },

    created () {
        this.config.title('完善真实身份')
    },

    methods: {
        // vux基础上封装toast
        toast(mes){
            this.$vux.toast.show({
                text: mes,
                type: 'text'
            })
        },

        // 发送验证码
        sendCode() {
            if(!this.tel || !(/^1(3|4|5|7|8)\d{9}$/.test(this.tel))){
                this.toast('请填写正确的手机号码')
                return
            }

            if(!this.isClicked){
                this.isClicked = true
                this.$http.get(`/user/code?mobile=${this.tel}`)
                .then(rst => {
                    this.countDown()
                })
                .catch(err => {
                    this.$vux.toast.show({
                        text: err.body.msg,
                        type: 'text'
                    })
                })
            }
        },

         // 倒计时
        countDown () {
            let time = 60
            let timer = setInterval(() => {
                time --
                this.codeText = "重新获取(" + time + "')"
                if(!time) {
                    clearInterval(timer)
                    this.codeText = "重新获取"
                    this.isClicked = false
                }
            }, 1000)
        },

        // 上传图片(身份证正面)
        // uploadBase64(upfile,callback){
        //     var reader = new FileReader()
        //     reader.onload = (evt)=>{
        //         var imgData = evt.target.result
        //         var data = {}
        //         data.oid= 'test1234'
        //         data.img = imgData
        //         data.remotePath = '/agent'
        //         data.filename = upfile.name
        //         data.mimetype = upfile.type
        //         this.$vux.loading.show({
        //             text: '图片上传中...'
        //         })
        //         this.$http.post('/upload/uploadFile',data).then((rst) => {
        //             if(rst.body.res_code === 200){
        //                 this.toast('图片上传成功')
        //                 this.$vux.loading.hide()
        //                 callback(rst)
        //             }else{
        //                 this.$vux.toast.show({
        //                     // text: '上传头像失败',
        //                     text: rst.body.msg,
        //                     type: 'text'
        //                 })
        //             }
        //         },(err) => {
                    
        //         })
        //     }
        //     reader.readAsDataURL(upfile)
        // },
        // upload(event){
        //     if(!event.target.value) return
        //     this.uploadBase64(event.target.files[0],(rst)=>{
        //         this.idCardShow1 = rst.body.prefix + rst.body.data.path
        //         this.frontImg = rst.body.data.path
        //     })
        // },

        upload(event){
            var formData = new FormData()

            formData.append("file", event.target.files[0])
            formData.append("remotePath", '/agent')
            // formData.append("oid", 'oa6D7w9xOJXGlZ8wVt_RG9AwCDp4')

            this.$vux.loading.show({
                text: '头像上传中...'
            })
            this.$http.post('/upload/uploadFile',formData)
            .then((rst) => {
                this.$vux.loading.hide()
                if(rst.body.res_code === 200){
                    if(event.srcElement.id === 'bUploadBtn1'){
                        this.idCardShow1 = rst.body.prefix + rst.body.data.path
                        this.frontImg = rst.body.data.path
                    }else if(event.srcElement.id === 'bUploadBtn2'){
                        this.idCardShow2 = rst.body.prefix + rst.body.data.path
                        this.backImg = rst.body.data.path
                    }else{
                        this.idCardShow3 = rst.body.prefix + rst.body.data.path
                        this.guideCardImg = rst.body.data.path
                    }
                }else{
                    this.$vux.toast.show({
                        text: rst.body.msg,
                        type: 'text'
                    })
                }
            })
            .catch(err => {
                this.$vux.loading.hide()
                this.$vux.toast.show({
                    text: err.body.msg,
                    type: 'text'
                })
            })
        },

        // 审核
        confirm() {
            if(!this.name){
                this.toast('请填写真实姓名')
                return
            }
            if(!this.idCard || (!/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(this.idCard))){
                this.toast('请填写身份证号')
                return
            }
            if(!this.tel || !(/^1(3|4|5|7|8)\d{9}$/.test(this.tel))){
                this.toast('请填写手机号码')
                return
            }
            if(!this.authCode){
                this.toast('请填写手机验证码')
                return
            }
            if(!this.frontImg){
                this.toast('请上传身份证正面照片')
                return
            }
            if(!this.backImg){
                this.toast('请上传身份证反面照片')
                return
            }
            if(!this.guideCardImg){
                this.toast('请上传导游证照片')
                return
            }
            this.$vux.loading.show({
                text: '提交中...'
            })
            this.$http.post('/guide/user/toReview',{
                // oid:'oa6D7w9xOJXGlZ8wVt_RG9AwCDp4',
                cardNum: this.idCard,
                phone: this.tel,
                birthday: this.birthday,
                gender: this.sex,
                frontImg: this.frontImg,
                backImg: this.backImg,
                guideCardImg: this.guideCardImg,
                realName: this.name,
                code: this.authCode
            })
            .then(rst => {
                this.$vux.loading.hide()
                if(rst.body.res_code === 200){
                    this.toast('身份信息已提交审核，请稍候查看')
                    this.$router.push('/info')
                }else{
                    this.toast(rst.body.msg)
                }
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
.identify
    padding-bottom: 20px
.identify
    ul 
        li 
            display: flex
            height: 58px
            line-height: 58px
            font-size: 14px
            position: relative
            span
                margin-left: 16px
                display: inline-block
                width: 80px
                color: #333
            input 
                flex: 1
                border: none
                outline: none
            #radio1,#radio2
                margin: 21px 0
                height: 30%
                flex: .2
            label
                font-size: 14px
            .active
                color: #03ca9d
            .on , .on2
                background: #03ca9d
            i 
                display: inline-block
                position: absolute
                right: 15px
                top: 50%
                transform: translateY(-50%)
                height: 28px
                line-height: 28px
                color: #fff 
                text-align: center
                background: #ccc
                border-radius: 100px
                font-style: normal
                padding: 0px 10px
    .pic-box
        padding: 30px 15px 24px 15px
        display: flex
        justify-content: space-between
        .pic-id1,.pic-id2
            width: 45%
            height: 120px
            padding: 0
            position: relative
        img,input
            width: 100%
            height: 100%
            position: absolute
            left: 0
            top: 0
        img 
            z-index: 1
            height: auto
        input
            z-index: 2
            opacity: 0
            border: none
            outline: none
    .pic-id3
        width: 265px
        height: 100px
        margin: 0 auto
        position: relative
        margin-bottom: 50px
        img,input
            width: 100%
            height: 100%
            position: absolute
            left: 0
            top: 0
        img 
            z-index: 1
            height: auto
        input
            z-index: 2
            opacity: 0
            border: none
            outline: none
    .pic
        border: 1px dashed #dedede
        display: flex
        flex-direction: column
        justify-content: center
        text-align: center
        box-sizing: border-box
        overflow: hidden
        i 
            color: #03ca9d
            font-size: 24px
        p 
            color: #999
            font-size: 12px
button
    width: 202px
    height: 44px
    line-height: 44px
    text-align: center
    color: #fff
    background: #03ca9d
    display: block 
    margin: 0 auto
    border: none
    border-radius: 4px
</style>
<style lang="sass">
.identify .weui-cell:before
    border: none
.identify .weui-cell
    padding: 16px 15px
.identify .weui-cell
    font-size: 14px
.identify .weui-cell__ft
    text-align: left
    padding-left: 7px
</style>