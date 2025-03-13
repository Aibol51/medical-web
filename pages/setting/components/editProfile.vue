<template>
	<view class="edit-nickname-container">
		<view class="page-header">
			<text class="page-title">{{ t('user.editInformation') }}</text>
		</view>

		<view class="form-container">
			<uni-forms ref="valiForm" :rules="rules" :modelValue="formData" label-position="top" :label-width="200">
				<uni-forms-item required :label="t('user.nickName')" name="nickname">
					<uni-easyinput 
						type="text" 
						v-model="formData.nickname" 
						:placeholder="t('user.enterNickName')"
						:styles="{
							borderRadius: '12rpx',
							backgroundColor: '#F8F8F8',
						}" 
						class="nickname-input" 
						prefixIcon="person-filled" 
						trim="all" 
						maxlength="20" 
						:focus="true" 
					/>
				</uni-forms-item>
			</uni-forms>
		</view>

		<view class="button-group">
			<button 
				class="cancel-button" 
				hover-class="button-hover" 
				@click="goBack"
			>
				{{ t('uni.picker.cancel') }}
			</button>

			<button 
				class="confirm-button" 
				:disabled="!formData.nickname || isSubmitting"
				:class="{ 'button-disabled': !formData.nickname || isSubmitting }" 
				hover-class="button-hover"
				@click="submit"
			>
				<view class="button-content">
					<uni-icons v-if="isSubmitting" type="spinner-cycle" size="18" color="#FFFFFF"></uni-icons>
					<text>{{ t('user.confirm') }}</text>
				</view>
			</button>
		</view>
	</view>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import Cache from '@/utils/cache'
import {
	getMemberById,
	modifyProfile
} from '@/api/user.js'
import {
	LOGIN_STATUS,
	USER_INFO,
} from '@/config/cache'

const { t } = useI18n()
const valiForm = ref(null)
const formData = reactive({
	nickname: ''
})
const originalNickname = ref('')
const isSubmitting = ref(false)

// 表单验证规则
const rules = {
	nickname: {
		rules: [{
			required: true,
			errorMessage: t('user.enterNickName'),
		}, {
			minLength: 2,
			maxLength: 20,
			errorMessage: t('user.nickNameLengthError'),
		}],
	},
}

// 获取用户信息
const getMemberInfo = () => {
	const data = {
		id: Cache.get(USER_INFO).userId
	}
	getMemberById(data).then(res => {
		if (res.code === 0) {
			formData.nickname = res.data.nickname
			originalNickname.value = res.data.nickname

			const userInfo = Cache.get(USER_INFO)
			userInfo.nickname = res.data.nickname
			Cache.set(USER_INFO, userInfo)
		}
	})
}

// 提交表单
const submit = () => {
	if (isSubmitting.value) return

	// 如果昵称没有改变，直接返回
	if (formData.nickname === originalNickname.value) {
		uni.showToast({
			title: t('user.noChanges'),
			icon: 'none',
			duration: 2000
		})
		setTimeout(() => {
			goBack()
		}, 1000)
		return
	}

	valiForm.value.validate().then(() => {
		isSubmitting.value = true

		modifyProfile(formData).then(res => {
			if (res.code === 0) {
				const userInfo = Cache.get(USER_INFO)
				userInfo.nickname = formData.nickname
				Cache.set(USER_INFO, userInfo)

				uni.showToast({
					title: t('user.editSuccess'),
					icon: 'success',
					duration: 2000
				})

				setTimeout(() => {
					uni.navigateBack()
				}, 1500)
			} else {
				uni.showToast({
					title: res.msg || t('user.editFailed'),
					icon: 'error',
					duration: 2000
				})
			}
		}).catch(err => {
			console.error('修改失败:', err)
			uni.showToast({
				title: t('user.editFailed'),
				icon: 'error',
				duration: 2000
			})
		}).finally(() => {
			isSubmitting.value = false
		})

	}).catch((err) => {
		console.log('表单错误信息：', err)
	})
}

// 返回上一页
const goBack = () => {
	uni.navigateBack()
}

// 页面显示时获取用户信息
onMounted(() => {
	getMemberInfo()
})
</script>

<style lang="scss">
.edit-nickname-container {
	background-color: #FFFFFF;
	min-height: 100vh;
	padding: 40rpx;

	.page-header {
		margin-bottom: 50rpx;

		.page-title {
			font-size: 40rpx;
			font-weight: 600;
			color: #4A3328;
			display: block;
			margin-bottom: 16rpx;
		}
	}

	.form-container {
		margin-bottom: 40rpx;
		position: relative;

		.nickname-input {
			height: 96rpx;
			font-size: 32rpx;
		}

		.character-count {
			position: absolute;
			right: 20rpx;
			top: 110rpx;
			font-size: 24rpx;
			color: #AAAAAA;

			&.limit-warning {
				color: #FF9500;
			}
		}
	}

	.button-group {
		display: flex;
		gap: 30rpx;
		margin-bottom: 50rpx;

		.cancel-button,
		.confirm-button {
			flex: 1;
			height: 88rpx;
			line-height: 88rpx;
			border-radius: 44rpx;
			font-size: 32rpx;
			font-weight: 500;
			text-align: center;
		}

		.cancel-button {
			color: #666666;
			background-color: #F5F5F5;
			border: none;
		}

		.confirm-button {
			color: #FFFFFF;
			background: linear-gradient(135deg, #8C6E63 0%, #3B3029 100%);
			border: none;
			position: relative;

			.button-content {
				display: flex;
				align-items: center;
				justify-content: center;
				gap: 10rpx;
			}
		}

		.button-disabled {
			opacity: 0.6;
		}

		.button-hover {
			opacity: 0.8;
			transform: scale(0.98);
		}
	}
}
</style>