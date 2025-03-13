<template>
	<view class="statusBar" :style="{
            height: statusBarHeight + 'px',
            backgroundColor: useThemeColor ? themeColor : '#ffffff'
        }"></view>
</template>

<script>
	export default {
		props: {
			// 父组件通过该参数决定背景颜色
			useThemeColor: {
				type: Boolean,
				default: false, // 默认背景为白色
			},
		},
		data() {
			return {
				statusBarHeight: '', // 系统状态栏高度
				themeColor: '#6AE75A', // 主题颜色
			};
		},
		created() {
			// 获取系统状态栏高度
			this.statusBarHeight = uni.getSystemInfoSync().statusBarHeight;
			// 设置主题颜色，$theme-color是scss全局变量
			// 判断是否是微信小程序环境
			const platform = uni.getSystemInfoSync().uniPlatform;
			console.log(platform)
			if (platform !== 'mp-weixin') {
				// 非微信小程序环境时设置主题颜色
				this.themeColor =
					getComputedStyle(document.documentElement).getPropertyValue('--theme-color') || '#000000';
			} else {
				// 微信小程序环境下不赋值
				this.themeColor = '';
			}
		},
	};
</script>

<style lang="scss" scoped>
	.statusBar {
		width: 100%;
	}
</style>