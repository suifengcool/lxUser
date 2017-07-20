<!--主入口 -->
<template>
	<div id="app" style="height:100%;">
		<!-- loading -->
    	<!-- <nprogress-container></nprogress-container> -->
		<!-- 路由 页面切换 -->
    	<transition name="fade" mode="out-in">
    		<router-view id="content" :key="$route.fullPath"></router-view>
    	</transition>
  	</div>
</template>

<script>
import './assets/css/common.css'
import { mapGetters, mapActions } from 'vuex'

export default {
	computed: mapGetters({
	    userInfo: 'userInfo'
	}),

	beforeMount () {
		this.loginHandle()
	},
	
	methods: {
		...mapActions([
			'setUser'
		]),

		loginHandle () {
		    this.$http.post('/guide/login').then((rst) => {
		    	if(rst && rst.body && rst.body.data && rst.body.data.guide_status === 1){
					this.setUser({isLogin:true, adminInfo:rst.body.data.data})
					this.$router.push('/')
				}else{
					this.setUser({isLogin:false, adminInfo:null})
					this.$router.push('/info')
				}
		    },(err) => {
		      	this.setUser({isLogin:false, adminInfo:null})
		      	this.$vux.toast.show({
		      		type: 'text',
		      		text: '服务端错误'
		      	})
		    })
		}
	}
}
</script>

<style>
.bg-fff{
	background-color: #fff;
}
.bg-gray{
	background-color: #f7f7f7;
}
.wx-box .wx-item{
	padding: 15px 10px 0;
	font-size: 14px;
}
.wx-box .wx-item .tab-swiper{
	background-color: #fff;
	border-radius: 5px;
	padding: 10px;
	border: 1px solid #fff;
	box-shadow:-5px 0 5px #eee, 5px 0 5px #eee,0 -5px 5px #eee,0 5px 5px #eee
}
.wx-title{
	color: #333333;
	font-weight: 500;
	width: 80%;
	white-space: nowrap;
	text-overflow: ellipsis;
	overflow: hidden;
}
.wx-right{
	text-align: right;
}
.wx-green{
	color: #07cd9c;
}
.wx-red{
	color: #ef667c;
}
.wx-item .weui-media-box__bd, .wx-item .weui-media-box__bd h4{
	color: #666666;
	font-weight: normal;
}
.weui-media-box_appmsg .weui-media-box__hd{
	flex: 1;
}
.wx-item .weui-media-box_appmsg .weui-media-box__bd{
	flex: 2;
}
.wx-item .weui-media-box__hd img{
	width: 100%;
}
.wx-item .weui-media-box{
	padding: 10px 0 0px;
}
.vux-tab .vux-tab-item{
	font-size: 16px!important;
}
.wx-item .weui-media-box:before{
	left: 0;
}
#app .weui-btn_plain-primary{
	color: #00ca9d;
    border: 1px solid #00ca9d;
}
#app .weui-btn_primary {
	background-color: #00ca9d;
}
#app button.weui-btn_plain-primary,#app input.weui-btn_plain-primary,#app button.weui-btn_plain-default,#app input.weui-btn_plain-default{
	background-color: transparent;
}
/*#app .vux-tab .vux-tab-item.vux-tab-selected,#app .weui-tabbar__item.weui-bar__item_on .weui-tabbar__icon,#app .weui-tabbar__item.weui-bar__item_on .weui-tabbar__icon > i,#app .weui-tabbar__item.weui-bar__item_on .weui-tabbar__label{
	color: #00ca9d!important;
}*/
/*#app .vux-tab-ink-bar{
	background-color: #00ca9d!important;
}*/
</style>
