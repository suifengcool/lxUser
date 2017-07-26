<template>
    <vm-layout id="comment">
        <!-- 头部 -->
        <div class="header">
            <div class="msg">
                <div class="img">
                    <img :src="init.resource_path.indexOf('http')>-1 ? init.resource_path : imgOrigin + init.resource_path" alt="">
                </div>
                <div class="msg-main">
                    <h3>导游：{{init.real_name}}</h3>
                    <div class="star-box cf">
                        <span class="fl star">
                            <i
                                :class="['iconfont', {'red': stars > i}, Math.round(stars) > i ? 'icon-xing2' : 'icon-xing1',]"
                                v-for="(star, i) in [0,1,2,3,4]"
                            ></i>

                        </span>
                        <span class="score fl">{{stars}}</span>
                        <span class="num fl">{{init.orderCount}}单</span>
                    </div>
                    <p>旅行时长：2小时</p>
                    <!-- <p>擅长内容：古建筑 胡同游 书画展</p> -->
                </div>
            </div>
            <div class="desc">
                导游简介：{{init.introduce}}
            </div> 
        </div> 

        <!-- 评价 -->
        <div class="content" @click.self="score=0">
            <h3>匿名评价导游</h3>
            <p class="star" @click.self="score=0">
                <i
                    :class="['iconfont', {'red': score > i}, score > i ? 'icon-xing2' : 'icon-xing1']"
                    v-for="(star, i) in [0,1,2,3,4]"
                    @click="changeStar(star, i)"
                ></i>
            </p>
            <textarea v-model= "content" placeholder="请输入对该导游的评价~" maxlength="100"></textarea>
            <span><i :class="{on:num==100}">{{num}}</i>/100</span>
        </div>

        <!-- 按钮 -->
        <button type="button" @click="save()">提交</button>
    </vm-layout>
</template>
<script>
export default {
    name: 'confirm',

    data () {
        return {
            config: vm.config,                        // 配置
            orderNum: this.$route.query.orderNum,     // 订单号
            init: {},                                 // 数据
            guideId: '',                              // 导游id
            score: 0,                                 // 分数(点击星星评论)
            stars: 3.4,                                 // 平均分数
            num: 0,                                   // 已输入字数
            content: '',                              // 评论内容
            starList: [0.5,1.5,2.5,3.5,4.5]
        }
    },

    created () {
        this.config.title('已完成订单')
        this.fetchData()
        // if(parseInt(this.stars) != this.stars){
        //     console.log(Math.floor(this.stars))
        //     $('.star i').eq(Math.floor(this.stars) + 1).addClass('icon-xing3').removeClass('icon-xing1')
        // }
    },

    watch: {
        content: function(val,oldVal){
            this.num = val.length
            if(this.num === 100){
                this.$dialog.toast({mes: '已超过字数限制'})
            }
        },

        score: function(val,oldVal){
            console.log('score:',val)
        }
    },

    methods: {
        // 获取订单信息
        fetchData(){
            this.$http.get(`/user/order/detail?oid=test1234&orderNum=${this.orderNum}`)
            .then(res => {
                if(res.body.res_code === 200){
                    this.imgOrigin = res.body.prefix 
                    this.init = res.body.data
                    this.stars = res.body.data.scroe
                    this.guideId = res.body.data.guide_user_id
                }else{
                    this.$dialog.toast({mes: res.body.msg})
                }
            })
            .catch(err => this.$dialog.toast({mes: err.body.msg}))
        },

        // 点击星星
        changeStar(star,i){
            this.score = i +1
        },

        // 保存评论
        save(){
            if (!this.score) {
                this.$dialog.toast({mes: "请勾选星级"})
                return
            }
            if (!this.content) {
                this.$dialog.toast({mes: "请填写评论内容"})
                return
            }
            this.$http.post('/user/comment/save',{
                guideId: this.guideId,
                score: this.score,
                content: this.content,
                orderNum: this.orderNum
            })
            .then(res => {
                if(res.body.res_code === 200){
                    this.$dialog.toast({
                        mes: '发表评论成功',
                        timeout: 1500,
                        callback: () => {
                            this.$router.replace('/order/list')
                        }
                    })
                }else{
                    this.$dialog.toast({mes: res.body.msg})
                }
            })
            .catch(err => this.$dialog.toast({mes: err.body.msg}))
        },
    }
}
</script>

<style scoped lang="sass">
// 头部
.header
    padding: .99rem 0 0 .79rem
    .msg  
        display: flex
        .img    
            height: 4.38rem
            width: 4.38rem
            border-radius: 50%
            background: #ccc
            margin-right: .81rem
            overflow: hidden
            img 
                width: 100%
        .msg-main
            flex: 1
            h3
                height: .9rem
                line-height: .9rem
                font-weight: 300
                font-size: .75rem
                color: #333
                margin: .4rem 0 .5rem 0
            .star-box
                height: .65rem
                line-height: .65rem
                font-size: .55rem
                margin: .15rem 0 .45rem 0
                .star
                    i 
                        font-size: .6rem
                        margin-right: .1rem
                    .red
                        color: #FF9500
                .score
                    width: 1.27rem
                    height: .6rem
                    line-height: .6rem
                    background: #FF9500
                    color: #fff
                    text-align: center
                    font-size: .55rem
                    margin: 0 .69rem 0 .1rem
                .num
                    color: #000
            p 
                height: .85rem
                line-height: .85rem
                font-size: .6rem
    .desc
        line-height: .75rem
        margin-top: .6rem
        font-size: .6rem
// 评价区域
.content
    margin-top: 1.45rem
    text-align: center
    color: #979797
    position: relative
    h3
        height: .83rem
        line-height: .83rem
        font-size: .6rem
        color: #333
        text-align: center
        position: relative
        font-weight: 300
        &:before,&:after
            content: ''
            display: inline-block
            position: absolute
            top: 50%
            transform: translateY(-50%)
            height: 1px 
            transform: scaleY(.5)
            background: #dedede
            width: 4.5rem
        &:after
            right: 15%
        &:before
            left: 15%
    p   
        margin: 1rem 0 .85rem 0
        height: 2rem
        line-height: 2rem
        i 
            font-size: 1.98rem
        .red
            color: #FF9500
    textarea
        width: 11.75rem
        height: 7.45rem
        border-color: #dedede
        padding: .5rem
        box-sizing: border-box
        font-size: .65rem
    span
        position: absolute
        bottom: .5rem
        right: 4rem
    .on 
        color: red

// 按钮
button
    width: 8.37rem
    height: 1.9rem
    line-height: 1.9rem
    display: block
    margin: .73rem auto 
    color: #fff
    border: none
    border-radius: .2rem
    background: #03ca9d
</style>
<style lang="sass">
.vm-flexview
    background: #fff
</style>