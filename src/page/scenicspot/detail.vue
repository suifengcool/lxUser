<template>
    <vm-layout class="scenicspotDetail">
        <div class="headerBox">
            <div class="bannerBox">
                <div class="demo-small-pitch">
                    <vm-slider autoplay="3000" initIndex="1">
                        <vm-slider-item>
                            <div class="item">
                                <img :src="imgOrigin + images[0]" alt=""><span>{{index}}</span>
                            </div>
                        </vm-slider-item>
                        <vm-slider-item>
                            <div class="item">
                                <img :src="imgOrigin + images[1]" alt=""><span>{{index}}</span>
                            </div>
                        </vm-slider-item>
                        <vm-slider-item>
                            <div class="item">
                                <img :src="imgOrigin + images[2]" alt=""><span>{{index}}</span>
                            </div>
                        </vm-slider-item>
                    </vm-slider>

                </div>
            </div>
            <div class="plaseInfo">
                <h3>{{init.view_name}}</h3>
                <p :class="{'showIntroduce':isShow}">{{init.intruduce}}</p>
                <div class="moreBtnBox">
                    <a href="javascript:;" class="moreBtn" @click="showHandle">更多<i v-bind:class="['iconfont', !isShow ? 'icon-icon-copy' : 'icon-jiantou']"></i></a>
                </div>
            </div>
        </div>
        <div class="daoyouListCaptionBox">
            <div class="title"><i>|</i><span>优质导游</span></div>
            <div class="listStyle">
                <span v-for="(item,index) in sortStatus" @click="searchDaoyou(item,index)">
                    {{item}}
                    <i :class="['iconfont', sortType ==1 ? 'icon-arrow-left-copy' : 'icon-control-arr-copy-copy']"></i>
                </span>
                <!-- <a href="javascript:;" @click="searchDaoyou(1)">评分<i v-bind:class="['iconfont', sortType ==1? 'icon-arrow-left-copy' : 'icon-control-arr-copy-copy']"></i></i></a>
                <a href="javascript:;" @click="searchDaoyou(2)">价格<i v-bind:class="['iconfont', sortType ==1 ? 'icon-arrow-left-copy' : 'icon-control-arr-copy-copy']"></i></i></a>
                <a href="javascript:;" @click="searchDaoyou(3)">性别<i v-bind:class="['iconfont', sortType ==1 ? 'icon-arrow-left-copy' : 'icon-control-arr-copy-copy']"></i></i></a> -->
            </div>
        </div>

        <vm-infinitescroll :on-infinite="fetchData" class="orderList" v-if="count">
        <ul slot="list" class="daoyouList">
            <li v-for="(item, index) in lists" class="border-bottom">
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
                                <span>5.0</span>
                            </div>
                        </div>
                    </div>
                    <!-- <div class="intersting">
                        <label for="">擅长：</label>
                        <span>建筑艺术  胡同游  书画展</span>
                    </div> -->
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
        </vm-infinitescroll>


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
            images: [],                        // 轮播图数组
            imgOrigin: '',                     // 图片前缀
            lists: [],                         // 导游列表
            count: null,                       // 导游列表条数
            page: 0,                           // 分页，页码
            pageSize: 10,                      // 分页
            orderBy: 1,                        // 排序字段(1=评分,2=价格,3=性别，默认为1)
            sortType: 0,                       // 排序规则(排序方式,1=正序,0=倒序)
            sortStatus: ['评分','价格','性别'],  // 排序池
            isShow: false,
        }
    },

    components: {

    },

    created () {
        this.config.title('出发')
        this.fetchViews()
    },

    methods: {
        fetchViews() {
            vm.fetch.post({
                url: `/view/detail/${this.id}`,
            })
            .then(res => {
                if(res.res_code === 200){
                    this.imgOrigin = res.prefix 
                    this.init = res.data
                    this.images.push(res.data.resource_path)
                    this.images.push(res.data.resource_path)
                    this.images.push(res.data.resource_path)

                    this.fetchGuides()
                }else{
                    this.$dialog.toast({mes: res.msg})
                }
            })
            .catch(err => this.$dialog.toast({mes: err.msg}))
        },

        showHandle () {
            this.isShow = !this.isShow;
        },

        searchDaoyou (item,index) {
            console.log('item:',item)
            console.log('index:',index)
            this.orderBy = index + 1
        },

        fetchGuides() {
            vm.fetch.get({
                url: `/view/guides/${this.id}`,
                data: {
                    pageNo: this.page,
                    pageSize: this.pageSize,
                    viewSpotId: this.id,
                    orderBy: 1,         
                    sortType: 0
                }
            })
            .then(res => {
                const _list = res.data.list
                this.imgOrigin = res.prefix
                this.lists = [...this.lists, ..._list]
                this.count = res.data.totalRow
                if (_list.length < this.pageSize || Math.floor(this.count / this.pageSize) == this.page) {
                    // 所有数据加载完毕
                    setTimeout(()=> {
                        window.$vm.$emit('vmui.infinitescroll.loadedAll')
                    })
                    return
                }

                // 单次请求数据完毕
                window.$vm.$emit('vmui.infinitescroll.loadedOnce')

                this.page ++
            })
            .catch(err => this.$dialog.toast({mes: err.msg}))
        },


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
.item {
    text-align: center;
    background: #ccc;
    height:5.89rem;
    position: relative;
}
.item img{
    position: absolute;
    top: 50%;
    left: 0;
    width: 100%;
    transform: translateY(-50%)
}
.item span {
        font-size: 5rem;
        font-weight: 700;
}
.plaseInfo h3{
    font-size: 0.9rem;
    margin-bottom: 0.75rem;
    font-weight: 300;
}
.plaseInfo{
    background: #fafafa;
    padding:0.6rem;
}
.plaseInfo p{
    font-size: 0.6rem;
    line-height: 0.83rem;
    height:1.5rem;
    overflow: hidden;
}
.plaseInfo .showIntroduce{
    height:auto;
    overflow:;
}
.moreBtnBox{
    display: flex;
    justify-content:flex-end;
}
.moreBtn{
    font-size: 0.6rem;
    margin-top:0.1rem;
}
.moreBtn i{
    font-size: 0.4rem;

}
.daoyouListCaptionBox{
    display: flex;
    justify-content: space-between;
    width:100%;
    height:1.7rem;
    line-height: 1.7rem;
    border-top:0.05rem solid #E7E7E7;
    border-bottom:0.05rem solid #E7E7E7;
    font-size: 0.9rem;
    padding:0 0.6rem;
    margin-top:0.75rem;
}
.title i{
    color:#00C99D;
    margin-right: 0.27rem;
    font-weight: 700;
    vertical-align: middle;
}
/*导游信息*/
.listStyle span{
    font-size: 0.65rem;
    margin-left:0.3rem;

}
.listStyle i{
    font-size: 0.3rem;
}
.daoyouList li{
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
</style>