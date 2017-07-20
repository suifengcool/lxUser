<template>
    <div id="info" class="info">
        <!-- banner -->
        <div class="banner">
            <img :src="headImg ? headImg: require('../../assets/images/defaultPhoto.png')" alt="">
            <h3>{{init.real_name}}
                <i v-if="gender==0" class="iconfont icon-xingbienan"></i>
                <i v-else class="iconfont icon-xingbienv"></i>
            </h3>
        </div>

        <!-- 身份信息 -->
        <div class="id-mes">
            <h3 class="mes-h3">身份信息</h3>
            <ul>
                <li class="border-bottom">
                    <i class="iconfont icon-wode"></i>
                    真实姓名&nbsp;：{{init.real_name || '许刚'}}
                </li>
                <li class="border-bottom">
                    <i class="iconfont icon-headimg"></i>
                    身份证号&nbsp;：{{init.card_num || '429006198908161166'}}
                </li>
                <li class="border-bottom">
                    <i class="iconfont icon-xingzhuang"></i>
                    联系电话&nbsp;：{{init.phone_num || '13797071376'}}
                </li>
            </ul>
        </div>

        <!-- 认证信息 -->
        <h3 class="mes-h3">认证信息</h3>
        <div class="pic-box">
            <div class="pic-id1 pic">
                <img :src="card_front_img ? card_front_img: require('../../assets/images/defaultPhoto.png')" alt="">
            </div>
            <div class="pic-id2 pic">
                <img :src="card_back_img ? card_back_img: require('../../assets/images/defaultPhoto.png')" alt="">
            </div>
        </div>
        <div class="pic-id3 pic">
            <img :src="guide_img ? guide_img: require('../../assets/images/defaultPhoto.png')" alt="">
        </div>
    </div>
</template>

<script>
import { Tabbar, TabbarItem} from 'vux'

export default {
    name: 'info',

    data () {
        return {
            config: vm.config,                      // 配置
            init: '',                               // 数据
            headImg: '',                            // 头像
            card_front_img: '',                     // 身份证正面
            card_back_img: '',                      // 身份证反面
            guide_img: '',                          // 导游证
            gender: 0,                              // 性别 0，男 1，女
        }
    },
    
    components: {
        Tabbar,
        TabbarItem
    },

    created () {
        this.config.title('个人信息')
        this.fetchInfo()
    },

    methods: {
        // 获取用户信息
        fetchInfo(){
            this.$http.get('/guide/user/info')
            .then(rst => {
                this.status = rst.body && rst.body.data && rst.body.data.guide_status
                this.gender = rst.body && rst.body.data && rst.body.data.gender
                this.init = rst.body && rst.body.data
                if(rst.body && rst.body.data && rst.body.data.resource_path){
                    this.headImg = (rst.body.data.resource_path.indexOf('http') > -1 ? '': rst.body.prefix) + rst.body.data.resource_path
                    this.card_front_img = (rst.body.data.card_front_img.indexOf('http') > -1 ? '': rst.body.prefix) + rst.body.data.card_front_img
                    this.card_back_img = (rst.body.data.card_back_img.indexOf('http') > -1 ? '': rst.body.prefix) + rst.body.data.card_back_img
                    this.guide_img = (rst.body.data.guide_img.indexOf('http') > -1 ? '': rst.body.prefix) + rst.body.data.guide_img
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
.banner
    height: auto
    min-height: 200px
    background: #ccc
    text-align: center
    img
        display: inline
        width: 92px
        height: 92px
        border-radius: 50%
        border: 3px solid #7a7473
        margin: 28px 0 10px
    h3
        font-size: normal
        color: #fff
        font-size: 18px
        i 
            color: #fff
            margin-left: 8px
.mes-h3
    height: 30px
    line-height: 30px
    font-size: 18px
    color: #333
    text-align: center
    position: relative
    margin-top: 20px
    font-weight: 300
    &:before,&:after
        content: ''
        display: inline-block
        position: absolute
        top: 50%
        transform: translateY(-50%)
        height: 1px 
        background: #898989
        width: 25px
    &:after
        right: 30%
    &:before
        left: 30%
.id-mes
    ul>li 
        color: #666
        font-size: 16px
        height: 45px
        line-height: 45px
        i 
            margin: 0 12px 0 22px 
            color: #666
        .icon-xingzhuang
            color: #979797
            font-size: 18px
        .icon-wode
            font-size: 20px

.pic-box
    padding: 30px 15px 24px 15px
    display: flex
    justify-content: space-between
    .pic-id1,.pic-id2
        width: 45%
        height: 120px
        padding: 0
        position: relative
    img
        width: 100%
        height: 100%
        position: absolute
        left: 0
        top: 0 
        z-index: 1
        height: auto
.pic-id3
    width: 265px
    height: 100px
    margin: 0 auto
    position: relative
    margin-bottom: 50px
    img
        width: 100%
        height: 100%
        position: absolute
        left: 0
        top: 0
        z-index: 1
        height: auto
.pic
    border: 1px solid #dedede
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
</style>