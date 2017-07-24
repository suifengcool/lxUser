<template>
	<div class="backTop" @click.stop="scrollEvent" v-if="isShow">
	  <img :src="require('../assets/up2.png')" alt="">
	</div>
</template>

<script>
export default {
	name: 'backTop',

	data() {
		return {
			scroll: '',		// 顶部滚动距离
			isShow: false	// 是否显示
		}
	},

	props: {
		content: {          // 滚动区域(class or id, 默认 body)
            type: String,
            default: 'body'
        }
	},

	computed: {
        scrollContent() {
            return document.querySelector(this.content)
        }
    },

	mounted() {
		// 注册滚动事件
		this.scrollContent.addEventListener('scroll', this.handleScroll)
	},

	methods: {
		// 滚动监听
		handleScroll() {
			this.scroll = this.scrollContent.scrollTop
			
			// 切换箭头状态：若滚动区高度 > 1.5倍可视区高度，滚动半屏后切换；否则，滚动 > 0就切换
			if(this.scroll === 0 || this.scroll <this.scrollContent.clientHeight){
				this.isShow = false
			}else{
				if(this.scrollContent.scrollHeight > 1.5 * this.scrollContent.clientHeight) {
					this.isShow = true
				}
			}
			
		},

		// 滚动事件
		scrollEvent () {
			this.scroll2Top()
		},

		// 滚动到顶部
		scroll2Top () {
			// 滚动间距
			let ispeed = Math.floor(-this.scroll / 3)
			let timer = setInterval(() => {
				this.scrollContent.scrollTop = this.scroll + ispeed
				//到达顶部，清除定时器
			    if (this.scroll <= 0) {
					clearInterval(timer)
					this.isShow = false
				}
			}, 0)
		}
	}
}
</script>

<style lang="less" scoped>
.backTop {
	position: fixed;
	right: 0;
	bottom: 10%;
	width: 2rem;
	height: 2rem;
	right: .75rem;
	z-index: 1000;
	img {
		width: 100%;
		height: 100%;
	}
}
</style>