<template>
	<view class="loginContent">
		<uni-forms ref="valiForm" :rules="rules" :modelValue="formData" label-position="top" label-width="70">
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

			<uni-forms-item required :label="$t('login.verification.code')" name="captcha">
				<uni-easyinput type="text" v-model="formData.captcha" :placeholder="$t('login.verification.input')">
					<template #left>
						<image @click="getCaptchaApi" style="width: 160rpx; height: 60rpx;" :src="captcha.image"
							mode="" />
					</template>
				</uni-easyinput>
			</uni-forms-item>
		</uni-forms>

		<button type="default" style="color:#e4e4e4; background-color:#3b3029;" @click="submit">
			{{ $t('login.login') }}
		</button>
	</view>
</template>

<script setup>
	import {
		ref,
		onMounted
	} from "vue";
	import {
		getCaptcha,
		loginMobile
	} from "@/api/user.js";
	import Cache from "@/utils/cache";
	import {
		LOGIN_STATUS,
		USER_INFO
	} from "@/config/cache";
	import {
		useI18n
	} from "vue-i18n";

	const {
		t
	} = useI18n();

	const valiForm = ref(null);

	const formData = ref({
		phoneNumber: "",
		password: "",
		captcha: "",
		captchaId: ""
	});

	const captcha = ref({
		id: "",
		image: ""
	});

	const rules = ref({
		phoneNumber: {
			rules: [{
					required: true,
					errorMessage: t("login.phone.input")
				},
				{
					minLength: 10,
					maxLength: 10,
					errorMessage: t("login.phone.length.error")
				}
			]
		},
		password: {
			rules: [{
					required: true,
					errorMessage: t("login.password.input")
				},
				{
					minLength: 6,
					maxLength: 16,
					errorMessage: t("login.password.length.error")
				}
			]
		},
		captcha: {
			rules: [{
					required: true,
					errorMessage: t("login.verification.input")
				},
				{
					minLength: 5,
					maxLength: 5,
					errorMessage: t("login.verification.error")
				}
			]
		}
	});

	const getCaptchaApi = async () => {
		const res = await getCaptcha();
		captcha.value.image = res.data.imgPath;
		captcha.value.id = res.data.captchaId;
	};

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

	const submit = async () => {
		try {
			const res = await valiForm.value.validate();
			console.log("表单数据信息：", res);

			// #ifdef MP-WEIXIN
			try {
				await doRequire(); // 等待用户授权
			} catch (error) {
				return; // 停止后续代码执行
			}
			handleAgree(); // 用户同意授权，提示感谢
			// #endif

			const data = {
				phoneNumber: "+7" + formData.value.phoneNumber,
				captchaId: captcha.value.id,
				captcha: formData.value.captcha,
				password: formData.value.password
			};

			const loginRes = await loginMobile(data);
			if (loginRes.code === 0) {
				Cache.set(USER_INFO, loginRes.data, loginRes.data.expire);
				Cache.set(LOGIN_STATUS, loginRes.data.token, loginRes.data.expire);
				uni.showToast({
					title: t("login.login.success"),
					icon: "none",
					duration: 2000
				});
				setTimeout(() => {
					uni.navigateTo({
						url: "/pages/home/index",
						animationType: "none"
					});
				}, 1000);
			} else if (loginRes.code === 3) {
				getCaptchaApi();
				uni.showToast({
					title: t("login.login.error"),
					icon: "none",
					duration: 3000
				});
			}
		} catch (err) {
			console.log("表单错误信息：", err);
		}
	};


	onMounted(() => {
		getCaptchaApi();
		console.log("getCaptchaApi has been called");
	});
</script>

<style scoped lang="scss">
	.loginContent {
		margin: 70rpx;
	}
</style>