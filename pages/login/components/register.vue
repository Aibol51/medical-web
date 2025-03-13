<template>
	<view class="loginContent">
		<uni-forms ref="valiForm" :rules="rules" :model-value="formData" label-position="top" label-width="70">
			<uni-forms-item required :label="$t('register.username')" name="username">
				<uni-easyinput type="text" v-model="formData.username" :placeholder="$t('register.username.input')">
				</uni-easyinput>
			</uni-forms-item>
			<uni-forms-item required :label="$t('login.phone.number')" name="phoneNumber">
				<uni-easyinput type="number" v-model="formData.phoneNumber" :placeholder="$t('login.phone.input')">
					<template #left>
						<text style="margin-left: 10rpx;">+7</text>
					</template>
				</uni-easyinput>
			</uni-forms-item>
			<uni-forms-item required :label="$t('login.password')" name="password">
				<uni-easyinput type="password" v-model="formData.password" :placeholder="$t('login.password.input')" />
			</uni-forms-item>
			<uni-forms-item required :label="$t('register.confirmPassword')" name="rePassword">
				<uni-easyinput type="password" v-model="formData.rePassword"
					:placeholder="$t('login.password.input')" />
			</uni-forms-item>
			<uni-forms-item required :label="$t('login.verification.code')" name="captcha">
				<uni-easyinput type="text" v-model="formData.captcha" :placeholder="$t('login.verification.input')">
					<template #right>
						<button :loading="isSending" size="mini" :disabled="isSending" @click="sendCaptcha"
							style="margin: auto;padding: 0 20rpx;background-color: #3b3029; color: #e4e4e4;">
							{{ isSending ? `${countdown}s` : $t('register.sendCode') }}
						</button>
					</template>
				</uni-easyinput>
			</uni-forms-item>
		</uni-forms>
		<button type="default" style="color:#e4e4e4;backgroundColor:#3b3029;" @click="submit()">
			{{$t('register.register')}}
		</button>
	</view>
</template>

<script setup>
	import {
		ref,
		reactive
	} from 'vue';
	import {
		getSmsCaptcha,
		registerMobile
	} from '@/api/user.js';
	import i18n from "@/locale/index.js";

	// Props
	const props = defineProps({
		switchToLogin: Function
	});

	// Template refs
	const valiForm = ref(null);

	// Reactive state
	const formData = reactive({
		username: '',
		phoneNumber: '',
		password: '',
		rePassword: '',
		captcha: '',
	});

	const isSending = ref(false);
	const countdown = ref(60);

	// Form validation rules
	const rules = reactive({
		username: {
			rules: [{
				required: true,
				errorMessage: i18n.global.t('register.username.input'),
			}],
		},
		phoneNumber: {
			rules: [{
					required: true,
					errorMessage: i18n.global.t('login.phone.input'),
				},
				{
					minLength: 10,
					maxLength: 10,
					errorMessage: i18n.global.t('login.phone.length.error'),
				},
			],
		},
		password: {
			rules: [{
					required: true,
					errorMessage: i18n.global.t('login.password.input'),
				},
				{
					minLength: 6,
					maxLength: 16,
					errorMessage: i18n.global.t('login.password.length.error'),
				},
			],
		},
		rePassword: {
			rules: [{
					required: true,
					errorMessage: i18n.global.t('login.password.input'),
				},
				{
					minLength: 6,
					maxLength: 16,
					errorMessage: i18n.global.t('login.password.length.error'),
				},
				{
					validateFunction: (rule, value, data) => {
						if (value !== formData.password) {
							return i18n.global.t('register.passwordMismatch');
						}
						return true;
					},
				}
			],
		},
		captcha: {
			rules: [{
					required: true,
					errorMessage: i18n.global.t('login.verification.input'),
				},
				{
					minLength: 5,
					maxLength: 5,
					errorMessage: i18n.global.t('login.verification.error'),
				},
			],
		},
	});

	function doRequire() {
		return new Promise((resolve, reject) => {
			uni.requirePrivacyAuthorize({
				success: () => {
					console.log('同意');
					resolve(); // 用户同意授权，继续执行后续代码
				},
				fail: () => {
					console.log('拒绝');
					reject(new Error("用户拒绝授权")); // 用户拒绝授权，抛出错误
				},
				complete: () => {}
			});
		});
	}

	const handleDisagree = () => {
		wx.showToast({
			title: "请同意隐私协议后继续使用",
			icon: "none"
		});
	};

	const handleAgree = () => {
		// wx.showToast({
		// 	title: "感谢您的同意！",
		// 	icon: "success"
		// });
	};

	// Methods
	const submit = async () => {
		try {
			// #ifdef MP-WEIXIN
			try {
				await doRequire(); // 等待用户授权
			} catch (error) {
				return; // 停止后续代码执行
			}
			// #endif

			await valiForm.value.validate(); // 验证表单数据
			const submitData = {
				...formData,
				phoneNumber: '+7' + formData.phoneNumber
			};

			const res = await registerMobile(submitData); // 调用注册接口
			if (res.code === 0) {
				console.log(res);
				uni.showToast({
					title: i18n.global.t('register.success'),
					icon: 'none',
					duration: 2000
				});
				props.switchToLogin(); // 切换到登录页面
			} else if (res.code === 3) {
				uni.showToast({
					title: i18n.global.t('register.codeError'),
					icon: 'none',
					duration: 3000
				});
			}
		} catch (err) {
			console.log('表单错误信息：', err);
		}
	};

	const sendCaptcha = async () => {
		// 校验手机号
		const phoneRules = rules.phoneNumber.rules;
		const phoneNumber = formData.phoneNumber;

		// 手动校验手机号是否符合规则
		const isPhoneValid = phoneRules.every(rule => {
			if (rule.required && !phoneNumber) {
				uni.showToast({
					title: rule.errorMessage,
					icon: 'none',
					duration: 2000
				});
				return false;
			}
			if (rule.minLength && phoneNumber.length < rule.minLength) {
				uni.showToast({
					title: rule.errorMessage,
					icon: 'none',
					duration: 2000
				});
				return false;
			}
			if (rule.maxLength && phoneNumber.length > rule.maxLength) {
				uni.showToast({
					title: rule.errorMessage,
					icon: 'none',
					duration: 2000
				});
				return false;
			}
			return true;
		});

		if (!isPhoneValid || isSending.value) return;

		const data = {
			phoneNumber: "+7" + phoneNumber,
		};

		const res = await getSmsCaptcha(data);
		if (res.code === 0) {
			uni.showToast({
				title: i18n.global.t('register.codeSent'),
				icon: 'none',
				duration: 1000
			});
			console.log('发送验证码...');
			isSending.value = true;
			const timer = setInterval(() => {
				countdown.value -= 1;
				if (countdown.value <= 0) {
					clearInterval(timer);
					isSending.value = false;
					countdown.value = 60;
				}
			}, 1000);
		}
	};
</script>

<style lang="scss">
	.loginContent {
		margin: 70rpx;
	}
</style>