<template>
    <div id="userCreate" class="userCreate" style="padding-bottom:80px">
        <!-- banner -->
        <div class="banner"></div>
        
        <group class="border-bottom">
            <x-input title="线路名称" placeholder-align="right" placeholder="请输入线路名称" v-model.trim="lineName"></x-input>
            <x-input title="旅游景点" placeholder-align="right" placeholder="请输入旅游景点" v-model.trim="viewName"></x-input>
            <x-input title="接待人数" placeholder-align="right" placeholder="请输入人数" v-model="maxCount" type="number"></x-input>
            <x-input title="行程时长" placeholder-align="right" placeholder="请输入行程时长" v-model="vLength" type="number"></x-input>
            <div v-if="price && Number(price) > 0" class="pay">
                <span>行程费用</span>
                <i>{{price}}元</i>
            </div>
            <x-input title="讲解分类" placeholder-align="right" placeholder="请填写分类" v-model.trim="lineTye"></x-input>
        </group>

        <div class="desc-travel">
            <h3>行程介绍</h3>
            <x-textarea :max="200" :rows="1" autosize name="description" v-model.trim="content"></x-textarea>
        </div>
        <div class="desc-myself">
            <h3>自我介绍</h3>
            <x-textarea :max="200" :rows="1" autosize name="description" v-model.trim="intro"></x-textarea>
        </div>

        <!-- 按钮 -->
        <tabbar>
            <tabbar-item @click.native="confirm"><span slot="label">提交审核</span></tabbar-item>
        </tabbar>

        <div v-if="showDatePop" class="pop-mask" @click.self="showDatePop=false">
            <div class="work-days">
                <p>已选择日期：</p>
                <span v-for="(item,index) in workDatess" @click="delItem(item,index)">
                    {{item}}<i class="iconfont icon-icon-test1"></i>
                </span>
            </div>
            <div class="ui-datepicker-wrapper">
                <div class="ui-datepicker-header">
                    <a href="javaScript:;" class="ui-datepicker-btn ui-datepicker-prev-btn" @click.stop="edit()">&lt;</a>
                    <a href="javaScript:;" class="ui-datepicker-btn ui-datepicker-next-btn" @click.stop="edit(1)">&gt;</a>
                    <span class="ui-datepicker-curr-month">{{date}}</span>
                </div>
                <div class="ui-datepicker-body">
                    <div class="ui-datepicker-body-header">
                        <span v-for="(item,index) in weekList">{{item}}</span>
                    </div>
                    <div class="ui-datepicker-body-days">
                        <span v-for="(item,index) in monthData" @click="choose(item)">{{item}}</span>
                    </div>
                </div>
            </div> 
        </div>
    </div>
</template>

<script>


import { Tabbar, TabbarItem, Datetime, Group, XButton, XInput, XTextarea} from 'vux'
export default {
    name: 'userCreate',

    data () {
        return {
            config: vm.config,                               // 配置
            lineData:{},                                     // locastorage
            lineId: this.$route.query.lineId || '',          // 线路id
            price: this.$route.query.price ,                 // 价格
            viewName: '',                                    // 景点名称 
            maxCount: '',                                    // 接待人数
            workDays: '',                                    // 接待的日期
            workTime: '',                                    // 可接待的时间
            content: '',                                     // 线路内容
            vLength: '',                                     // 预计浏览时间
            intro: '',                                       // 自我介绍
            lineTye: '',                                     // 线路类型
            lineName: '',                                    // 线路名称
            showDatePop: false,                              // 日期弹框
            weekList: ['一','二','三','四','五','六','日'],
            monthData: [],
            monthData2: [],
            year:'',
            month:'',
            date:'',
            workDatess: []
        }
    },

    components: {
        Tabbar,
        TabbarItem,
        Datetime,
        Group,
        XButton,
        XInput,
        XTextarea
    },

    created () {
        this.config.title('旅游内容')
        var dtCache = window.localStorage

        this.lineData = JSON.parse(dtCache.getItem('lineMes'))
        if(this.$route.query.lineId){
            this.viewName = this.lineData.view_spot_name 
            this.maxCount = this.lineData.max_count
            this.workDays = this.lineData.work_date
            this.workTime = this.lineData.work_time
            this.content = this.lineData.view_line_content
            this.vLength = this.lineData.visit_length
            this.intro = this.lineData.guide_introduce
            this.lineTye = this.lineData.line_type
            this.lineName = this.lineData.line_name
        }
    },

    mounted() {
        var today = new Date()
        this.year = today.getFullYear()
        this.month = today.getMonth() + 1;
        this.date = this.year + '-' + this.month
        this.fetchMonthData()
    },

    methods: {
        change (value) {
            console.log('change', value)
        },

        // vux基础上封装toast
        toast(mes){
            this.$vux.toast.show({
                text: mes,
                type: 'text'
            })
        },

        // 数组去重
        editAwrray(arr) {
            let newArr = [], obj = {}
            arr.forEach((item, index) =>{
                if(obj[item]){
                    return
                }else{
                    obj[item] = 1
                    newArr.push(item)
                }
            })
            arr = newArr
            return arr
        },

        // 删除多余日历
        delItem(item,index) {
            this.workDatess.splice(index,1)
        },

        // 审核
        confirm() {
            if(!this.viewName){
                this.toast('请填写景点名称')
                return
            }
            if(!this.lineName){
                this.toast('请填写线路名称')
                return
            }
            if(!this.maxCount){
                this.toast('请填写接待人数')
                return
            }
            if(!this.content){
                this.toast('请填写线路内容')
                return
            }
            if(!this.vLength){
                this.toast('请填写游览时长')
                return
            }
            if(!this.intro){
                this.toast('请填写自我介绍')
                return
            }
            if(!this.lineTye){
                this.toast('请填写自我介绍')
                return
            }
            if(!this.intro){
                this.toast('请填写讲解分类')
                return
            }
            this.$http.post('/guide/line',{
                lineId:this.lineId,
                viewName:this.viewName,
                maxCount:this.maxCount,
                workDays:this.workDatess,
                workTime:this.workTime,
                content:this.content,
                vLength:this.vLength,
                intro:this.intro,
                lineTye:this.lineTye,
                line_name:this.lineName
            })
            .then((rst) => {
                if(rst.body.res_code === 200){
                    this.$router.push('/user/line')
                    this.$vux.toast.show({
                        text: '新建线路成功',
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

        choose(item){
            this.date = this.year + '-' + this.month + '-' + item
            this.workDatess.push(this.date)
            this.workDatess = this.editAwrray(this.workDatess)
        },

        fetchMonthData() {
            var firstDay = new Date(this.year, this.month-1, 1);
            var firstDayWeekDay = firstDay.getDay();
            if(firstDayWeekDay === 0) firstDayWeekDay = 7;

            this.year = firstDay.getFullYear();
            this.month = firstDay.getMonth() + 1;

            var lastDayLastMonth = new Date(this.year , this.month -1, 0);
            var lastDayOfLastMonth = lastDayLastMonth.getDate();

            var preMonthDayCount = firstDayWeekDay - 1;

            var lastDay = new Date(this.year, this.month , 0);
            var lastDate = lastDay.getDate();

            for(var i=0; i<7*6; i++){
                var date = i + 1 - preMonthDayCount;
                var showDate = date;
                var thisMonth = this.month;

                // 上一月
                if(date <= 0){
                    thisMonth = this.month -1;
                    showDate = lastDayOfLastMonth + date;
                }
                // 下一月
                else if (date > lastDate) {
                    thisMonth = this.month + 1;
                    showDate = showDate - lastDate;
                };

                if(thisMonth === 0) thisMonth = 12;
                if(thisMonth === 13) thisMonth = 1;

                this.monthData.push(showDate)
            }
        },

        edit(type) {
            if(type){
                this.month += 1
                if(this.month === 13){
                    this.month = 1
                    this.year += 1
                }
            }else{
                this.month += -1
                if(this.month === 0){
                    this.month = 12
                    this.year += -1
                }
            }
            this.date = this.year + '-' + this.month 
            this.monthData = []
            this.fetchMonthData()
        }
    }
}
</script>

<style scoped lang="sass">
.userCreate
    .banner
        height: 125px
        background: url(../../assets/images/banner-create.jpg) center center no-repeat
        background-size: cover
    .desc-travel,.desc-myself,.workDays
        padding: 0 15px
    h3
        font-size: 13px
        color: #333
        font-weight: normal
        height: 32px
        line-height: 32px
    input 
        display: block
        height: 47px
        border: none
        border: 1px solid #dedede
        width: 100%
        outline: none
    .border-bottom
        margin-bottom: 5px
    .workDays-input
        display: inline-block
    .workDays
        display: flex
        height: 45px
        line-height: 45px
        span
            width: 100px
        input 
            flex: 1
            border: none
            text-align: right
    .pop-mask
        position: absolute
        left: 0
        top: 0
        width: 100%
        height: 100%
        background: #dedede
        opacity: 1
        z-index: 1000
        .pop-box 
            width: 90%
            height: 80%
            margin: 10% auto
            background: #fff
.pay
    height: 45px
    line-height: 45px
    padding: 0 15px
    display: flex
    justify-content: space-between
    i 
        font-style: normal
        color: #979797
.pay
    position: relative
    &:before
        content: ''
        position: absolute
        top: 0
        left: 0
        width: 100%
        height: 1px
        transform: scaleY(.5)
        background: #dedede
</style>
<style lang="sass">
.userCreate .vux-tabbar-simple .weui-tabbar__label
    background: #03ca9d
    color: #fff 
    font-size: 14px
.userCreate .weui-cells
    font-size: 13px
    margin-top: 0
    line-height: 25px
.userCreate .vux-x-textarea
    border: 1px solid #dedede
.userCreate .weui-cell:before
    left: -15px
.userCreate .vux-x-textarea:before
    border: none
</style>
<style lang="sass" scoped>
.ui-datepicker-wrapper
    width: 90%
    font-size: 16px
    color: #666
    background: #fff
    box-shadow: 2px 2px 8px 2px rgba(128,128,128,.3)
    text-align: center
    margin: 0 auto
    .ui-datepicker-header
        padding: 0 20px
        height: 50px
        line-height: 50px
        text-align: center
        background: #f0f0f0
        border-bottom: 1px solid #ccc
        font-weight: bold
        .ui-datepicker-btn
            font-family: serif
            font-size: 20px
            width: 20px
            height: 50px
            line-height: 50px
            color: #1abc9c
            text-align: center
            cursor: pointer
            text-decoration: none
        .ui-datepicker-prev-btn
            float: left
        .ui-datepicker-next-btn
            float: right
    .ui-datepicker-body
        span
            width: 14.2857%
            height: 2.2rem
            line-height: 2.2rem
            background: #fff
            float: left
.work-days
    margin-bottom: 10px
    span
        display: inline-block
        width: 23%
        padding-left: 3px
        box-sizing: border-box
        position: relative
        font-size: 13px
        background: #ccc
        margin-right: 2%
        i 
            position: absolute
            right: -1px
            top: -2px
            font-size: 7px
</style>