<template>
	<view class="">
		<view class="navBar">
			<view v-for="(item, index) in navList" :key="index" @click="handleClick(index)" class="navItem">
				<image :src="activeIndex === index ? item.activeIcon : item.icon" class="icon" />
			</view>
		</view>
		<view class="navHeight">

		</view>
	</view>
</template>

<script setup>
	import Cache from '@/utils/cache';
	import {
		LOGIN_STATUS,
		USER_INFO,
	} from '@/config/cache';
	import {
		useI18n
	} from 'vue-i18n'
	const {
		t,
		locale
	} = useI18n()
	// import {
	// 	defineProps,
	// 	defineEmits
	// } from 'vue'

	// 导航列表数据
	const props = defineProps({
		activeIndex: {
			type: Number,
			default: 0
		},
	})

	const emit = defineEmits(['update:activeIndex'])

	// 导航列表数据
	const navList = [{
			icon: "/static/navBar/home.png",
			path: "/pages/home/index",
			activeIcon: "/static/navBar/activeHome.png",
			auth: false
		},
		{
			icon: "/static/navBar/booking.png",
			path: "/pages/appointment/index",
			activeIcon: "/static/navBar/activeBooking.png",
			auth: false
		},
		{
			icon: "/static/navBar/user.png",
			path: "/pages/user/index",
			activeIcon: "/static/navBar/activeUser.png",
			auth: true
		},
	]

	// 处理点击导航项事件
	const handleClick = (index) => {
		// 通过 emit 更新父组件的 activeIndex
		emit('update:activeIndex', index)
		if (props.activeIndex === index) return
		// 跳转到对应路径
		if (navList[index].auth) {
			if (!Cache.has(USER_INFO)) {

				uni.showToast({
					title: t('login.prompt'),
					icon: 'none',
					duration: 1000
				});
				setTimeout(function() {
					uni.navigateTo({
						url: "/pages/login/index",
						animationType: 'none'
					})
				}, 1000);

				return
			}
		}
		uni.navigateTo({
			url: navList[index].path,
			animationType: 'none'
		})
	}
</script>

<style lang="scss" scoped>
	.navBar {
		display: flex;
		flex-direction: row;
		justify-content: space-around;
		align-items: center;
		background-color: $theme-color;
		padding: 15px 0;
		border-top: 1px solid #eaeaea;
		position: fixed;
		bottom: 0;
		width: 100%;
		box-shadow: 0 -2px 4px rgba(0, 0, 0, 0.1);
		border-radius: 40rpx 40rpx 0 0;
	}

	.navItem {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		flex: 1;
		cursor: pointer;
	}

	.icon {
		width: 42rpx;
		height: 45rpx;
	}

	.navHeight {
		height: 100rpx;
	}
</style>