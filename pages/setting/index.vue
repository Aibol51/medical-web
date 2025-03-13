<template>
	<view class="settings-container">
		<view class="settings-header">
			<text class="settings-title">{{ $t('user.profileSettings') }}</text>
		</view>

		<view class="settings-content">
			<view class="settings-group">
				<view v-for="(item, index) in cellList" :key="index" class="settings-item"
					hover-class="settings-item-hover" @click="goToDetail(index)">
					<view class="item-left">
						<view class="item-icon">
							<uv-icon :name="item.icon" size="44" color="#8C6E63"></uv-icon>
						</view>
						<text class="item-title">{{ item.title }}</text>
					</view>
					<view class="item-right">
						<text v-if="item.value" class="item-value">{{ item.value }}</text>
						<uv-icon v-if="item.isLink" name="arrow-right" size="36" color="#CCCCCC"></uv-icon>
					</view>
				</view>
			</view>

			<!-- 			<view class="settings-group mt-20">
				<view class="settings-item" hover-class="settings-item-hover" @click="toggleLanguage">
					<view class="item-left">
						<view class="item-icon">
							<uv-icon name="globe" size="44" color="#8C6E63"></uv-icon>
						</view>
						<text class="item-title">{{ $t('user.language') }}</text>
					</view>
					<view class="item-right">
						<text class="item-value">{{ currentLanguage }}</text>
						<uv-icon name="arrow-right" size="36" color="#CCCCCC"></uv-icon>
					</view>
				</view>
				
				<view class="settings-item" hover-class="settings-item-hover" @click="toggleTheme">
					<view class="item-left">
						<view class="item-icon">
							<uv-icon name="moon" size="44" color="#8C6E63"></uv-icon>
						</view>
						<text class="item-title">{{ $t('user.darkMode') }}</text>
					</view>
					<view class="item-right">
						<uv-switch v-model="isDarkMode" size="24" activeColor="#8C6E63"></uv-switch>
					</view>
				</view>
			</view>
			
			<view class="settings-group mt-20">
				<view class="settings-item" hover-class="settings-item-hover" @click="goToPrivacy">
					<view class="item-left">
						<view class="item-icon">
							<uv-icon name="shield" size="44" color="#8C6E63"></uv-icon>
						</view>
						<text class="item-title">{{ $t('user.privacy') }}</text>
					</view>
					<view class="item-right">
						<uv-icon name="arrow-right" size="36" color="#CCCCCC"></uv-icon>
					</view>
				</view>
				
				<view class="settings-item" hover-class="settings-item-hover" @click="clearCache">
					<view class="item-left">
						<view class="item-icon">
							<uv-icon name="trash" size="44" color="#8C6E63"></uv-icon>
						</view>
						<text class="item-title">{{ $t('user.clearCache') }}</text>
					</view>
					<view class="item-right">
						<text class="item-value" v-if="cacheSize">{{ cacheSize }}</text>
						<uv-icon name="arrow-right" size="36" color="#CCCCCC"></uv-icon>
					</view>
				</view>
			</view>
			
			<view class="settings-group mt-20">
				<view class="settings-item" hover-class="settings-item-hover" @click="goToAbout">
					<view class="item-left">
						<view class="item-icon">
							<uv-icon name="info-circle" size="44" color="#8C6E63"></uv-icon>
						</view>
						<text class="item-title">{{ $t('user.about') }}</text>
					</view>
					<view class="item-right">
						<text class="item-value">v{{ appVersion }}</text>
						<uv-icon name="arrow-right" size="36" color="#CCCCCC"></uv-icon>
					</view>
				</view>
			</view>
		 -->
		</view>
	</view>
</template>

<script setup>
	import {
		ref,
		computed
	} from "vue"
	import {
		useI18n
	} from 'vue-i18n'

	const {
		locale,
		t
	} = useI18n()
	const isDarkMode = ref(false)
	const cacheSize = ref('2.5MB')
	const appVersion = ref('1.0.0')

	const cellList = [{
			title: t('user.editInformation'),
			icon: "edit-pen",
			isLink: true,
			value: "",
			path: "/pages/setting/components/editProfile"
		},
		{
			title: t('user.editPassword'),
			icon: "lock-open",
			isLink: true,
			value: "",
			path: "/pages/setting/components/editPassword"
		}
	]

	const currentLanguage = computed(() => {
		return locale.value === 'zh-CN' ? '中文' : 'English'
	})

	const goToDetail = (index) => {
		uni.navigateTo({
			url: cellList[index].path,
			animationType: 'slide-in-right'
		})
	}

	const toggleLanguage = () => {
		uni.showActionSheet({
			itemList: ['中文', 'English'],
			success: function(res) {
				if (res.tapIndex === 0) {
					locale.value = 'zh-Hans'
				} else {
					locale.value = 'en'
				}
				uni.showToast({
					title: t('user.languageChanged'),
					icon: 'success'
				})
			}
		})
	}

	const toggleTheme = () => {
		isDarkMode.value = !isDarkMode.value
		// 实际主题切换逻辑
	}

	const goToPrivacy = () => {
		uni.navigateTo({
			url: '/pages/setting/components/privacy',
			animationType: 'slide-in-right'
		})
	}

	const clearCache = () => {
		uni.showModal({
			title: t('user.clearCacheTitle'),
			content: t('user.clearCacheConfirm'),
			success: function(res) {
				if (res.confirm) {
					// 清除缓存逻辑
					cacheSize.value = '0KB'
					uni.showToast({
						title: t('user.cacheClearedSuccess'),
						icon: 'success'
					})
				}
			}
		})
	}

	const goToAbout = () => {
		uni.navigateTo({
			url: '/pages/setting/components/about',
			animationType: 'slide-in-right'
		})
	}
</script>

<style lang="scss">
	.settings-container {
		background-color: #F8F4F2;
		min-height: 100vh;
		padding: 30rpx;
	}

	.settings-header {
		margin-bottom: 30rpx;
		padding: 0 10rpx;

		.settings-title {
			font-size: 40rpx;
			font-weight: 600;
			color: #4A3328;
			display: block;
			margin-bottom: 10rpx;
		}

		.settings-subtitle {
			font-size: 28rpx;
			color: #8C6E63;
			opacity: 0.8;
		}
	}

	.settings-content {
		.settings-group {
			background-color: #FFFFFF;
			border-radius: 16rpx;
			overflow: hidden;
			box-shadow: 0 4rpx 16rpx rgba(0, 0, 0, 0.05);

			.settings-item {
				display: flex;
				justify-content: space-between;
				align-items: center;
				padding: 30rpx;
				position: relative;

				&:not(:last-child)::after {
					content: '';
					position: absolute;
					left: 100rpx;
					right: 0;
					bottom: 0;
					height: 1px;
					background-color: #F0F0F0;
				}

				.item-left {
					display: flex;
					align-items: center;
					gap: 24rpx;

					.item-icon {
						display: flex;
						align-items: center;
						justify-content: center;
						width: 70rpx;
						height: 70rpx;
						background-color: rgba(140, 110, 99, 0.1);
						border-radius: 50%;
					}

					.item-title {
						font-size: 30rpx;
						color: #333333;
					}
				}

				.item-right {
					display: flex;
					align-items: center;
					gap: 10rpx;

					.item-value {
						font-size: 28rpx;
						color: #999999;
						margin-right: 10rpx;
					}
				}
			}

			.settings-item-hover {
				background-color: #F9F9F9;
			}
		}
	}

	.mt-20 {
		margin-top: 20rpx;
	}
</style>