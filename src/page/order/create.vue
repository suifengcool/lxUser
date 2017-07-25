<template>
    <vm-layout id="orderCreate">
        <!-- 头部 -->
        <div class="headerBox">
            <!-- 轮播图 -->
            <div class="bannerBox">
                <div class="demo-small-pitch">
                    <vm-slider autoplay="3000" initIndex="1">
                        <vm-slider-item>
                            <div class="item">
                                <img src="" alt=""><span>{{index}}</span>
                            </div>
                        </vm-slider-item>
                        <vm-slider-item>
                            <div class="item">
                                <img src="" alt=""><span>{{index}}</span>
                            </div>
                        </vm-slider-item>
                        <vm-slider-item>
                            <div class="item">
                                <img src="" alt=""><span>{{index}}</span>
                            </div>
                        </vm-slider-item>
                    </vm-slider>
                </div>
            </div>

            <!-- 导游信息 -->
            <div class="daoyouInfo">
                <div class="imgBox">
                    <img src="" alt="">
                </div>
                <div class="textInfo">
                    <h3>旅游导游：艾子豪</h3>
                    <p>擅长内容：古建筑 胡同游 书画展</p>
                    <p>旅行时长：2个小时</p>
                </div>
            </div>
        </div>

        <!-- 出游时间 -->
        <div class="captionTitle">
           <i>|</i><span>出游时间</span>
        </div>
        <div class="startTimeBox">
            <p class="timeTitle"><i class="iconfont icon-rl"></i><span>出发时间</span></p>
            <p class="timeDetail">2016年6月25日9:00AM</p>
        </div>

        <!-- 出游人数 -->
        <div class="captionTitle">
            <i>|</i><span>出游人数</span>
        </div>
        <div class="chuyouNumBox">
            <div class="selectTimeTitle"><i class="iconfont icon-wode"></i><span>选择出游人数</span></div>
            <div class="selectTime">
                <i class="iconfont icon-minus"></i>
                <span>0</span>
                <i class="iconfont icon-plus"></i>
            </div>
        </div>

        <!-- 出行人信息 -->
        <div class="captionTitle">
            <i>|</i><span>出行人信息</span>
        </div>

        <div class="chuxingrenInfo">
            <div class="nameInputBox"><label for="">姓&nbsp;&nbsp;&nbsp;名:</label><input type="text" placeholder="请输入姓名"></div>
            <div class="phoneInputBox">
                <div class="nameInputBox"><label for="">电&nbsp;&nbsp;&nbsp;话:</label><input type="text" placeholder="请输入电话"></div>
                <a href="javascript:;" class="yzBtn">发送验证码</a>
            </div>
            <div class="yzInputBox"><label for="">验证码:</label><input type="text" placeholder="请输入验证码"></div>
        </div>
        
        <!-- 预订须知 -->
        <div class="captionTitle ydMustKnow" v-on:click="needKnowHandle">
            <div class="yudingText"><i>|</i><span>预定须知</span></div>
            <a href="javascript:;"><i v-bind:class="['iconfont', isUp ? 'icon-arrow-left-copy' : 'icon-control-arr-copy-copy']"></i></a>
        </div>
        <div class="knowContent" v-show="nendKnowShow">
            <p>退改规则：<br/>
                1.该产品自然日支持取消。如需取消，请在公众号留言申请取消，工作人员会在第一时间联系您帮忙取消;<br/>
                2.提前48小时免费取消。48小时内，不可取消订单,不支持部分退;<br/>           
                3.如需改期，请申请取消后重新预订。<br/>
            </p>
        </div>

        <!-- 游客评论 -->
        <div class="captionTitle ">
            <i>|</i><span>游客评论</span>
        </div>
        <ul class="commantList">
            <li>
                <div class="touristInfo">
                    <div class="pic"></div>
                    <span>zhangsan</span>
                </div>
                <p>景点知道的内容很多，文艺又清新，很赞！</p>
            </li>
        </ul>


        <div class="danzanBox">
            <div class="dianzanItem">
                <span class="plNum"><i class="iconfont icon-kefu"></i><label for="">24</label></span>
                <span class="dzNum"><i class="iconfont icon-shoucang"></i><label for="">23</label></span>
            </div>
            <a href="javascript:;" class="commitBtn"><span>游客评论</span><i class="iconfont icon-search"></i></a>
        </div>

        <!-- 底部按钮 -->
        <vm-tabbar slot="tabbar" class="tabbar-box">
            <button class="tabbar-item" type="button">立即预定</button>
        </vm-tabbar>
    </vm-layout>
</template>

<script>
export default {
    name: 'user',
    data () {
        return {
            config: vm.config,                               // 配置
            nendKnowShow:false,
            isUp:false,
            chuyouTime:0
        }
    },
    created () {
        this.config.title('出发')
    },
    methods: {
        needKnowHandle(){
            this.nendKnowShow = !this.nendKnowShow;
            this.isUp=!this.isUp;
        },
        selectTime(type){
             this.chuyouTime +=type;
            if(this.chuyouTime<0){
                this.chuyouTime = 0;
            }
        }
    }
}
</script>
<style lang="sass">
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
            background: red
        .textInfo
            flex: 1
            padding: 1.1rem 0 0 0.75rem
            h3
                font-size: 0.8rem
                font-weight: 300
            p
                font-size: .75rem
                color: #666
// 出游时间
.captionTitle
    height: 1.7rem
    line-height: 1.7rem
    border-top: 0.05rem solid #E7E7E7
    border-bottom: 0.05rem solid #E7E7E7
    font-size: 0.9rem
    padding: 0 0.6rem
    i 
        color: #00C99D
        margin-right: 0.27rem
.startTimeBox 
    padding: 0.75rem 0 0.8rem 0
    text-align: center
    .timeTitle
        text-align: center
        font-size: 0.9rem
        i 
            vertical-align: 3%
            margin-right: 0.15rem
    .timeDetail
        color: #00CA9D
        font-size: 0.6rem
        text-align: center
// 出游人数
.chuyouNumBox
    display: flex
    justify-content: space-between
    // padding: 0.8rem 0
    height: 2.25rem
    line-height: 2.25rem
    .selectTimeTitle
        font-size: 0.75rem
        margin-left: .9rem
        i 
            margin-right: 0.25rem
    .selectTime
        text-align: center
        i 
            font-size: .3rem
            display: inline-block
            height: 100%
            width: 2rem
        span 
            display: inline-block
            height: 1.35rem
            width: 1.35rem
            border-radius: 50%
            background: #FF9500
            vertical-align: middle
            line-height: 1.35rem
            border: none
            overflow: hidden
// 出行人信息
.chuxingrenInfo
    padding: 0.75rem 0.2rem 0.75rem 1.75rem
    font-size: 0.75rem
    color: #666
    line-height: 1.3rem
    input
        border: none
        color: #666
        padding-left: 0.3rem
    input::-webkit-input-placeholder
        color: #979797
        font-size: 0.75rem        
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
// 预定须知
.ydMustKnow
   display: flex
   justify-content: space-between
   padding-right: 0.4rem
   a i
    font-size: 0.3rem
</style>
<style scoped>


/*预定须知*/
.captionTitle.ydMustKnow{
   display: flex;
   justify-content: space-between;
   padding-right: 0.4rem
}
.ydMustKnow>a>i{
    font-size: 0.3rem
}
.knowContent p{
    padding:0.75rem 0.85rem;
    font-size: 0.75rem;
    line-height: 1rem;
}
/*游客评论*/
.commantList{
    padding:0.75rem 0.85rem;
}
.pic{
    height:2rem;
    width:2rem;
    border-radius: 50%;
    background: red;
    display: inline-block;
    vertical-align: middle;
}
.touristInfo span{
    font-size: 0.6rem;
    margin-left:0.47rem;
}
.commantList p{
    line-height: 1rem;
    font-size: 0.9rem;
    margin-top:0.5rem;
    color:#666666;
}
/*点赞*/
.danzanBox{
    display: flex;
   justify-content: space-between;
}
.danzanBox{
    padding:0 0.85rem 0 0.75rem;
} 
.dianzanItem label{
    margin-left:0.3rem;
    font-size: 0.62rem;
}
.dianzanItem span{
    margin-right: 0.75rem;
    line-height: 1.5rem;
}
.commitBtn{
    display: inline-block;
    width:5rem;
    height: 1.5rem;
    border:2px solid #7DEDCF;
    color:#7DEDCF;
    text-align: center;
    
    
}
.commitBtn i{
    
}
.commitBtn span{
    font-size: 0.45rem;
    vertical-align: middle;
    display: inline-block;
    margin-top:0.25rem;

}
.chuxingrenInfo{
    padding:0.1rem 0.85rem;
    font-size: 0.75rem;

}
</style>
<style lang="sass">
.vm-scrollview
    padding-bottom: 2.6rem
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