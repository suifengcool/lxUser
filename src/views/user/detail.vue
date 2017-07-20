<template>
    <div id="userDetail" class="userDetail">
        <ul class="content-income">
            <li class="border-bottom" v-for="(item,index) in list">
                <div class="item-right">
                    <h3>{{item.log_name}}</h3><i>{{item.create_time}}</i>
                </div>
                <span>
                    <i v-if="item.trade_type===2">-</i>
                    <i v-else-if="item.trade_type===3">-</i>
                    <i v-else class="on">+</i>
                    {{item.amount}}
                </span>
            </li>
        </ul>
    </div>
</template>

<script>

export default {
    name: 'userDetail',

    data () {
        return {
            config: vm.config,
            list: [],
            lastPage: false,
            pageNo: 1
        }
    },

    created () {
        this.config.title('收支明细')
        this.fetchData()
    },

    methods: {
        fetchData(){
            this.$http.get(`/user/account/log?pageNo=${this.pageNo}`)
            .then(rst => {
                if(rst.body && rst.body.data){
                    this.list = this.list.concat(rst.body.data.list)
                    this.lastPage = rst.body.data.lastPage
                    this.pageNo += 1
                }
                if(!this.lastPage && this.list.length <= rst.body.data.totalRow){
                    this.fetchData()
                }
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
</script>

<style scoped lang="sass">
.userDetail ul li 
    padding: 10px .75rem 5px
    display: flex
    .item-right
        flex: 1
        h3
            font-size: 14px
            color: #333
            font-weight: 300
            line-height: 1.05rem
            height: 1.05rem
        i 
            font-size: 12px
            color: #979797
            height: .85rem
            line-height: .85rem
            margin-bottom: .6rem
            font-style: normal
    span 
        margin-top: 12px
        font-size: 14px
        display: inline-block
        height: 1.25rem
        line-height: 1.25rem
        width: 50px
        text-align: right
        i 
            vertical-align: 2%
            margin-right: .05rem
    .on
        color: #F6365B
</style>