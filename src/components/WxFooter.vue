<template>
	<div class="foot-bar">
    	<tabbar>
			<tabbar-item :selected = "$route.path == '/user/line'" link="/user/line">
				<i slot="icon" class="iconfont icon-daishouhuo"></i>
				<span slot="label">线路</span>
			</tabbar-item>
			<tabbar-item :selected = "$route.path == '/order'" link="/order"> 
				<i slot="icon" class="iconfont icon-icon-2"></i>
				<span slot="label">订单</span>
			</tabbar-item>
			<tabbar-item :selected = "$route.path == '/'" link="/">
				<i slot="icon" class="iconfont icon-wode"></i>
				<span slot="label">我的</span>
			</tabbar-item>
	    </tabbar> 
  	</div>
</template>

<script>
import { Tabbar, TabbarItem, Group, Cell } from 'vux'

export default {
	components: {
		Tabbar,
    	TabbarItem,
    	Group,
    	Cell
  	}
}
</script>

<style lang="sass">
.foot-bar .weui-tabbar__icon
	margin-bottom: 5px
.foot-bar .weui-tabbar__label
	line-height: 2.1
.foot-bar .weui-tabbar__item 
	padding: 0
.foot-bar .weui-tabbar__icon > sup
	top: 0
.foot-bar .weui-tabbar__item.weui-bar__item_on .weui-tabbar__icon, .foot-bar .weui-tabbar__item.weui-bar__item_on .weui-tabbar__icon > i, .foot-bar .weui-tabbar__item.weui-bar__item_on .weui-tabbar__label p
	color: #03ca9d
.foot-bar .weui-tabbar__item.weui-bar__item_on .weui-tabbar__icon, .foot-bar .weui-tabbar__item.weui-bar__item_on .weui-tabbar__icon > i, .foot-bar .weui-tabbar__item.weui-bar__item_on .weui-tabbar__label
	color: #03ca9d
.foot-bar .weui-tabbar__item.weui-bar__item_on .weui-tabbar__icon,.foot-bar .weui-tabbar__item.weui-bar__item_on .weui-tabbar__icon > i, .foot-bar .weui-tabbar__item.weui-bar__item_on .weui-tabbar__label
	color: #03ca9d
.foot-bar.weui-tabbar__item.weui-bar__item_on .weui-tabbar__icon,.foot-bar  .weui-tabbar__item.weui-bar__item_on .weui-tabbar__icon > i, .foot-bar .weui-tabbar__item.weui-bar__item_on .weui-tabbar__label
	color: #03ca9d
</style>