<template>
    <div class="orderCreate">
        <div class="headerBox">
            <div class="bannerBox"><!-- 轮播图开始 -->
                <div class="demo-small-pitch">
                    <vm-slider autoplay="3000" initIndex="2">
                        <vm-slider-item>
                            <div class="item">
                                item <span>1</span>
                            </div>
                        </vm-slider-item>
                        <vm-slider-item>
                            <div class="item">
                                item <span>2</span>
                            </div>
                        </vm-slider-item>
                        <vm-slider-item>
                            <div class="item">
                                item <span>3</span>
                            </div>
                        </vm-slider-item>
                    </vm-slider>

                </div>
            </div><!-- 轮播图结束 -->

            <div class="daoyouInfo">
                <div class="imgBox"></div>
                <div class="textInfo">
                    <h3>旅游导游：艾子豪</h3>
                    <p>擅长内容：古建筑 胡同游 书画展</p>
                    <p>旅行时长：2个小时</p>
                </div>
            </div>
        </div>
        <div class="captionTitle">
            <i></i><span>出游时间</span>
        </div>
        <div class="startTimeBox">
            <p class="timeTitle"><i class="iconfont icon-rl"></i><span>出发时间</span></p>
            <p class="timeDetail">2016年6月25日9:00AM</p>
        </div>
        <div class="captionTitle">
            <i></i><span>出游人数</span>
        </div>
        <div class="chuyouNumBox">
            <div class="selectTimeTitle"><i class="iconfont icon-wode"></i><span>选择出游时间</span></div>
            <div class="selectTimeInput">
                <div class="subItem"><span class="subHao" @click="selectTime(-1)"></span></div>
                <input type="text" class="numItem" v-model="chuyouTime"></input>
                <div class="addItem"><span class="addHao" @click="selectTime(1)"></span></div>
            </div>
        </div>
        <div class="captionTitle ">
            <i></i><span>出行人信息</span>
        </div>
        <div class="chuxingrenInfo">
            <div class="nameInputBox"><label for="">姓&nbsp;&nbsp;名:</label><input type="text" placeholder="请输入姓名"></div>
            <div class="phoneInputBox">
                <div class="nameInputBox"><label for="">电&nbsp;&nbsp;话:</label><input type="text" placeholder="请输入电话"></div>
                <a href="javascript:;" class="yzBtn">发送验证码</a>
            </div>
            <div class="yzInputBox"><label for="">验证码:</label><input type="text" placeholder="请输入验证码"></div>

        </div>
        
        <div class="captionTitle ydMustKnow">
            <div class="yudingText"><i></i><span>预定须知</span></div>
            <a href="javascript:;" v-on:click="needKnowHandle"><i v-bind:class="['iconfont', isUp ? 'icon-arrow-left-copy' : 'icon-control-arr-copy-copy']"></i></a>
        </div>
        <div class="knowContent" v-show="nendKnowShow">
            <p>this is need knowthis is need knowthis is need knowthis is need knowthis is need knowthis is need knowthis is need knowthis is need know</p>
        </div>
        <div class="captionTitle ">
            <i></i><span>游客评论</span>
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
        <div class="yudingBtnBox">
            <a href="javascript:;" class="orderBtn">立即预定</a>

    </div>
     </div>
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

<style scoped>
.orderCreate{
    background: #fff;
}
/*头部轮播和导游信息*/
.headerBox{
    padding:0.5rem 0.6rem 0 0.6rem;
}
.bannerBox{
    width:100%;
    /*height:5.89rem;*/
    margin-bottom:0.87rem;
}
.item {
    padding: 2rem 0;
    text-align: center;
    background: #ccc;
    
}
.item span {
        font-size: 5rem;
        font-weight: 700;
}
.daoyouInfo{
    display: flex;
}
.imgBox{
    height:1.93rem;
    width:1.93rem;
    background:red;
    margin-left: 0.3rem
}
.textInfo{
    flex:1; 
    padding:1.1rem 0 0 0.75rem; 
}
.textInfo h3{
    font-size: 0.9rem;
}
.textInfo p{
 font-size:  .9rem;  
}
/*出游时间*/
.captionTitle{
    width:100%;
    border-top:0.05rem solid #E7E7E7;
    border-bottom:0.05rem solid #E7E7E7;
    font-size: 0.9rem;
    padding:0.29rem 0rem 0.29rem 0.85rem;
}
.captionTitle>i,.yudingText>i{
    background: #00C99D;
    margin-right: 0.27rem;
    display: inline-block;
    height:0.9rem;
    width:0.13rem;
    vertical-align: middle;
}
.startTimeBox{
    padding:0.75rem 0 0.8rem 0;
}
.timeTitle{
    text-align:center;
    font-size: 0.9rem;
}
.timeDetail{
    color:#00CA9D;
    font-size: 0.6rem;
    text-align: center;
}
/*出游人数*/
.chuyouNumBox{
    display: flex;
    justify-content: space-between;
    padding:0.8rem 0;
}
.selectTimeTitle{
    font-size: 0.75rem;
    margin-left: 1.9rem;
}
.selectTimeTitle i{
    margin-right: 0.67rem;
}
.selectTimeInput{
    margin-right: 1.25rem;
}
.selectTimeInput>div,.selectTimeInput input{
    display: inline-block;
    height:1.35rem;
    width:1.35rem;
    border-radius: 50%;
    background:#F3F3F3;
    text-align: center;
    vertical-align: middle;
    line-height: 1.35rem;
    margin-left:0.3rem;
    border: none;
}
.selectTimeInput .numItem{
    background: #FD7139;
    display: inline-block;
}
.subHao{
    display: inline-block;
    width:0.23rem;
    height:0.1rem;
    background: #636769;
    vertical-align: middle;
}
.addHao{
    display: inline-block;
    width:0.2rem;
    height:0.2rem;
    border-radius: 50%;
    background: #636769;
    vertical-align: middle;
}
/*出行人信息*/
.chuxingrenInfo{
    padding:0.75rem 0.2rem 0.75rem 1.75rem;
    font-size: 0.75rem;
    color:#666666;
    line-height: 1.3rem;
}
.chuxingrenInfo input{
    border:none;
    color: #DFDFDF;
    padding-left: 0.3rem;
}
input::-webkit-input-placeholder {
      /* placeholder颜色  */
        color: #dfdfdf;
       /* placeholder字体大小  */
        font-size: 0.75rem;
        /* placeholder位置  */14         
        text-align: right;
    }
.phoneInputBox{
    display: flex;
    justify-content: space-between;
}
.yzBtn{
    display: inline;
    width:3.7rem;
    height:0.88rem;
    line-height: 0.88rem;
    background: #00C99D;
    font-size: 0.5rem;
    text-align:center;
    border-radius: .4rem;
}
/*预定须知*/
.captionTitle.ydMustKnow{
   display: flex;
   justify-content: space-between;
   padding-right: 0.4rem
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
    line-height: 1.5rem;
    vertical-align: top;
}
.commitBtn i{
    vertical-align: middle;
}
.commitBtn span{
    font-size: 0.45rem;
    vertical-align: middle;
}
.yudingBtnBox{
    margin:3rem 0 1rem 0;
    padding:0 0.75rem;
}
.orderBtn{
    display: block;
    width: 100%;
    height:1.75rem;
    background: #7DEDCF;
    line-height: 1.75rem;
    text-align: center;
    font-size: 0.75rem;
    color:#fff;
    border-radius: .3rem;
}
.chuxingrenInfo{
    padding:0.1rem 0.85rem;
    font-size: 0.75rem;
}
</style>
<style lang="sass">
</style>