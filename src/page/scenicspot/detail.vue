<template>
    <vm-layout class="scenicspotDetail">
        <div class="headerBox">
            <div class="bannerBox">
                <div class="demo-small-pitch">
                    <vm-slider :ready="readySlider" initIndex="1">
                        <vm-slider-item v-for="(image, index) in images">
                            <img :src="imgOrigin + image"/>
                        </vm-slider-item>
                    </vm-slider>
                </div>
            </div>
            <div class="plaseInfo">
                <h3>{{init.view_name}}</h3>
                <p>{{init.intruduce}}</p>
                <div class="moreBtnBox">
                    <a href="javascript:;" class="moreBtn" @click="showHandle=true">更多<i class="iconfont icon-icon-copy"></i></a>
                </div>
            </div>
        </div>
        <div class="daoyouListCaptionBox">
            <div class="title"><i></i><span>优质导游</span></div>
            <div class="listStyle">
                <a href="javascript:;">评分<i class="iconfont icon-control-arr-copy-copy"></i></a>
                <a href="javascript:;">价格<i class="iconfont icon-control-arr-copy-copy"></i></a>
                <a href="javascript:;">性别<i class="iconfont icon-control-arr-copy-copy"></i></a>
            </div>
        </div>
        <ul class="daoyouList">
            <li>
                <div class="imgBox">
                    <div class="img"></div>
                </div>
                <div class="daoyouDesc">
                    <div class="nameSexGoal">
                        <div class="nameSex">
                            <label for="">导游：</label>
                            <span class="name">张歆艺</span>
                            <i>男</i>
                        </div>
                        <div class="goal">
                            <div class="starNum">
                                <i class="iconfont icon-star-full"></i>
                                <i class="iconfont icon-star-full"></i>
                                <i class="iconfont icon-star-full"></i>
                                <i class="iconfont icon-star-full"></i>
                                <i class="iconfont icon-star-full"></i>
                                <span>5.0</span>
                            </div>

                        </div>
                    </div>
                    <div class="intersting">
                        <label for="">擅长：</label>
                        <span>建筑艺术  胡同游  书画展</span>
                    </div>
                    <div class="path">
                        <div>
                            <label for="">路线：</label>
                            <span>经典西线两小时</span>
                        </div>
                        <div class="money">
                            <span>￥2</span>
                            <span>小</span>
                        </div>
                    </div>
                </div>
            </li>
        </ul>
    </vm-layout>
</template>

<script>
export default {
    name: 'user',
    data () {
        return {
            config: vm.config,                 // 配置
            id: this.$route.query.id,          // 景点id
            init: {},                          // 数据
            images: [],                        // 图片
            isShow: false,
            showIntroduce: false,
            readySlider: false
        }
    },
    
    created () {
        this.config.title('出发')
        this.fetchViews()
        this.readySlider = true
    },
    methods: {
        fetchViews() {
            vm.fetch.post({
                url: `/view/detail/${this.id}`,
            })
            .then(res => {
                this.imgOrigin = res.prefix 
                this.init = res.data
                this.images.push(res.data.resource_path)
                this.images.push(res.data.resource_path)
                this.images.push(res.data.resource_path)
                console.log('this.init:',this.init)
            })
            .catch(err => this.$dialog.toast({mes: err.body.msg}))
        },
        showHandle () {
            this.isShow = !this.isShow;
        }
    }
}
</script>

<style scoped>
.scenicspotDetail{
    background: #fff;
}
/*头部导航和介绍*/
.headerBox{
    padding:0.5rem 0.6rem 0 0.6rem;
}
.bannerBox{
    /*height:5.89rem;*/
}
.item {
    padding: 0;
    text-align: center;
    background: #ccc;
    
}
.item span {
        font-size: 5rem;
        font-weight: 700;
}
.plaseInfo h3{
    font-size: 0.9rem;
    margin-bottom: 0.75rem;
}
.plaseInfo{
    background: #fafafa;
    padding:0.6rem;
    position: relative;
}
.plaseInfo p{
    font-size: 0.6rem;
    line-height: 0.83rem;
    
}
.plaseInfo .showIntroduce{
    height:;
    overflow: hidden;
}
.moreBtnBox{
    display: flex;
    justify-content:flex-end;
}
.moreBtn{
    
}
.daoyouListCaptionBox{
    display: flex;
    justify-content: space-between;
    width:100%;
    border-top:0.05rem solid #E7E7E7;
    border-bottom:0.05rem solid #E7E7E7;
    font-size: 0.9rem;
    padding:0.6rem 0.6rem 0.29rem 0.6rem;
    margin-top:0.75rem;
}
.title i{
    background: #00C99D;
    margin-right: 0.27rem;
    display: inline-block;
    height:0.9rem;
    width:0.13rem;
    vertical-align: middle;
}
/*导游信息*/
.listStyle a{
    font-size: 0.65rem;
    margin-left:0.3rem;
}
.daoyouList li{
    border-bottom:1px solid #ccc;
    margin:0 0.6rem;
    padding:0.75rem 0; 
    display: flex;
}
.imgBox{
    height:3.3rem;
    width:3.3rem;
    background: red;
    border-radius: 50%;
    margin-right: 0.75rem;
}
.daoyouDesc{
    flex:1;
}
.nameSexGoal,.path{
    display: flex;
   justify-content: space-between;
}
.nameSex{
    font-size: 0.75rem;
}
.nameSex i{
    font-size: 0.55rem;
}
.starNum i{
    color:#FF9500;
}
.starNum span{
    display: inline-block;
    width:1.27rem;
    height:0.6rem;
    background: #FF9500;
    border-radius: 0.1rem;
    text-align: center;
    line-height: 0.6rem;
    font-size: 0.55rem;
}
.intersting{
    font-size: 0.6rem;
    margin-top:0.38rem;
}
.path{
    font-size: 0.5rem;
}
.money{
    color:#EF667C ;
}
.money span:first-child{
    margin-right: 1.5rem;
}
</style>
<style lang="sass">
.vm-slider-pagination
    left: 7rem
    bottom: 0.25rem
.vm-slider-pagination>.vm-slider-pagination-item.vm-slider-pagination-item-active
    background: #fff
</style>