<template>
    <vm-layout id="orderCreate">
        <!-- 头部 -->
        <div class="headerBox border-bottom">
            <!-- 轮播图 -->
            <div class="bannerBox">
                <div class="demo-small-pitch">
                    <vm-slider autoplay="3000" initIndex="0">
                        <vm-slider-item>
                            <div class="item">
                                <img :src="images[0].indexOf('http')>-1 ? images[0] : imgOrigin + images[0]" alt=""><span>{{index}}</span>
                            </div>
                        </vm-slider-item>
                        <vm-slider-item>
                            <div class="item">
                                <img :src="images[0].indexOf('http')>-1 ? images[1] : imgOrigin + images[1]" alt=""><span>{{index}}</span>
                            </div>
                        </vm-slider-item>
                        <vm-slider-item>
                            <div class="item">
                                <img :src="images[0].indexOf('http')>-1 ? images[2] : imgOrigin + images[2]" alt=""><span>{{index}}</span>
                            </div>
                        </vm-slider-item>
                    </vm-slider>
                </div>
            </div>

            <!-- 导游信息 -->
            <div class="daoyouInfo">
                <div class="imgBox">
                    <img :src="resource_path.indexOf('http') > -1 ? resource_path : (imgOrigin+ resource_path)" alt="">
                </div>
                <div class="textInfo">
                    <h3>旅游导游：{{real_name}}</h3>
                    <p>介绍：{{introduce}}</p>
                    <p>旅行时长：{{visit_length}}个小时</p>
                </div>
            </div>
        </div>

        <!-- 出游时间 -->
        <div class="captionTitle border-bottom">
           <i>|</i><span>出游时间</span>
        </div>
        <div class="startTimeBox border-bottom">
            <p class="timeTitle"><i class="iconfont icon-rl"></i><span>出发时间</span></p>
            <p class="timeDetail">2016年6月25日9:00AM</p>
        </div>

        <!-- 出游人数 -->
        <div class="captionTitle border-bottom">
            <i>|</i><span>出游人数</span>
        </div>
        <div class="chuyouNumBox border-bottom">
            <div class="selectTimeTitle"><i class="iconfont icon-wode"></i><span>选择出游人数</span></div>
            <div class="selectTime">
                <i class="iconfont icon-minus" @click="chooseCount(1)"></i>
                <span>{{personCount}}</span>
                <i class="iconfont icon-plus" @click="chooseCount()"></i>
            </div>
        </div>

        <!-- 出行人信息 -->
        <div class="captionTitle border-bottom">
            <i>|</i><span>出行人信息</span>
        </div>
        <div class="chuxingrenInfo border-bottom">
            <div class="nameInputBox">
                <label for="">姓&nbsp;&nbsp;&nbsp;名:</label>
                <input type="text" placeholder="请输入姓名" v-model.trim="contactName">
            </div>
            <div class="phoneInputBox">
                <div class="nameInputBox">
                    <label for="">电&nbsp;&nbsp;&nbsp;话:</label>
                    <input type="text" placeholder="请输入电话" v-model.trim="phone">
                </div>
                <button type="button" class="yzBtn" @click="sendCode">{{codeText}}</button>
            </div>
            <div class="yzInputBox">
                <label for="">验证码:</label>
                <input type="text" placeholder="请输入验证码" v-model.trim="code">
            </div>
        </div>
        
        <!-- 预订须知 -->
        <div class="captionTitle ydMustKnow border-bottom" v-on:click="needKnowHandle">
            <div class="yudingText"><i>|</i><span>预定须知</span></div>
            <a href="javascript:;">
                <i v-bind:class="['iconfont', isUp ? 'icon-icon-3' : 'icon-icon-1']"></i>
            </a>
        </div>
        <div class="knowContent border-bottom" v-show="nendKnowShow">
            <h3>退改规则:</h3>
            <p>1.该产品自然日支持取消。如需取消，请在公众号留言申请取消，工作人员会在第一时间联系您帮忙取消;</p>
            <p>2.提前48小时免费取消。48小时内，不可取消订单,不支持部分退;</p>        
            <p>3.如需改期，请申请取消后重新预订。</p>
        </div>

        <!-- 游客评论 -->
        <div class="captionTitle border-bottom">
            <i>|</i><span>游客评论</span>
        </div>
        <ul class="commantList border-bottom">
            <li>
                <div class="touristInfo">
                    <div class="pic"></div>
                    <span>zhangsan</span>
                </div>
                <p>景点知道的内容很多，文艺又清新，很赞！</p>
            </li>
        </ul>

        <!-- 评论,收藏 -->
        <div class="danzanBox">
            <div class="dianzanItem">
                <span class="plNum"><i class="iconfont icon-kefu"></i><label for="">24</label></span>
                <span class="dzNum"><i class="iconfont icon-shoucang"></i><label for="">23</label></span>
            </div>
            <a href="javascript:;" class="commitBtn">更多评论<i class="iconfont icon-jiantou1"></i></a>
        </div>

        <!-- 底部按钮 -->
        <vm-tabbar slot="tabbar" class="tabbar-box">
            <button class="tabbar-item" type="button" @click="create()">立即预定</button>
        </vm-tabbar>
    </vm-layout>
</template>

<script>
var dtCache = window.localStorage
var guideInfo = JSON.parse(dtCache.getItem('guideInfo'))
export default {
    name: 'user',
    data () {
        return {
            config: vm.config,                               // 配置
            codeText: '发送验证码',                            // 按钮文字
            isClicked: false,                                // 是否已点击按钮
            personCount: 1,                                  // 出行人数
            real_name: guideInfo.real_name,                  // 导游姓名
            introduce: guideInfo.introduce || '专业导游二十年', // 导游描述
            visit_length: guideInfo.visit_length,            // 旅行时长
            lineId: guideInfo.id,                            // 线路id
            images: guideInfo.images,                        // 景点图片(数组)
            imgOrigin: guideInfo.imgOrigin,                  // 图片前缀
            resource_path: guideInfo.resource_path,          // 导游照片
            contactName: '',                                 // 游客姓名
            phone: '',                                      // 游客电话
            code: '',                                        // 验证码
            nendKnowShow:false,
            isUp:false,
        }
    },
    created () {
        this.config.title('出发')
    },

    methods: {
        // 点击预定须知
        needKnowHandle(){
            this.nendKnowShow = !this.nendKnowShow;
            this.isUp=!this.isUp;
        },

        // 选择出游人数,传type是减少
        chooseCount(type){
            if(type){
                this.personCount --
                if(this.personCount <= 1){
                    this.personCount = 1
                }
            }else{
                this.personCount ++
            }
        },

        // 发送验证码
        sendCode() {
            if(!this.phone || !(/^1(3|4|5|7|8)\d{9}$/.test(this.phone))){
                this.$dialog.toast({mes: '请填写正确的手机号码'})
                return
            }
            if(!this.isClicked){
                this.isClicked = true
                vm.fetch.get({
                    url: `/user/code?mobile=${this.phone}`,
                })
                .then(res => {
                    this.countDown()
                })
                .catch(err => this.$dialog.toast({mes: err.msg}))
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

        // 生成订单
        create(){
            // if(!this.visitDate){
            //     this.$dialog.toast({mes: '请选择出行日期'})
            //     return
            // }
            // if(!this.visitTime){
            //     this.$dialog.toast({mes: '请选择出行日期'})
            //     return
            // }
            if(!this.phone || !(/^1(3|4|5|7|8)\d{9}$/.test(this.phone))){
                this.$dialog.toast({mes: '请输入正确的手机号码'})
                return
            }
            if(!this.contactName){
                this.$dialog.toast({mes: '请输入姓名'})
                return
            }
            if(!this.code){
                this.$dialog.toast({mes: '请输入验证码'})
                return
            }
            vm.fetch.post({
                url: '/user/order/save',
                data: {
                   lineId: this.lineId,
                   visitDate: '2017-10-12',
                   visitTime: '09:00',
                   contactName: this.contactName,
                   phone: this.phone,
                   personCount: this.personCount,
                   code: this.code 
                }
            }).then(res => {
                if(res.res_code === 200){
                    this.$dialog.toast({
                        mes: '预订成功',
                        timeout: 1500,
                        callback: () => {
                            this.$router.push('/order/success')
                        }
                    })
                }else{
                    this.$dialog.toast({mes: res.msg})
                }
            }).catch(err => this.$dialog.toast({mes: err.msg}))
        }
    }
}
</script>
<style lang="sass" scoped>
// 头部
.headerBox
    padding: 0.5rem 0.6rem 0.5rem 0.6rem
    // 轮播图
    .item 
        text-align: center
        background: #ccc
        height: 5.89rem
        position: relative
        img
            position: absolute
            top: 50%
            left: 0
            width: 100%
            transform: translateY(-50%)
        span 
            font-size: 5rem
            font-weight: 700
    // 导游信息
    .daoyouInfo
        display: flex
        margin-top: .5rem
        .imgBox
            height: 1.93rem
            width: 1.93rem
            img 
                width: 100%
        .textInfo
            flex: 1
            padding: 1.1rem 0 0 0.75rem
            h3
                font-size: 0.8rem
                font-weight: 300
                color: #000
            p
                font-size: .65rem
                color: #666
// 出游时间
.captionTitle
    height: 1.7rem
    line-height: 1.7rem
    font-size: 0.8rem
    padding: 0 0.6rem
    color: #333
    i 
        color: #00C99D
        margin-right: 0.27rem
.startTimeBox 
    padding: 0.75rem 0 0.8rem 0
    text-align: center
    .timeTitle
        text-align: center
        font-size: 0.7rem
        margin-bottom: .25rem
        i 
            vertical-align: 0%
            margin-right: 0.15rem
            font-size: 0.7rem
    .timeDetail
        color: #00CA9D
        font-size: 0.6rem
        text-align: center
// 出游人数
.chuyouNumBox
    display: flex
    justify-content: space-between
    height: 2.25rem
    line-height: 2.25rem
    .selectTimeTitle
        font-size: 0.65rem
        margin-left: .9rem
        i 
            margin-right: 0.25rem
    .selectTime
        margin-right: .75rem
        text-align: center
        i 
            font-size: .3rem
            display: inline-block
            height: 1rem
            line-height: 1rem
            width: 1rem
            border-radius: 50%
            background: #DEDEDE
            vertical-align: 10%
        span 
            display: inline-block
            height: 1.35rem
            width: 1.35rem
            border-radius: 50%
            background: #FF9500
            vertical-align: -35%
            line-height: 1.35rem
            border: none
            overflow: hidden
            color: #fff
            margin: 0 .15rem
// 出行人信息
.chuxingrenInfo
    padding: 0.1rem 1.1rem
    font-size: 0.65rem
    color: #666
    line-height: 1.3rem
    input
        border: none
        color: #666
        padding-left: 0.3rem
    input::-webkit-input-placeholder
        color: #979797
        font-size: 0.65rem        
        text-align: left
    .phoneInputBox
        display: flex
        justify-content: space-between
        line-height: 1.3rem
        height: 1.3rem
    .yzBtn
        display: inline-block
        height: 0.88rem
        line-height: 0.88rem
        padding: 0rem 0.3rem
        background: #00C99D
        font-size: 0.5rem
        text-align: center
        border-radius: .4rem
        color: #fff
        margin-top: 0.2rem
        border: none
// 预定须知
.ydMustKnow
   display: flex
   justify-content: space-between
   padding-right: 0.4rem
   a i
    font-size: 0.65rem
    color: #333
.knowContent 
    padding: .5rem .85rem
    h3
        font-weight: 300
        margin-bottom: .25rem
    p
        font-size: 0.6rem
        line-height: 1.1rem
        text-align: left
        color: #666
// 游客评论
.commantList li
    padding: 0.75rem 0.85rem
    .touristInfo
        .pic
            height: 2rem
            width: 2rem
            border-radius: 50%
            background: red
            display: inline-block
            vertical-align: middle
        span
            font-size: 0.6rem
            margin-left: 0.47rem
    p
        line-height: 1rem
        font-size: 0.6rem
        margin-top: 0.5rem
        color: #666
// 点赞
.danzanBox
    display: flex
    justify-content: space-between
    padding: 0 0.85rem 0 0.75rem
    height: 1.5rem
    line-height: 1.5rem
    .dianzanItem
        i 
            vertical-align: -4%
            font-size: .68rem
        .plNum
            margin-right: .5rem
            i 
                font-size: .8rem
        label
            margin-left: 0.3rem
            font-size: 0.62rem
    .commitBtn
        box-sizing: border-box
        display: block
        width: 4.5rem
        height: 1.2rem
        line-height: 1.2rem
        border: 1px solid #7DEDCF
        border-radius: .2rem
        color: #7DEDCF
        text-align: center
        font-size: .6rem 
        margin-top: .15rem
        font-weight: 500 
        i 
            vertical-align: -9%
            margin-left: .15rem
</style>
<style lang="sass">
.vm-scrollview
    padding-bottom: 4.5rem
    background: #fff
// 按钮
.tabbar-box
    height: 2.5rem
    text-align: center
    box-sizing: border-box
    button
        height: 1.9rem
        line-height: 1.9rem
        border: none
        background: #03ca9d
        border-radius: 4px
        margin: .3rem 0.5rem
        font-size: .75rem
        color: #fff
.vm-tabbar 
    position: fixed
    bottom: 0
    &:after
        border-top: none
</style>