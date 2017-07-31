<template>
    <vm-layout id="orderCreate">
        <!-- 头部 -->
        <div class="headerBox border-bottom">
            <!-- 轮播图 -->
            <div class="bannerBox">
                <!-- <div class="demo-small-pitch">
                    <vm-slider :ready="readySlider" initIndex="0" autoplay="3000">
                        <vm-slider-item v-for="(image, index) in images">
                            <div class="item">
                                <img
                                    :src="image.indexOf('http')>-1 ? image : imgOrigin + image"
                                />
                            </div>
                        </vm-slider-item>
                    </vm-slider>
                </div> -->
                <div class="item">
                    <img
                        :src="image && image.indexOf('http')>-1 ? image : imgOrigin + image"
                    />
                    <span>￥{{info.price}}</span>
                </div>
            </div>

            <!-- 导游信息 -->
            <div class="daoyouInfo">
                <div class="imgBox" @click="showPicPop=true">
                    <vm-clip
                        :src="resource_path.indexOf('http') > -1 ? resource_path : (imgOrigin+ resource_path)"
                        scale="cover"
                        width="1.93rem"
                        height="1.93rem"
                    ></vm-clip>
                </div>
                <div class="textInfo">
                    <h3>旅游导游：{{info.real_name}}</h3>
                    <p :class="{infoMsg:isShowUp==false}"><span>导游介绍：</span>{{info.introduce}}</p>
                    <!-- <p><span>费用：</span>￥{{info.price}}</p> -->
                    <p class="cf" @click="showMoreMsg">
                        <i class="fl"><span>旅行时长：</span>{{info.visit_length}}个小时</i>
                        <i :class="['iconfont', isShowUp ? 'icon-icon-3' : 'icon-icon-1' , 'fr']"></i>
                    </p>
                    <p v-if="isShowUp"><span>路线名称：</span>{{info.line_name}}</p>
                    <p v-if="isShowUp"><span>路线介绍：</span>{{info.view_line_content}}</p>
                    <p v-if="isShowUp"><span>最高接待人数：</span>{{info.max_count}}人</p>

                </div>
            </div>
        </div>

        <!-- 出游时间 -->
        <div class="captionTitle border-bottom">
           <i>|</i><span>出游时间</span>
        </div>
        <div class="startTimeBox border-bottom">
            <!-- vux日历组件 -->
            <datetime 
                v-model="minuteListValue" 
                @on-change="change" 
                format="YYYY-MM-DD HH:mm" 
                :minute-list="['00', '15', '30', '45']" 
            >
                <x-button class="timeTitle"><i class="iconfont icon-rl"></i>出发时间</x-button>
            </datetime>
            <p class="timeDetail">{{year}}年{{month}}月{{day}}日{{mintime}}</p>
        </div>

        <!-- 出游人数 -->
        <div class="captionTitle border-bottom">
            <i>|</i><span>出游人数</span>
        </div>
        <div class="chuyouNumBox border-bottom" @click.self="chooseCountPop=true">
            <div class="selectTimeTitle"><i class="iconfont icon-wode"></i><span>选择出游人数</span></div>
            <div class="selectTime">
                <i class="iconfont icon-minus fl" @click="chooseCount(1)"></i>
                <span class="fl" @click="chooseCountPop=true">{{personCount}}</span>
                <i class="iconfont icon-plus fr" @click="chooseCount()"></i>
            </div>
        </div>

        <!-- 出行人信息 -->
        <div class="captionTitle border-bottom">
            <i>|</i><span>出行人信息</span>
        </div>
        <div class="chuxingrenInfo border-bottom">
            <div class="nameInputBox chuxingrenInfo-item">
                <label for="">姓&nbsp;&nbsp;&nbsp;名:</label>
                <input type="text" placeholder="请输入姓名" v-model.trim="contactName" maxlength="10">
            </div>
            <div class="phoneInputBox">
                <div class="nameInputBox chuxingrenInfo-item">
                    <label for="">电&nbsp;&nbsp;&nbsp;话:</label>
                    <input type="text" placeholder="请输入电话" v-model.trim="phone">
                </div>
                <button type="button" class="yzBtn" @click="sendCode">{{codeText}}</button>
            </div>
            <div class="yzInputBox chuxingrenInfo-item">
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
        <p v-if="!commentCnt" class="noComment">暂无相关评论~</p>
        <ul class="commantList border-bottom">
            <li v-for="(item,index) in commentList">
                <div class="touristInfo">
                    <div class="pic">
                        <vm-clip
                            :src="(item.avatar_img).indexOf('http')>-1 ? item.avatar_img : imgOrigin + item.avatar_img"
                            scale="cover"
                            width="2rem"
                            height="2rem"
                        ></vm-clip>
                    </div>
                    <span>{{item.nick_name}}</span>
                </div>
                <p>{{item.comment}}</p>
            </li>
        </ul>

        <!-- 评论,收藏 -->
        <div class="danzanBox">
            <div class="dianzanItem">
                <a :href="commentCnt ? ('#/comment/list?guideId=' + guideId) : 'javascript:;'" class="plNum">
                    <i class="iconfont icon-kefu"></i><label for="">{{info.commentCnt}}</label>
                </a>
                <span class="dzNum" @click="collect()"><i class="iconfont icon-shoucang"></i><label for="">{{favoriteCnt}}</label></span>
            </div>
            <a :href="commentCnt ? ('#/comment/list?guideId=' + guideId) : 'javascript:;'" class="commitBtn">更多评论<i class="iconfont icon-jiantou1"></i></a>
        </div>

        <!-- 底部按钮 -->
        <vm-tabbar slot="tabbar" class="tabbar-box">
            <button class="tabbar-item" type="button" @click="create()">立即预订</button>
        </vm-tabbar>
        
        <!-- 选择出游人数 -->
        <vm-popup v-model="chooseCountPop" position="center" height="60%" class="CountPop">
            <h3 class="border-bottom" @click="chooseCountPop=false">填写出游人数<i class="iconfont icon-shutdown"></i></h3>
            <div class="selectTime">
                <i class="iconfont icon-minus fl" @click="chooseCount(1)"></i>
                <input type="tel" v-model="personCount">
                <i class="iconfont icon-plus fr" @click="chooseCount()"></i>
            </div>
        </vm-popup>

        <!-- 图片放大弹框 -->
        <vm-popup v-model="showPicPop" position="center" width='100%' class="Pop">
            <vm-clip
                :src="resource_path.indexOf('http') > -1 ? resource_path : (imgOrigin+ resource_path)"
                scale="cover"
                width="18.75rem"
                height="18.75rem"
            ></vm-clip>
        </vm-popup>
    </vm-layout>
</template>

<script>
var dtCache = window.localStorage
var userInfo2 = JSON.parse(dtCache.getItem('userInfo'))
import { Datetime ,XButton} from 'vux'
export default {
    name: 'user',
    data () {
        return {
            config: vm.config,                               // 配置
            readySlider: false,                              // slider 初始化
            codeText: '发送验证码',                            // 按钮文字
            isClicked: false,                                // 是否已点击按钮
            personCount: 1,                                  // 出行人数
            visit_length: '',                                // 旅行时长
            lineId: this.$route.query.lineId,                // 线路id
            guideId: this.$route.query.guideId,              // 导游id
            image: '',                                       // 景点图片
            imgOrigin: '',                                   // 图片前缀
            resource_path: '',                               // 导游照片
            contactName: userInfo2 ? userInfo2.name : '',    // 游客姓名
            phone: userInfo2 ? userInfo2.phone : '',         // 游客电话
            code: '',                                        // 验证码
            max_count: '',                                   // 最高出游人数
            favoriteCnt: null,                               // 收藏人数
            commentList: [],                                 // 评论列表
            chooseCountPop: false,                           // 出游人数弹框
            minuteListValue: '',                             // 选择日期
            nendKnowShow:false,                              // 须知
            isUp:false,                                      // 向上
            year: '',                                        // 年
            month: '',                                       // 月
            day: '',                                         // 日
            mintime: '',                                     // 时间
            todayMonth: '',                                  // 当月
            sendMintime: '' ,                                 // 发送的日期
            images: [],
            isShowUp: false,
            showPicPop: false,
            info: {}                                         // 数据集
        }
    },
    created () {
        this.config.title('出发')
        this.fetchCommentList()

        var today = new Date()                                // 获取当日日历
        this.year = today.getFullYear()      // 获取当前年份
        this.month = this.todayMonth = today.getMonth() + 1   // 获取当前月份,注意月份需+1
        this.day = today.getDate()                            // 获取当前日期
    },

    components: {
        Datetime,
        XButton
    },    

    methods: {
        // 获取线路导游信息
        fetchCommentList(){
            this.$http.get(`/view/guideInfo?oid=test1234&lineId=${this.lineId}`)
            .then(res => {
                if(res.body.res_code === 200){
                    this.info = res.body.data.info
                    this.commentCnt = res.body.data.info && res.body.data.info.commentCnt
                    this.favoriteCnt = res.body.data.info && res.body.data.info.favoriteCnt
                    this.commentList = res.body.data.list && res.body.data.list.splice(0,4)
                    this.max_count = res.body.data.info && res.body.data.info.max_count
                    this.real_name =  res.body.data.info && res.body.data.info.real_name
                    this.introduce =  res.body.data.info && res.body.data.info.commentCnt || '专业导游二十年'
                    this.visit_length =  res.body.data.info && res.body.data.info.visit_length
                    this.resource_path =  res.body.data.info && res.body.data.info.user_img
                    this.image = res.body.data.info && res.body.data.info.view_img
                    this.imgOrigin = res.body.prefix
                    this.images.push(this.image)
                    this.images.push(this.image)
                    this.images.push(this.image)
                    this.images = this.images.splice(0,4)
                    this.readySlider = true
                }else{
                    this.$dialog.toast({mes: res.body.msg})
                }
            }).catch(err => this.$dialog.toast({mes: err.body.msg}))
        },

        // 日历插件点击确认
        change(value){
            let timeArr = value.split('')
            this.month = timeArr[5] + timeArr[6]
            this.day = timeArr[8] + timeArr[9]
            this.sendMintime = timeArr[11] + timeArr[12] + ":" + timeArr[14] + timeArr[15]
            if(parseInt(timeArr[11] + timeArr[12]) > 12){
                this.mintime = timeArr[11] + timeArr[12] - 12 + ":" + timeArr[14] + timeArr[15] + 'PM'
            }else{
                this.mintime = timeArr[11] + timeArr[12] + ":" + timeArr[14] + timeArr[15] + 'AM'
            }
            if(parseInt(this.month) > parseInt(this.todayMonth) + 2){
                this.$dialog.toast({mes: '所选择日期超过两个月'})
                return
            }
        },

        // 点击预定须知
        needKnowHandle(){
            this.nendKnowShow = !this.nendKnowShow;
            this.isUp=!this.isUp;
        },

        showMoreMsg(){
            this.isShowUp = !this.isShowUp
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
                if(this.personCount >= this.max_count){
                    this.$dialog.toast({mes: '出游人数超过导游限制'})
                    this.personCount = this.max_count
                }
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
                    url: '/user/code',
                    data: {
                       mobile: this.phone
                    }
                }).then(res => {
                    if(res.res_code === 200){
                        this.countDown()
                    }else{
                        this.$dialog.toast({mes: res.msg})
                    }
                }).catch(err => this.$dialog.toast({mes: err.msg}))
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
            // 缓存用户信息
            var userInfo = {}
            userInfo.name = this.contactName,
            userInfo.phone = this.phone
            dtCache.setItem('userInfo',JSON.stringify(userInfo))

            if(parseInt(this.month) > parseInt(this.todayMonth) + 2){
                this.$dialog.toast({mes: '请选择正确的出行日期'})
                return
            }
            if(!this.phone || !(/^1(3|4|5|7|8)\d{9}$/.test(this.phone))){
                this.$dialog.toast({mes: '请输入正确的手机号码'})
                return
            }
            if(!this.personCount > this.max_count){
                this.$dialog.toast({mes: '出游人数超过导游限制'})
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
            this.$http.post('/user/order/save',{
                lineId: this.lineId,
                visitDate: this.year + '-' + this.month + '-'+ this.day,
                visitTime: this.sendMintime,
                contactName: this.contactName,
                phone: this.phone,
                personCount: this.personCount,
                code: this.code,
                oid: 'test1234'
            })
            .then(rst => {
                if(rst.body.res_code === 200){
                    this.$dialog.toast({
                        mes: '预订成功',
                        timeout: 1500,
                        callback: () => {
                            this.$router.push(`/order/success?real_name=${this.real_name}`)
                        }
                    })
                }else{
                    this.$dialog.toast({mes: rst.body.msg})
                }
            })
            .catch(err => this.$dialog.toast({mes: err.body.msg}))
        },

        // 收藏
        collect(){
            this.$http.post('/user/favorite/add',{guideId: this.guideId,oid:'test1234'})
            .then(res => {
                if(res.body.res_code === 200){
                    this.favoriteCnt ++
                    this.$dialog.toast({mes: '收藏成功'})
                }else{
                    this.$dialog.toast({mes: res.body.msg})
                }
            }).catch(err => this.$dialog.toast({mes: err.body.msg}))
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
        overflow-y: hidden
        img
            position: absolute
            top: 50%
            left: 0
            width: 100%
            transform: translateY(-50%)
        span 
            position: absolute
            left: 0
            bottom: 0
            font-size: .8rem
            background: rgba(0,0,0,.3)
            color: #fff
            display: inline-block
            height: 1.3rem
            line-height: 1.3rem
            text-align: center
            padding: 0 .5rem
    // 导游信息
    .daoyouInfo
        display: flex
        margin-top: .5rem
        .imgBox
            height: 1.93rem
            width: 1.93rem
            margin-top: .18rem
            img 
                width: 100%
        .textInfo
            flex: 1
            margin-left: .5rem
            h3
                font-size: 0.8rem
                font-weight: 300
                color: #000
            p
                font-size: .65rem
                color: #666
                line-height: 1.1rem
                margin-top: .2rem
                .iconfont
                    font-size: .75rem
                    display: inline-block
                span
                    font-size: .7rem
                    color: #333
                    font-weight: 500
            .infoMsg
                height: 1.1rem
                overflow: hidden
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
        // margin-bottom: .25rem
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
        padding-top: .4rem
        i 
            font-size: .3rem
            display: inline-block
            height: 1rem
            margin-top: .2rem
            line-height: 1rem
            width: 1rem
            border-radius: 50%
            background: #DEDEDE
        span 
            display: inline-block
            height: 1.35rem
            width: 1.35rem
            border-radius: 50%
            background: #FF9500
            line-height: 1.35rem
            border: none
            overflow: hidden
            color: #fff
            margin: 0 .35rem
// 出行人信息
.chuxingrenInfo
    padding: 0.1rem 1.1rem
    font-size: 0.65rem
    color: #666
    line-height: 1.3rem
    .chuxingrenInfo-item
        position: relative
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
            overflow: hidden
            display: inline-block
            vertical-align: middle
            img
                width: 100%
                border-radius: 50%
        span
            font-size: 0.6rem
            margin-left: 0.47rem
    p
        line-height: 1rem
        font-size: 0.6rem
        margin-top: 0.5rem
        color: #666
.noComment
    padding: .2rem 1rem
    font-size: 0.6rem
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
// 出游人数弹框
.CountPop 
    h3 
        margin: .5rem .5rem 0 .5rem
        padding-bottom: .5rem 
        font-size: .75rem
        font-weight: 300
        i 
            margin-left: 3.1rem
            font-size: .7rem
            color: #666
    .selectTime
        text-align: center
        margin: 1rem .5rem .5rem .5rem
        i  
            display: inline-block
            height: 1.5rem
            line-height: 1.5rem
            width: 2rem
            background: #ccc
        input 
            border: none
            outline: none
            height: 1.5rem
            line-height: 1.5rem
            background: #f3f3f3
            width: 4rem
            margin-left: .1rem
            text-align: center
</style>
<style lang="sass">
#orderCreate .vm-scrollview
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
// 日期弹框
#orderCreate 
    .weui-btn_default
        background: #fff
    .weui-btn:after
        border: none
    .weui-cell
        padding: 0
</style>