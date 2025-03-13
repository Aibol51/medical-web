<template>
	<view>
		<view class="segment">
			<uni-segmented-control :current="current" :values="items" @clickItem="onClickItem" styleType="button"
				activeColor="#3b3029"></uni-segmented-control>

		</view>
		<view class="content">
			<view v-show="current === 0">
				<loginPage></loginPage>
			</view>
			<view v-show="current === 1">
				<registerPage :switchToLogin="switchToLogin"></registerPage>
			</view>
		</view>

		<!-- #ifdef MP-WEIXIN -->
		<ws-wx-privacy id="privacy-popup"></ws-wx-privacy>
		<!-- #endif -->
		<!-- #ifdef MP-WEIXIN -->
		<view class="privacy">
			<navigator style="color: #1c6bfb;" url="/pages/privacy/userService">《用户服务协议》</navigator>及
			<navigator style="color: #1c6bfb;" url="/pages/privacy/privacy">《隐私政策》</navigator>
		</view>
		<!-- #endif -->
	</view>
</template>
<script>
	import loginPage from "@/pages/login/components/login.vue";
	import registerPage from "@/pages/login/components/register.vue";
	export default {
		components: {
			loginPage,
			registerPage
		},
		data() {
			return {
				items: [this.$t('login.login'), this.$t('login.register')],
				current: 0
			};
		},
		methods: {
			onClickItem(e) {
				if (this.current != e.currentIndex) {
					this.current = e.currentIndex;
				}
			},
			switchToLogin() {
				// 切换到登录页面
				this.current = 0;
			}
		}
	};
</script>


<style lang="scss">
	.segment {
		margin: 50rpx 70rpx 0 70rpx;
	}

	.privacy {
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 25rpx;
	}
</style>