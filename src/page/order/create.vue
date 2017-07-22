<template>
    <div class="orderCreate">
        <div class="headerBox">
            <div class="bannerBox">
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
            </div>
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
            <p class="timeTitle"><i class="iconfont icon-search"></i><span>出发时间</span></p>
            <p class="timeDetail">2016年6月25日9:00AM</p>
        </div>
        <div class="captionTitle">
            <i></i><span>出游人数</span>
        </div>
        <div class="chuyouNumBox">
            <div class="selectTimeTitle"><i class="iconfont icon-search"></i><span>选择出游时间</span></div>
            <div class="selectTimeInput">
                <div class="subItem"><span class="subHao"></span></div>
                <div class="numItem">4</div>
                <div class="addItem"><span class="addHao"></span></div>
            </div>
        </div>
        <div class="captionTitle">
            <i></i><span>出行人信息</span>
        </div>
        <div class="chuxingrenInfo">
            <p>this is informationthis is informationthis is informationthis is informationthis is informationthis is informationthis is informationthis is informationthis is informationthis is informationthis is information</p>
        </div>
    </div>
</template>

<script>
export default {
    name: 'user',

    data () {
        return {
            config: vm.config,                               // 配置
        }
    },

    created () {
        this.config.title('出发')
    },

    methods: {
        
    }
}
</script>

<style scoped>
.orderCreate{
    background: #fff;
}
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
.captionTitle{
    width:100%;
    border-top:0.05rem solid #E7E7E7;
    border-bottom:0.05rem solid #E7E7E7;
    font-size: 0.9rem;
    padding:0.29rem 0rem 0.29rem 0.85rem;
}
.captionTitle i{
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
.selectTimeInput>div{
    display: inline-block;
    height:1.35rem;
    width:1.35rem;
    border-radius: 50%;
    background:#F3F3F3;
    text-align: center;
    vertical-align: middle;
    line-height: 1.35rem;
    margin-left:0.3rem;
}
.selectTimeInput .numItem{
    background: #FD7139;
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
.chuxingrenInfo{
    padding:0.1rem 0.85rem;
    font-size: 0.75rem;
}
</style>
<style lang="sass">
</style>