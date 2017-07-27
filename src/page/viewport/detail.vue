<template>
    <vm-layout class="scenicspotDetail">
        <!-- 头部 -->
        <div class="headerBox">
            <!-- 轮播图 -->
            <div class="bannerBox">
                <div class="demo-small-pitch">
                    <vm-slider autoplay="3000" initIndex="0">
                        <vm-slider-item>
                            <div class="item">
                                <img :src="(init.resource_path).indexOf('http')>-1 ? init.resource_path : (imgOrigin + init.resource_path)" alt=""><span>{{index}}</span>
                            </div>
                        </vm-slider-item>
                        <vm-slider-item>
                            <div class="item">
                                <img :src="(init.resource_path).indexOf('http')>-1 ? init.resource_path : (imgOrigin + init.resource_path)" alt=""><span>{{index}}</span>
                            </div>
                        </vm-slider-item>
                        <vm-slider-item>
                            <div class="item">
                                <img :src="(init.resource_path).indexOf('http')>-1 ? init.resource_path : (imgOrigin + init.resource_path)" alt=""><span>{{index}}</span>
                            </div>
                        </vm-slider-item>
                    </vm-slider>
                </div>
            </div>
            <!-- 景区介绍 -->
            <div class="plaseInfo">
                <h3>{{init.view_name}}</h3>
                <p :class="{'showIntroduce':isShow}">{{init.intruduce}}</p>
                <div class="moreBtnBox">
                    <a href="javascript:;" class="moreBtn" @click="showHandle">更多<i v-bind:class="['iconfont', !isShow ? 'icon-icon-copy' : 'icon-jiantou']"></i></a>
                </div>
            </div>
        </div>

        <!-- 排序规则 -->
        <div class="daoyouListCaptionBox">
            <div class="title"><i>|</i><span>优质导游</span></div>
            <div class="listStyle">
                <span v-for="(item,index) in sortStatus" @click="searchDaoyou(item,index)">
                    {{item}}
                    <i :class="['iconfont', sortType ==1 ? 'icon-arrow-left-copy' : 'icon-control-arr-copy-copy']"></i>
                </span>
            </div>
        </div>
        
        <!-- 导游列表 -->
        <vm-infinitescroll :on-infinite="fetchGuides" class="orderList" v-if="count">
            <ul slot="list" class="daoyouList">
                <li v-for="(item, index) in lists" class="border-bottom" @click="createOrder(item,index)">
                    <div class="imgBox">
                        <img :src="(item.resource_path).indexOf('http') > -1 ? item.resource_path : (imgOrigin+ item.resource_path)" alt="">
                    </div>
                    <div class="daoyouDesc">
                        <div class="nameSexGoal">
                            <div class="nameSex">
                                <label for="">导游：</label>
                                <span class="name">{{item.real_name}}</span>
                                <i>{{['女','男'][item.gender]}}</i>
                            </div>
                            <div class="goal">
                                <div class="starNum">
                                    <i
                                        :class="['iconfont', {'red': item.score > i}, Math.round(item.score) > i ? 'icon-xing2' : 'icon-xing1',]"
                                        v-for="(star, i) in [0,1,2,3,4]"
                                    ></i>   
                                    <span>{{item.score}}</span>
                                </div>
                            </div>
                        </div>
                        <div class="intersting">
                            <label for="">介绍：</label>
                            <span>{{item.introduce || '专业导游二十年'}}</span>
                        </div>
                        <div class="path">
                            <div class="path-left">
                                <label for="">路线：</label>
                                <span>{{item.line_name}}</span>
                            </div>
                            <div class="money">
                                <span>￥{{item.price}}</span>
                                <!-- <span>小</span> -->
                            </div>
                        </div>
                    </div>
                </li>
            </ul>
        </vm-infinitescroll>
    </vm-layout>
</template>

<script>
var dtCache = window.localStorage
export default {
    name: 'user',

    data () {
        return {
            config: vm.config,                 // 配置
            id: this.$route.query.id,          // 景点id
            init: {},                          // 数据
            imgOrigin: '',                     // 图片前缀
            lists: [],                         // 导游列表
            count: null,                       // 导游列表条数
            page: 0,                           // 分页，页码
            pageSize: 10,                      // 分页
            orderBy: 1,                        // 排序字段(1=评分,2=价格,3=性别，默认为1)
            sortType: 0,                       // 排序规则(排序方式,1=正序,0=倒序)
            sortStatus: ['评分','价格','性别'],  // 排序池
            isShow: false,                      // “更多”点击切换
        }
    },

    created () {
        this.config.title('出发')
        this.fetchViews()
    },

    methods: {
        // 获取景点信息
        fetchViews() {
            vm.fetch.post({
                url: `/view/detail/${this.id}`,
            })
            .then(res => {
                if(res.res_code === 200){
                    this.imgOrigin = res.prefix 
                    this.init = res.data
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
            this.sortType = 0
            this.page = 0
            this.lists = []
            this.fetchGuides()
        },

        // 获取导游列表
        fetchGuides() {
            vm.fetch.get({
                url: `/view/guides/${this.id}`,
                data: {
                    pageNo: this.page,
                    pageSize: this.pageSize,
                    viewSpotId: this.id,
                    orderBy: this.orderBy,         
                    sortType: this.sortType
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

        // 点击导游列表项,进入创建订单
        createOrder(item,index) {
            let guideInfo = {} 
            
            guideInfo.real_name = item.real_name
            guideInfo.introduce = item.introduce
            guideInfo.visit_length = item.visit_length
            guideInfo.imgOrigin = this.imgOrigin
            guideInfo.image = this.init.resource_path
            guideInfo.resource_path = item.resource_path

            dtCache.setItem('guideInfo',JSON.stringify(guideInfo))

            this.$router.push(`/order/create?lineId=${item.id}&guideId=${item.user_id}`)
        }
    }
}
</script>
<style lang="sass" scoped>
.scenicspotDetail
    background: #fff
// 头部
.headerBox
    padding: 0.5rem 0.6rem 0 0.6rem
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
    // 景区介绍
    .plaseInfo
        background: #fafafa
        padding: 0.6rem
        h3
            font-size: 0.9rem
            margin-bottom: 0.75rem
            font-weight: 300
        p
            font-size: 0.6rem
            line-height: 0.83rem
            height: 1.5rem
            overflow: hidden
        .showIntroduce
            height: auto
            // overflow:
        .moreBtnBox
            display: flex
            justify-content: flex-end
            .moreBtn
                font-size: 0.6rem
                margin-top: 0.1rem
                i
                    font-size: 0.4rem
                    vertical-align: 7%
                    margin-left: .1rem
// 排序规则
.daoyouListCaptionBox
    display: flex
    justify-content: space-between
    height: 1.7rem
    line-height: 1.7rem
    border-top: 0.05rem solid #E7E7E7
    border-bottom: 0.05rem solid #E7E7E7
    font-size: 0.9rem
    padding: 0 0.6rem
    margin-top: 0.75rem
    .title i
        color: #00C99D
        margin-right: 0.27rem
        font-weight: 700
        vertical-align: middle
    .listStyle span
        font-size: 0.65rem
        margin-left: 0.3rem
        i
            font-size: 0.3rem
// 导游列表
.daoyouList li
    margin: 0 0.6rem
    padding: 0.75rem 0
    display: flex
    .imgBox
        height: 3.3rem
        width: 3.3rem
        border-radius: 50%
        margin-right: 0.75rem
        overflow: hidden
        img 
            width: 100%
    .daoyouDesc
        flex: 1
        .nameSexGoal,.path
            display: flex
            justify-content: space-between
        .nameSexGoal .nameSex
            font-size: 0.75rem
            i
                font-size: 0.55rem
        .goal .starNum 
            i
                color: #FF9500
            span
                display: inline-block
                width: 1.27rem
                height: 0.6rem
                background: #FF9500
                border-radius: 0.1rem
                text-align: center
                line-height: 0.6rem
                font-size: 0.55rem
                color: #fff
                vertical-align: 15%
        .intersting
            font-size: 0.6rem
            margin: 0.38rem 0 .3rem 0
            width: 88%
            white-space: nowrap
            overflow: hidden
            text-overflow: ellipsis
        .path
            font-size: 0.5rem
            .path-left
                width: 88%
                white-space: nowrap
                overflow: hidden
                text-overflow: ellipsis
        .money
            color: #EF667C
            // span:first-child
            //     margin-right: 1.5rem  
</style>
<style lang="sass">
</style>