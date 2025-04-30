<template>
	<view class="profile-container">
		<uv-navbar :title="t('user.profileCenter')" :placeholder="true" leftIcon="" bg-color="#EDDED7"
			title-style="font-weight: 600; font-size: 36rpx;"></uv-navbar>
		<view class="user-content">
			<!-- 用户信息卡片 -->
			<view class="user-card">
				<view class="user-info">
					<uv-avatar :src="userAvatar" :size="80"
						custom-style="border: 4rpx solid #fff; box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.1);"></uv-avatar>
					<view class="user-details">
						<text class="username">{{userName || t('user.guest')}}</text>
						<text class="user-id" v-if="userID">ID: {{userID}}</text>
					</view>
				</view>
				<view class="edit-profile" @click="goToDetail(0)">
					<uv-icon name="edit-pen" size="32" color="#8C6E63"></uv-icon>
				</view>
			</view>

			<!-- 设置和功能列表 -->
			<view class="cell-section">
				<uv-cell-group border-style="custom"
					custom-style="border-radius: 16rpx; overflow: hidden; box-shadow: 0 4rpx 20rpx rgba(0, 0, 0, 0.05);">
					<uv-cell v-for="(item, index) in cellList" :key="index" :icon="item.icon" :title="item.title"
						:title-style="{ fontSize: '30rpx', color: '#333' }" :icon-style="{ color: '#8C6E63' }"
						@click="goToDetail(index)" :is-link="item.isLink" :value="item.value">
					</uv-cell>
				</uv-cell-group>
			</view>

			<!-- 退出按钮 -->
			<view class="logout-btn">
				<uv-button type="error" :text="t('user.logOut')" @click="logOut()" shape="circle"
					custom-style="background: #FA5151; box-shadow: 0 6rpx 10rpx rgba(250, 81, 81, 0.2);">
				</uv-button>
			</view>
		</view>
		<navBar :activeIndex="2"></navBar>
	</view>
</template>

<script setup>
	import {
		ref
	} from "vue"
	import {
		onLoad,
		onShow
	} from '@dcloudio/uni-app'
	import navBar from "@/components/navBar.vue"
	import {
		getLogout
	} from '@/api/user.js'
	import Cache from '@/utils/cache';
	import {
		LOGIN_STATUS,
		USER_INFO
	} from '@/config/cache';
	import {
		useI18n
	} from 'vue-i18n'
	import i18n from "@/locale/index.js"

	const {
		t,
		locale
	} = useI18n()
	const userName = ref('')
	const userID = ref('')
	const userAvatar = ref('')

	// 设置列表
	const cellList = [{
			title: i18n.global.t('user.profileSettings'),
			icon: "setting-fill",
			isLink: true,
			value: "",
			path: "/pages/setting/index"
		},
		{
			title: i18n.global.t('user.healthReport'),
			icon: "file-text",
			isLink: true,
			value: "",
			path: "/pages/report/index"
		}
	]

	const goToDetail = (index) => {
		uni.navigateTo({
			url: cellList[index].path,
			animationType: 'pop-in'
		})
	}


	const logOut = () => {
		uni.showModal({
			title: t('user.confirmLogout'),
			content: t('user.logoutConfirmation'),
			confirmColor: '#FA5151',
			success: function(res) {
				if (res.confirm) {
					getLogout().then(res => {
						if (res.code === 0) {
							Cache.clear(USER_INFO);

							uni.showToast({
								title: t('user.logOutSuccess'),
								icon: 'success',
								duration: 2000
							});

							setTimeout(function() {
								uni.navigateTo({
									url: "/pages/home/index",
									animationType: 'pop-out'
								})
							}, 1000);
						}
					}).catch(err => {
						console.error(err)
						uni.showToast({
							title: t('user.logOutFailed'),
							icon: 'error',
							duration: 2000
						});
					})
				}
			}
		});
	}

	onShow(() => {
		if (Cache.has(USER_INFO)) {
			const userInfo = Cache.get(USER_INFO);
			userName.value = userInfo.nickname;
			userID.value = userInfo.id || '';
			userAvatar.value = userInfo.avatar || '';
		}
	})
</script>

<style lang="scss">
	.profile-container {
		background-color: #F8F4F2;
		min-height: 100vh;
	}

	.user-content {
		padding: 30rpx;

		.user-card {
			display: flex;
			align-items: center;
			justify-content: space-between;
			background: linear-gradient(135deg, #EDDED7 0%, #D9C1B6 100%);
			padding: 40rpx 30rpx;
			border-radius: 24rpx;
			box-shadow: 0 6rpx 20rpx rgba(0, 0, 0, 0.05);
			margin-bottom: 30rpx;

			.user-info {
				display: flex;
				align-items: center;
				gap: 24rpx;

				.user-details {
					display: flex;
					flex-direction: column;

					.username {
						font-size: 34rpx;
						font-weight: 600;
						color: #4A3328;
						margin-bottom: 8rpx;
					}

					.user-id {
						font-size: 24rpx;
						color: #8C6E63;
						opacity: 0.8;
					}
				}
			}

			.edit-profile {
				background-color: rgba(255, 255, 255, 0.7);
				border-radius: 50%;
				width: 60rpx;
				height: 60rpx;
				display: flex;
				align-items: center;
				justify-content: center;
			}
		}

		.cell-section {
			margin-bottom: 40rpx;
		}

		.logout-btn {
			margin: 40rpx auto;
			width: 60%;
		}
	}
</style>