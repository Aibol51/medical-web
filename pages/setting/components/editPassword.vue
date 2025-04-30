<template>
	<view class="edit-password-container">
		<view class="page-header">
			<text class="page-title">{{ t('user.editPassword') }}</text>
		</view>

		<view class="form-container">
			<uni-forms ref="valiForm" :rules="rules" :modelValue="formData" label-position="top" :label-width="200">
				<!-- 手机号输入框 -->
				<uni-forms-item required :label="t('login.phone.number')" name="phoneNumber">
					<uni-easyinput type="number" v-model="formData.phoneNumber" :placeholder="t('login.phone.input')"
						:disabled="true" :styles="{
							borderRadius: '12rpx',
							backgroundColor: '#F8F8F8',
						}" class="input-field">
						<template #left>
							<view class="phone-prefix">
								<text>+7</text>
							</view>
						</template>
					</uni-easyinput>
				</uni-forms-item>

				<!-- 密码输入框 -->
				<uni-forms-item required :label="t('login.password')" name="password">
					<uni-easyinput :type="showPassword ? 'text' : 'password'" v-model="formData.password"
						:placeholder="t('login.password.input')" :styles="{
							borderRadius: '12rpx',
							backgroundColor: '#F8F8F8',
						}" class="input-field">
					</uni-easyinput>
				</uni-forms-item>

				<!-- 确认密码输入框 -->
				<uni-forms-item required :label="t('register.confirmPassword')" name="rePassword">
					<uni-easyinput :type="showRePassword ? 'text' : 'password'" v-model="formData.rePassword"
						:placeholder="t('login.password.input')" :styles="{
							borderRadius: '12rpx',
							backgroundColor: '#F8F8F8',
						}" class="input-field">
					</uni-easyinput>
				</uni-forms-item>

				<!-- 密码强度指示器 -->
				<view class="password-strength-container" v-if="formData.password">
					<text class="strength-label">{{ t('user.passwordStrength') }}: {{ passwordStrengthText }}</text>
					<view class="strength-meter">
						<view class="strength-bar"
							:style="{ width: `${passwordStrength * 33.3}%`, backgroundColor: passwordStrengthColor }">
						</view>
					</view>
				</view>

				<!-- 验证码输入框 -->
				<uni-forms-item required :label="t('login.verification.code')" name="code">
					<uni-easyinput type="text" v-model="formData.code" :placeholder="t('login.verification.input')"
						:styles="{
							borderRadius: '12rpx',
							backgroundColor: '#F8F8F8',
						}" class="input-field">
						<template #right>
							<button class="captcha-button" :class="{ 'captcha-disabled': isSending }"
								:loading="isSending" :disabled="isSending" @click="sendCaptcha">
								{{ isSending ? `${countdown}s` : t('register.sendCode') }}
							</button>
						</template>
					</uni-easyinput>
				</uni-forms-item>
			</uni-forms>
		</view>

		<!-- 按钮区域 -->
		<view class="button-group">
			<button class="cancel-button" hover-class="button-hover" @click="goBack">
				{{ t('uni.picker.cancel') }}
			</button>

			<button class="confirm-button" :disabled="!isFormValid || isSubmitting"
				:class="{ 'button-disabled': !isFormValid || isSubmitting }" hover-class="button-hover" @click="submit">
				<view class="button-content">
					<uni-icons v-if="isSubmitting" type="spinner-cycle" size="18" color="#FFFFFF"></uni-icons>
					<text>{{ t('user.confirm') }}</text>
				</view>
			</button>
		</view>
	</view>
</template>

<script setup>
	import {
		ref,
		reactive,
		computed,
		onMounted
	} from 'vue'
	import {
		useI18n
	} from 'vue-i18n'
	import Cache from '@/utils/cache'
	import {
		getMemberInfo,
		resetPasswordBySms,
		getSmsCaptcha
	} from '@/api/user.js'
	import {
		LOGIN_STATUS,
		USER_INFO,
	} from '@/config/cache'

	const {
		t
	} = useI18n()
	const valiForm = ref(null)
	const formData = reactive({
		phoneNumber: '',
		password: '',
		rePassword: '',
		code: ''
	})

	const isSending = ref(false)
	const countdown = ref(60)
	const isSubmitting = ref(false)
	const showPassword = ref(false)
	const showRePassword = ref(false)

	// 密码强度计算
	const passwordStrength = computed(() => {
		const password = formData.password
		if (!password) return 0

		let strength = 0

		// 长度检查
		if (password.length >= 8) strength += 1

		// 包含数字
		if (/\d/.test(password)) strength += 1

		// 包含小写字母
		if (/[a-z]/.test(password)) strength += 1

		// 包含大写字母
		if (/[A-Z]/.test(password)) strength += 1

		// 包含特殊字符
		if (/[^A-Za-z0-9]/.test(password)) strength += 1

		return Math.min(4, strength)
	})

	const passwordStrengthText = computed(() => {
		const strength = passwordStrength.value
		if (strength === 0) return t('user.passwordWeak')
		if (strength === 1) return t('user.passwordWeak')
		if (strength === 2) return t('user.passwordMedium')
		if (strength === 3) return t('user.passwordStrong')
		return t('user.passwordVeryStrong')
	})

	const passwordStrengthColor = computed(() => {
		const strength = passwordStrength.value
		if (strength === 0 || strength === 1) return '#FF5252'
		if (strength === 2) return '#FFB300'
		if (strength === 3) return '#66BB6A'
		return '#43A047'
	})

	// 表单验证状态
	const isFormValid = computed(() => {
		return formData.phoneNumber &&
			formData.password &&
			formData.rePassword &&
			formData.code &&
			formData.password === formData.rePassword
	})

	// 表单验证规则
	const rules = {
		phoneNumber: {
			rules: [{
					required: true,
					errorMessage: t('login.phone.input'),
				},
				{
					minLength: 10,
					maxLength: 10,
					errorMessage: t('login.phone.length.error'),
				}
			]
		},
		password: {
			rules: [{
					required: true,
					errorMessage: t('login.password.input'),
				},
				{
					minLength: 6,
					maxLength: 16,
					errorMessage: t('login.password.length.error'),
				}
			]
		},
		rePassword: {
			rules: [{
					required: true,
					errorMessage: t('login.password.input'),
				},
				{
					minLength: 6,
					maxLength: 16,
					errorMessage: t('login.password.length.error'),
				},
				{
					validateFunction: (rule, value, data) => {
						if (value !== formData.password) {
							return t('register.passwordMismatch')
						}
						return true
					}
				}
			]
		},
		code: {
			rules: [{
					required: true,
					errorMessage: t('login.verification.input'),
				},
				{
					minLength: 4,
					maxLength: 5,
					errorMessage: t('login.verification.error'),
				}
			]
		}
	}

	// 获取用户信息
	const getMember = () => {
		const data = {
			id: Cache.get(USER_INFO).userId
		}
		getMemberInfo(data).then(res => {
			if (res.code === 0) {
				// 移除 +7 前缀
				let mobile = res.data.mobile
				if (mobile.startsWith('+7')) {
					mobile = mobile.replace('+7', '')
				}
				formData.phoneNumber = mobile
			}
		})
	}

	// 发送验证码
	const sendCaptcha = () => {
		// 校验手机号
		const phoneRules = rules.phoneNumber.rules
		const phoneNumber = formData.phoneNumber

		// 手动校验手机号是否符合规则
		const isPhoneValid = phoneRules.every(rule => {
			if (rule.required && !phoneNumber) {
				uni.showToast({
					title: rule.errorMessage,
					icon: 'none',
					duration: 2000
				})
				return false
			}
			if (rule.minLength && phoneNumber.length < rule.minLength) {
				uni.showToast({
					title: rule.errorMessage,
					icon: 'none',
					duration: 2000
				})
				return false
			}
			if (rule.maxLength && phoneNumber.length > rule.maxLength) {
				uni.showToast({
					title: rule.errorMessage,
					icon: 'none',
					duration: 2000
				})
				return false
			}
			return true
		})

		if (!isPhoneValid) return
		if (isSending.value) return

		const data = {
			mobile: "+7" + phoneNumber,
			scene: 4
		}

		getSmsCaptcha(data).then(res => {
			if (res.code === 0) {
				uni.showToast({
					title: t('register.codeSent'),
					icon: 'success',
					duration: 2000
				})

				isSending.value = true
				let timer = setInterval(() => {
					countdown.value -= 1
					if (countdown.value <= 0) {
						clearInterval(timer)
						isSending.value = false
						countdown.value = 60
					}
				}, 1000)
			} else if (res.code === 1002014005) {
				uni.showToast({
					title: '短信发送过于频繁',
					icon: 'error',
					duration: 3000
				})
			}
		})
	}

	// 提交表单
	const submit = () => {
		if (isSubmitting.value) return

		valiForm.value.validate().then(() => {
			isSubmitting.value = true

			const submitData = {
				mobile: '+7' + formData.phoneNumber,
				password: formData.password,
				code: formData.code.toString(),
			}

			resetPasswordBySms(submitData).then(res => {
				if (res.code === 0) {
					uni.showToast({
						title: t('user.editPasswordSuccess'),
						icon: 'success',
						duration: 2000
					})

					setTimeout(() => {
						uni.navigateBack()
					}, 1500)
				} else if (res.code === 3) {
					uni.showToast({
						title: t('register.codeError'),
						icon: 'error',
						duration: 3000
					})
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

	// 页面加载时获取用户信息
	onMounted(() => {
		getMember()
	})
</script>

<style lang="scss">
	.edit-password-container {
		background-color: #FFFFFF;
		min-height: 100vh;
		padding: 40rpx;

		.page-header {
			margin-bottom: 40rpx;

			.page-title {
				font-size: 40rpx;
				font-weight: 600;
				color: #4A3328;
				display: block;
				margin-bottom: 16rpx;
			}

		}

		.form-container {
			margin-bottom: 30rpx;

			.input-field {
				height: 96rpx;
				font-size: 32rpx;
			}

			.phone-prefix {
				display: flex;
				align-items: center;
				padding: 0 20rpx;

				text {
					font-size: 32rpx;
					color: #333333;
				}
			}

			.password-toggle {
				padding: 0 20rpx;
				display: flex;
				align-items: center;
			}

			.captcha-button {
				height: 70rpx;
				line-height: 70rpx;
				background-color: #8C6E63;
				color: #FFFFFF;
				font-size: 26rpx;
				margin: auto 10rpx;
				padding: 0 20rpx;
				border-radius: 8rpx;

				&.captcha-disabled {
					background-color: #CCCCCC;
				}
			}

			.password-strength-container {
				margin: 10rpx 0 30rpx;

				.strength-label {
					font-size: 26rpx;
					color: #666666;
					margin-bottom: 10rpx;
					display: block;
				}

				.strength-meter {
					height: 8rpx;
					background-color: #EEEEEE;
					border-radius: 4rpx;
					overflow: hidden;

					.strength-bar {
						height: 100%;
						transition: all 0.3s;
					}
				}
			}
		}

		.password-tips {
			background-color: #F8F4F2;
			padding: 24rpx;
			border-radius: 12rpx;
			margin-bottom: 40rpx;

			.tip-title {
				font-size: 28rpx;
				font-weight: 500;
				color: #4A3328;
				margin-bottom: 16rpx;
			}

			.tip-item {
				display: flex;
				align-items: flex-start;
				gap: 10rpx;
				margin-bottom: 12rpx;

				text {
					font-size: 24rpx;
					color: #666666;
					line-height: 1.4;
				}
			}
		}

		.button-group {
			display: flex;
			gap: 30rpx;
			margin-top: 40rpx;

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