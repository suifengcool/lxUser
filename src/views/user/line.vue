<template>
    <view-box ref="viewBox" body-padding-bottom="55px">
        <div class="lineList bg-gray">
            <sticky scrollBox="vux_view_box_body" :offset="46">
                <tab :line-width=2 active-color='#00ca9d' custom-bar-width="50px">
                    <tab-item selected @on-item-click = 'itemClickHandle'>
                        审核中
                    </tab-item>
                    <tab-item @on-item-click = 'itemClickHandle'>
                        通过审核
                    </tab-item>
                    <tab-item @on-item-click = 'itemClickHandle'>
                        未通过审核
                    </tab-item>
                </tab>
            </sticky>
             <scroller 
                lock-x scrollbar-y 
                @on-scroll-bottom="onScrollBottom" 
                ref="scrollerBottom" 
                :scroll-bottom-offst="200"
                height="-102"
            >
                <div class="wx-box">
                    <div class="wx-item" v-for = '(item, index) in lineList' :key="index">
                        <div class="tab-swiper vux-center">
                            <p v-if="item.line_name" class="wx-title">{{item.line_name}}</p>
                            <p class="wx-right wx-red">{{['待审核','审核通过','审核失败','下线','已删除'][item.line_status]}}</p>
                            <a href="javascript:;" class="weui-media-box weui-media-box_appmsg">
                                <div class="weui-media-box__hd">
                                    <img :src="item.resource_path ? (item.resource_path.indexOf('http')>-1 ? '' : imgOrigin) + item.resource_path : require('../../assets/images/defaultPhoto.png')" alt="">
                                </div>
                                <div class="weui-media-box__bd wx-right">
                                    <x-button v-if="item.line_status==1"  plain type="primary" mini 
                                        @click.native = 'downHandle(item.id,item.line_status)'
                                    >下线发布
                                    </x-button>
                                    <x-button v-else-if="item.line_status==3"  plain type="primary" mini 
                                        @click.native = 'downHandle(item.id,item.line_status)'
                                    >上线发布
                                    </x-button>

                                    <!-- 0=待审核,1=审核通过,2=审核失败,3=下线,4=已删除 -->
                                    <x-button mini type="primary" action-type="button" style="margin-left:5px" @click.native="edit(item)">修改线路</x-button>
                                </div>
                            </a>
                            <i class="iconfont icon-shutdown" @click="del(item.id)"></i>
                        </div>
                    </div>
                    <!-- <load-more :tip="正在加载"></load-more> -->
                </div>
            </scroller>

            <!-- <load-more :show-loading="false" :tip="暂无数据" background-color="#fbf9fe"></load-more> -->
            
            <!-- 新建按钮 -->
            <i class="iconfont icon-plus_fuzhi1" @click="create()"></i>
            <!-- 公用底部 -->
            <wx-footer></wx-footer>
        </div>
    </view-box>
</template>

<script>
var dtCache = window.localStorage
import WxFooter from '../../components/WxFooter'

import { 
    Tabbar,
    TabbarItem, 
    Sticky,
    Tab, 
    TabItem,  
    Divider, 
    XButton, 
    Swiper, 
    SwiperItem, 
    Card, 
    Panel, 
    ViewBox, 
    LoadMore, 
    Scroller, 
    Spinner, 
    Group, 
    Cell, 
    Flexbox, 
    FlexboxItem
} from 'vux'

export default {
    name: 'lineList',

    data () {
        return {
            config: vm.config,            // 配置
            imgOrigin: '',                // 图片origin
            onFetching: false,
            lineList: [],                 // 列表
            pageNo: 1,                    // 分页，第几页
            pageSize: 10,                 // 分页，每页数量
            status: 0,                    // 订单状态，1：待确认 
            lastPage: false,              // 是否为最后一页
            loadOnce: false,
        }
    },

    components: {
        WxFooter,
        Sticky,
        Tab,
        TabItem,        
        Divider,
        XButton,
        Swiper,
        SwiperItem,
        Card,
        Panel,
        ViewBox,
        LoadMore,
        Scroller,
        Spinner,
        Group,
        Cell,
        Flexbox, 
        FlexboxItem,
        Tabbar, 
        TabbarItem
    },

    created () {
        this.config.title('线路管理')
        this.fetchList()
    },

    mounted () {
        this.$nextTick(() => {
          this.$refs.scrollerBottom.reset({top: 0})
        })
    },

    activated () {
        this.$refs.scroller.reset()
    },

    methods: {
        itemClickHandle (val){
            console.log('tab:',val)
            this.status = val
            this.lastPage = false
            this.lineList = []
            this.pageNo = 1
            this.fetchList()
        },

        onScrollBottom () {
            this.pageNo += 1
            this.fetchList()
        },

        // 上下线
        downHandle (lineId,status) {
            if(status != 1){
                status = 1
            }else{
                status = 0
            }
            this.$http.get(`/guide/line/onOrOff?lineId=${lineId}&status=${status}`)
            .then(rst => {
                if(rst.body.res_code === 200){
                    this.lineList = []
                    this.loadOnce = false
                    this.lastPage = false
                    this.pageNo = 1
                    this.fetchList()
                    if(status === 1){
                        this.$vux.toast.show({
                            text: '上线成功',
                            type: 'text'
                        })
                    }else if(status === 0){
                        this.$vux.toast.show({
                            text: '下线成功',
                            type: 'text'
                        })
                    }
                }else{
                    this.$vux.toast.show({
                        text: rst.body.msg,
                        type: 'text'
                    })
                }
            })
            .catch(err => {
                this.$vux.toast.show({
                    text: err.body.msg,
                    type: 'text'
                })
            })
        },

        // 删除线路
        del(lineId){
            this.$http.get(`/guide/line/del?lineId=${lineId}`)
            .then((rst) => {
                if(rst.body.res_code === 200){
                    this.lineList = []
                    this.loadOnce = false
                    this.lastPage = false
                    this.pageNo = 1
                    this.fetchList()
                    this.$vux.toast.show({
                        text: '线路删除成功',
                        type: 'text'
                    })
                }else{
                    this.$vux.toast.show({
                        text: rst.body.msg,
                        type: 'text'
                    })
                }
            })
            .catch(err => {
                this.$vux.toast.show({
                    text: err.body.msg,
                    type: 'text'
                })
            })
        },

        // 修改路线
        edit(item){
            dtCache.clear()
            dtCache.setItem('lineMes',JSON.stringify(item))
            this.$router.push('/user/create?lineId='+ item.id + '&price=' + item.price)
        },

        // 新建线路
        create() {
            this.$router.push('/user/create')
        },

        // 获取列表
        fetchList() {
            if(!this.loadOnce && !this.lastPage){
                this.loadOnce = true
                this.$http.get(`/guide/line/lines?pageNo=${this.pageNo}&status=${this.status}&pageSize=${this.pageSize}`)
                .then(rst => {
                    if(rst.body && rst.body.data){
                        this.lineList = this.lineList.concat(rst.body.data.list)
                        this.pageNo = rst.body.data.pageNumber
                        this.imgOrigin = rst.body.prefix
                    }
                    if(rst.body && rst.body.data && rst.body.data.lastPage){
                        this.lastPage = true
                    }else{
                        this.lastPage = false
                    }

                    this.$nextTick(() => {
                        this.$refs.scrollerBottom.reset()
                    })

                    this.loadOnce = false
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
}
</script>
<style scoped lang="sass">
.weui-media-box__bd button.weui-btn_mini
    padding: 0 15px
.loadAll
    text-align: center
    position: absolute
    bottom: 60px
    left: 0
    font-size: 12px
    color: #979797
    width: 100%
.icon-plus_fuzhi1
    font-size: 50px
    color: #03ca9d
    position: absolute
    bottom: 80px
    right: 10px
</style>
<style lang="sass">
.lineList .weui-media-box__hd
    position: relative
    overflow: hidden
.lineList .weui-media-box__hd img
    position: absolute
    left: 0
    top: 50%
    transform: translateY(-50%)
.lineList .tab-swiper
    position: relative
.lineList .icon-shutdown
    position: absolute
    right: 11px
    top: 0
    display: inline-block
    height: 27px
    color: #777
    width: 41px
    text-align: right
.lineList .wx-item:last-child
    // margin-bottom: 100px
</style>