<template>
    <div id="userMoney" class="userMoney">
        <ul>
            <li class="border-bottom">
                <span>可用余额</span>
                <i>{{total}}</i>
            </li>
            <li class="border-bottom">
                <span>冻结余额</span>
                <i>{{deposit}}</i>
            </li>
            <li class="border-bottom" @click="goDetail">
                <span>收支明细</span>
                <i class="iconfont icon-right"></i>
            </li>
            <li class="border-bottom" @click="show()">
                <span>申请提现</span>
                <i class="iconfont icon-right"></i>
            </li>
        </ul>
        <div v-if="showPop" class="btn">
            <input type="number" placeholder="请输入提现金额" v-model="amount"><i>元</i>
            <button type="button" @click="getCash">确认提现</button>
        </div>
        <h3>提现说明：</h3>
        <p>1.目前提现只支持提现到微信零钱</p>
        <p>2.提现日期固定为每周三，一周仅限一次</p>
        <p>3.若产生交易纠纷，客户投诉，该笔订单的费用会暂时被冻结，等待平台审核通过后方可提现</p>
        <p>4.对提现操作有任何疑问，请在工作日内(09:00-19:00)在公众号留言，会有专人第一时间为您处理</p>
    </div>
</template>

<script>
import { TransferDom , Popup} from 'vux'
export default {
    name: 'userMoney',

    directives: {
        TransferDom
    },

    data () {
        return {
            config: vm.config,        // 配置
            deposit: null,            // 冻结金额
            total: null,              // 余额
            amount: null,
            showPop: false
        }
    },

    components: {
        Popup
      },

    created () {
        this.config.title('余额')
        this.fetchInfo()
    },

    methods: {
        // 获取用户信息
        fetchInfo(){
            this.$http.get('/user/account/info')
            .then(rst => {
                this.total = rst.body && rst.body.data && rst.body.data.available_amount
                this.deposit = rst.body && rst.body.data && rst.body.data.frozen_amount
            })
            .catch(err => {
                this.$vux.toast.show({
                    text: err.body.msg,
                    type: 'text'
                })
            })
        },

        // 收支明细
        goDetail(){
            this.$router.push('/user/detail')
        },

        // 提现
        getCash(){
            if(!this.amount){
                this.$vux.toast.show({
                    text: '请输入提现金额',
                    type: 'text'
                })
                return
            }
            if(this.amount > this.total){
                this.$vux.toast.show({
                    text: '已超出提现金额',
                    type: 'text'
                })
                return
            }
            this.$http.get(`/user/account/getCash?amount=${this.amount}`)
            .then(rst => {
                this.$vux.toast.show({
                    text: rst.body.msg,
                    type: 'text'
                })
                if(rst.body.res_code === 200){
                    this.showPop = false
                    this.fetchInfo()
                }
            })
            .catch(err => {
                this.$vux.toast.show({
                    text: err.body.msg,
                    type: 'text'
                })
            })
        },

        show(){
            this.showPop = !this.showPop
        }
    }
}
</script>

<style scoped lang="sass">
.userMoney
    ul 
        li 
            height: 45px
            line-height: 45px
            padding: 0 15px 
            display: flex
            justify-content: space-between
            color: #333
            font-size: 14px
        i 
            font-style: normal
            color: #979797
    h3
        margin: 30px 0 10px
        font-weight: 300
        padding: 0 15px
        font-size: 14px
    p 
        padding: 0 15px
        line-height: 26px
        font-size: 13px
.get-cash-box   
    position: absolute
    left: 0
    top: 0
    width: 100%
    height: 100%
    background: #777
    .pop-box
        width: 300px
        height: 150px
        margin: 100px auto
        background: #fff
        padding: 30px 0
        h3
            text-align: center
        .btn
            display: flex
            button
                border: none
                text-align: center
                width: 50%
                height: 40px
                line-height: 40px
                &:first-child
                    border-right: 1px solid #dedede
.btn
    height: 200px
    position: relative
    input 
        width: 50%
        display: block
        height: 45px
        border: 1px solid #dedede
        margin: 20px auto
        text-align: center
        outline: none
    button
        border: none
        background: #03ca9d
        color: #fff
        height: 45px
        margin: 0 auto
        display: block
        width: 92%
        border-radius: 6px
        outline: none
    i 
        position: absolute
        top: 13px
        right: 68px
        font-style: normal
</style>