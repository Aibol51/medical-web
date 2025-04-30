<template>
	<view class="">
		<!-- <statusBar :useThemeColor="false"></statusBar> -->
		<uv-navbar bg-color="#3b3029" :title="t('appointment.booking')" :placeholder="true"
			:leftIcon="isWeChatMiniProgram ? 'calendar' : ''" @leftClick="isWeChatMiniProgram && openPopup()">
			<template v-slot:center>
				<view class="tabs-container">
					<uv-subsection :list="subsectionList" custom-style="height: 50rpx;" :current="currentTab"
						@change="onTabChange" activeColor="#3b3029" mode="button"></uv-subsection>
				</view>
			</template>
			<template v-slot:right>
				<uv-icon color="#fff" v-if="!isWeChatMiniProgram" name="calendar" size="28"
					@click="openPopup()"></uv-icon>
			</template>
		</uv-navbar>
		<view v-if="hasAppointments" class="bookingContent">
			<view class="bookingList" v-for="(item,index) in appointmentList" @click="openDetail(item)">
				<view class="bookingTop">
					<view class="bookingDate">
						<uv-icon name="calendar"></uv-icon>
						{{formatToDate(item.appointmentTime)}}
					</view>
					<view class="bookingTime">
						<uv-icon name="clock"></uv-icon>
						{{formatToTime(item.appointmentTime)}}
					</view>
				</view>
				<uv-steps :current="item.status - 1">
					<uv-steps-item id="bookingItems" v-for="(data, stepIndex) in stepsList" :key="stepIndex"
						customStyle="text-align: center;" :title="data.title"></uv-steps-item>
				</uv-steps>

			</view>
		</view>
		<uv-empty v-else-if="currentTab === 0" mode="history" textSize="18" :text="t('appointment.noRecord')"
			width="200" height="200" icon-color="#767676" text-color="#767676">
			<view style="margin-top: 30rpx;">
				<uv-button v-if="currentTab=== 0" color="#3b3029" type="success" size="large"
					:text="t('appointment.bookNow')" @click="openPopup()"></uv-button>
			</view>
		</uv-empty>
		<uv-empty v-else-if="currentTab === 1" mode="history" textSize="18" text="没有历史预约" width="200" height="200"
			icon-color="#767676" text-color="#767676">
			<view style="margin-top: 30rpx;">
			</view>
		</uv-empty>

		<uv-popup ref="popupRefs" mode="bottom" @change="changePopup" :close-on-click-overlay="false" :closeable="true"
			:round="20">
			<view class="popupContent">
				<uv-form label-position="left" :model="model1" :rules="rules" ref="form" labelPosition="top"
					labelWidth="250rpx">
					<uv-form-item :label="t('appointment.name')" prop="userInfo.name" border-bottom :required="true">
						<uv-input v-model="model1.userInfo.name" border="none">
						</uv-input>
					</uv-form-item>
					<uv-form-item :label="t('appointment.phone')" prop="userInfo.mobile" border-bottom :required="true">
						<uv-input v-model="model1.userInfo.mobile" border="none" type="number" :maxlength="10">
							<template v-slot:prefix>
								<uv-text text="+7" margin="0 3px 0 0" type="tips"></uv-text>
							</template>
						</uv-input>
					</uv-form-item>
					<!-- <uv-form-item :label="t('appointment.gender')" prop="userInfo.sex" border-bottom
						@click="showSexSelect" :required="true">
						<uv-input v-model="model1.userInfo.sex" disabled disabled-color="#ffffff"
							:placeholder="t('appointment.selectGender')" border="none">
						</uv-input>

						<template #right>
							<uv-icon name="arrow-right"></uv-icon>
						</template>
					</uv-form-item> -->
					<!-- <uv-form-item :label="t('appointment.idCard')" prop="userInfo.idCard" border-bottom>
						<uv-input v-model="model1.userInfo.idCard" border="none" :maxlength="20" type="number">
						</uv-input>
					</uv-form-item> -->
					<!-- <uv-form-item :label="t('appointment.age')" prop="userInfo.age" border-bottom :required="true">
						<uv-input v-model="model1.userInfo.age" border="none" :maxlength="3" type="number">
						</uv-input>
					</uv-form-item> -->
					<uv-form-item :label="t('appointment.dateTime')" prop="userInfo.appointmentTime" border-bottom
						@click="showDataPicker" :required="true">
						<uv-input v-model="model1.userInfo.appointmentTime" disabled disabled-color="#ffffff"
							:placeholder="t('appointment.selectDateTime')" border="none">
						</uv-input>

						<template #right>
							<uv-icon name="arrow-right"></uv-icon>
						</template>
					</uv-form-item>
					<uv-form-item :label="t('appointment.symptoms')" prop="userInfo.symptoms" border-bottom>
						<uv-input v-model="model1.userInfo.symptoms" border="none">
						</uv-input>
					</uv-form-item>
					<!-- <uv-form-item :label="t('appointment.remarks')" prop="userInfo.remarks" border-bottom>
						<uv-input v-model="model1.userInfo.remarks" border="none">
						</uv-input>
					</uv-form-item> -->

					<uv-button type="primary" :text="t('appointment.submit')" custom-style="margin-top: 10px"
						@click="handleAppointment"></uv-button>

					<!-- <uv-button type="error" text="重置" custom-style="margin-top: 10px" @click="reset"></uv-button> -->
				</uv-form>

				<uv-action-sheet ref="sexSelectRefs" :actions="actions" :title="t('appointment.selectGender')"
					@select="sexSelect">
				</uv-action-sheet>

				<uv-datetime-picker ref="datetimePicker" mode="date" :minDate="now" :maxDate="oneMonthLater"
					:cancelText="t('uni.showModal.cancel')" :confirmText="t('uni.showModal.confirm')"
					@confirm="confirmDate">
				</uv-datetime-picker>
				<uv-datetime-picker ref="timePicker" mode="time" :minHour="9" :maxHour="20" :filter="filter"
					:cancelText="t('uni.showModal.cancel')" :confirmText="t('uni.showModal.confirm')"
					@confirm="confirmTime">
				</uv-datetime-picker>
			</view>
		</uv-popup>
		<uv-popup ref="detailRefs" mode="bottom" :close-on-click-overlay="false" :closeable="true" :round="20">
			<view class="detailContent" v-if="detailData != null">
				<view class="header">
					<text class="title">{{t('appointment.appointmentDetails')}}</text>
				</view>

				<view class="detail-list">
					<view class="detail-item">
						<text class="label">{{t('appointment.name')}}</text>
						<text class="value">{{detailData.patientName}}</text>
					</view>

					<view class="detail-item">
						<text class="label">{{t('appointment.phone')}}</text>
						<text class="value">+7{{detailData.patientPhone}}</text>
					</view>

					<view class="detail-item">
						<text class="label">{{t('appointment.dateTime')}}</text>
						<text class="value">{{formatToDate(detailData.appointmentTime)}}
							{{formatToTime(detailData.appointmentTime)}}</text>
					</view>

					<view class="detail-item">
						<text class="label">{{t('appointment.symptoms')}}</text>
						<text class="value">{{detailData.symptom || t('appointment.noData')}}</text>
					</view>

					<view class="detail-item">
						<text class="label">{{t('appointment.status')}}</text>
						<text class="value" :class="getStatusClass(detailData.status)">
							{{getStatusFromStepsList(detailData.status)}}
						</text>
					</view>
				</view>
				<button v-if="[1, 2].includes(detailData.status)" type="warn"
					@click="deleteAppointment(detailData.id)">{{t('appointment.cancelAppointment')}}</button>
			</view>
		</uv-popup>
		<uv-popup ref="smsCodeRef" mode="center" :close-on-click-overlay="false" :closeable="true" :round="20">
			<view class="popupHeight">
				<text>{{$t('login.verification.code')}}</text>
				<uv-code-input v-model="smsCode" mode="line" :maxlength="5" @finish="confirmSmsCode"></uv-code-input>
			</view>
		</uv-popup>
		<uv-popup ref="passwordRef" mode="center" :close-on-click-overlay="false" :closeable="true" :round="20">
			<view class="popupPassword">
				<uv-form label-position="left" :model="registerData" :rules="passwordRules" ref="passwordForm"
					labelPosition="top" labelWidth="250rpx">
					<uv-form-item :label="t('login.password')" prop="password" border-bottom :required="true">
						<uv-input v-model="registerData.password" border="none">
						</uv-input>
					</uv-form-item>
					<uv-button type="primary" :text="t('appointment.submit')" custom-style="margin-top: 10px"
						@click="confirmRegister"></uv-button>
				</uv-form>
			</view>
		</uv-popup>
		<navBar :activeIndex="1"></navBar>
	</view>
</template>

<script setup>
	import {
		onLoad,
		onShow,
		onReady
	} from '@dcloudio/uni-app'
	import navBar from "@/components/navBar.vue"
	import statusBar from "@/components/statusBar.vue"
	import {
		ref,
		reactive,
		computed,
		onMounted
	} from 'vue'
	import {
		createAppointment,
		getAppointmentList,
		appointmentDetails,
		cancelAppointment
	} from '@/api/appointment.js'
	import {
		loginBySms,
		registerMobile,
		getSmsCaptcha,
		loginMobile
	} from '@/api/user.js'
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
	// 定义响应式变量
	const isWeChatMiniProgram = ref(false);
	// Tab相关变量
	const currentTab = ref(0);
	const subsectionList = [{
		name: '当前预约'
	}, {
		name: '历史预约'
	}];

	// Tab切换事件
	const onTabChange = (index) => {
		currentTab.value = index;
		getAppointmentData();
	};

	// 检测运行环境
	onMounted(() => {
		// #ifdef MP-WEIXIN
		isWeChatMiniProgram.value = true;
		// #endif
	});
	const popupRefs = ref()
	const openPopup = () => {
		popupRefs.value.open()
	}
	const closePopup = () => {
		popupRefs.value.close()
	}

	const detailRefs = ref()
	const detailData = ref()
	const openDetail = (item) => {
		const data = {
			id: item.id
		}
		appointmentDetails(data).then(res => {
			if (res.code === 0) {
				detailData.value = res.data
				console.log("details", detailData.value)
				detailRefs.value.open()
			}
		}).catch(err => {
			console.error(err)
		})

	}
	const deleteAppointment = (id) => {
		console.log(id)
		const data = {
			ids: [id]
		}
		cancelAppointment(data).then(res => {
			if (res.code === 0) {
				uni.showToast({
					title: t('appointment.appointmentCancelled'),
					icon: 'none',
					duration: 2000
				});
				detailRefs.value.close()
				getAppointmentData()

			}
		}).catch(err => {
			console.error(err)
		})
	}
	const closeDetail = () => {
		detailRefs.value.close()
	}
	const now = Date.now(); // 当前时间戳（毫秒级）
	const oneMonthLater = new Date().setMonth(new Date().getMonth() + 1); // 下个月时间戳（毫秒级）
	const bookingDate = ref();
	// 表单数据
	const model1 = reactive({
		userInfo: {
			name: '',
			mobile: '',
			sex: '',
			sexValue: 0,
			idCard: '',
			age: null,
			appointmentTime: null,
			symptoms: '',
			remarks: ''
		}
	})
	const appointmentList = ref([]);

	const hasAppointments = computed(() => {
		return Array.isArray(appointmentList.value) && appointmentList.value.length > 0;
	})

	const stepsList = [{
			title: t('appointment.pending'),
			value: 1,
			error: false
		},
		{
			title: t('appointment.confirmed'),
			value: 2,
			error: true
		},
		{
			title: t('appointment.completed'),
			value: 3,
			error: true
		},
		{
			title: t('appointment.expired'),
			value: 4,
			error: false
		},
		// {
		// 	title: t('appointment.expired'),
		// 	value: 5,
		// 	error: false
		// },
	]
	// 表单验证规则
	const rules = {
		'userInfo.name': {
			type: 'string',
			required: true,
			message: t('appointment.fillName'),
			trigger: ['blur', 'change']
		},
		'userInfo.mobile': {
			type: 'number',
			required: true,
			min: 10,
			max: 10,
			message: t('appointment.correctPhone'),
			trigger: ['blur', 'change']
		},
		'userInfo.sex': {
			type: 'string',
			required: true,
			message: t('appointment.selectGenderOption'),
			trigger: ['blur', 'change']
		},
		'userInfo.age': {
			type: 'number',
			required: true,
			message: t('appointment.fillAge'),
			trigger: ['blur', 'change']
		},
		'userInfo.appointmentTime': {
			type: 'string',
			required: true,
			message: t('appointment.selectDateTimeOption'),
			trigger: ['blur', 'change']
		},
	}

	// 性别选择列表
	const actions = [{
			name: t('appointment.male'),
			value: 1
		},
		{
			name: t('appointment.female'),
			value: 2
		}
	]

	// 引用
	const form = ref(null)
	const sexSelectRefs = ref(null)
	const datetimePicker = ref(null)
	const timePicker = ref(null)
	const userId = ref('')
	if (Cache.has(USER_INFO)) {
		uni.getStorage({
			key: 'USER_INFO',
			success: function(res) {
				userId.value = res.data.userId;
				console.log(userId.value)
			},
			fail: function(err) {
				console.error("获取 USER_INFO 失败:", err);
			}
		});
	}

	const passwordForm = ref(null)
	const smsCode = ref('');
	const registerData = reactive({
		password: ''
	})
	const smsCodeRef = ref()
	const openSmsPopup = () => {
		smsCodeRef.value.open()
	}
	const closeSmsPopup = () => {
		smsCodeRef.value.close()
	}

	const passwordRef = ref()
	const openPasswordPopup = () => {
		passwordRef.value.open()
	}
	const closePasswordPopup = () => {
		passwordRef.value.close()
	}

	const passwordRules = {
		'password': {
			type: 'string',
			min: 6,
			max: 16,
			required: true,
			message: t('login.password.length.error'),
			trigger: ['blur', 'change']
		}
	}

	// 获取短信验证码
	const getSms = (phoneNumber) => {
		return getSmsCaptcha({
			phoneNumber
		}).then(res => {
			if (res.code === 0) {
				uni.showToast({
					title: t('appointment.codeSendSuccess'),
					icon: 'success'
				});
				openSmsPopup()
			} else {
				uni.showToast({
					title: t('appointment.codeSendFail'),
					icon: 'error'
				});
			}
		}).catch(err => {
			console.error(err);
		});
	};

	// 登录
	const loginSms = (phoneNumber, captcha) => {
		return loginBySms({
			phoneNumber,
			captcha
		}).then(res => {
			if (res.code === 0) {
				userId.value = res.data.userId
				Cache.set(USER_INFO, res.data, res.data.expire);
				return 'success'; // 登录成功
			} else if (res.code === 3) {
				return 'not_registered'; // 账号未注册
			} else {
				return 'failed'; // 登录失败
			}
		}).catch(err => {
			console.error(err);
			return 'failed';
		});
	};

	// 注册
	const registerSms = (phoneNumber, captcha, username, password) => {
		return registerMobile({
			phoneNumber,
			captcha,
			username,
			password
		}).then(res => {
			return res.code === 0 ? 'success' : 'failed';
		}).catch(err => {
			console.error(err);
			return 'failed';
		});
	};

	// 预约
	const createBooking = () => {
		const data = {
			patientName: model1.userInfo.name,
			patientPhone: model1.userInfo.mobile,
			appointmentTime: bookingDate.value,
			symptom: model1.userInfo.symptoms,
			userId: userId.value,
		};
		return createAppointment(data).then(res => {
			if (res.code === 0) {
				uni.showToast({
					title: t('appointment.success'),
					icon: 'success',
					duration: 2000
				});
				closePopup();
				if (Cache.has(USER_INFO)) {
					getAppointmentData();
				} else {
					window.location.href = 'https://wa.me/77008011117';
				}
			} else {
				// uni.showToast({
				// 	title: '预约失败',
				// 	icon: 'error'
				// });
			}
		}).catch(err => {
			console.error(err);
		});
		// 	else {
		// 		// 创建一个数组来存储有效的消息行
		// 		const messageLines = [`${t('appointment.booking')}:`];

		// 		// 检查每个字段，只有不为空时才添加
		// 		if (model1.userInfo.name) {
		// 			messageLines.push(`${t('appointment.name')}: ${model1.userInfo.name}`);
		// 		}

		// 		if (model1.userInfo.mobile) {
		// 			messageLines.push(`${t('appointment.phone')}: ${model1.userInfo.mobile}`);
		// 		}

		// 		if (model1.userInfo.idCard) {
		// 			messageLines.push(`${t('appointment.idCard')}: ${model1.userInfo.idCard}`);
		// 		}

		// 		if (model1.userInfo.sexValue) {
		// 			messageLines.push(`${t('appointment.gender')}: ${model1.userInfo.sexValue}`);
		// 		}

		// 		if (model1.userInfo.age) {
		// 			messageLines.push(`${t('appointment.age')}: ${model1.userInfo.age}`);
		// 		}

		// 		if (bookingDate.value) {
		// 			messageLines.push(
		// 				`${t('appointment.dateTime')}: ${formatToDate(bookingDate.value)+'-'+formatToTime(bookingDate.value)}`
		// 				);
		// 		}

		// 		if (model1.userInfo.symptoms) {
		// 			messageLines.push(`${t('appointment.symptoms')}: ${model1.userInfo.symptoms}`);
		// 		}

		// 		if (model1.userInfo.remarks) {
		// 			messageLines.push(`${t('appointment.remarks')}: ${model1.userInfo.remarks}`);
		// 		}

		// 		// 将所有非空行连接成一个字符串，每行之间用换行符分隔
		// 		const whatsappMessage = messageLines.join('\n');

		// 		// 对消息进行URL编码
		// 		const encodedMessage = encodeURIComponent(whatsappMessage);

		// 		// Redirect to WhatsApp with the data
		// 		window.location.href = `https://wa.me/77008011117?text=${encodedMessage}`;
		// 	}
	};

	// 处理完整的预约逻辑
	const handleAppointment = async () => {
		try {
			await form.value.validate();
			await createBooking();
		} catch (error) {
			uni.showToast({
				title: t('appointment.validationFailed'),
				icon: 'error'
			});
			return;
		}
	};

	// 用户确认验证码后进行登录或注册
	const confirmSmsCode = async () => {
		try {
			let loginStatus = await loginSms('+7' + model1.userInfo.mobile, smsCode.value);

			if (loginStatus === 'not_registered') {
				uni.showToast({
					title: t('appointment.notRegister'),
					icon: 'none'
				});
				closeSmsPopup()
				openPasswordPopup()
			} else {
				// 登录成功后执行预约
				closeSmsPopup()
				await createBooking();
			}
		} catch (error) {
			console.error(error);
			// uni.showToast({
			// 	title: '操作失败',
			// 	icon: 'error'
			// });
		}
	};

	// 用户确认密码后进行注册
	const confirmRegister = async () => {
		try {
			await passwordForm.value.validate();
			let registerStatus = await registerSms('+7' + model1.userInfo.mobile, smsCode.value, model1.userInfo
				.name,
				registerData.password);
			if (registerStatus !== 'success') {
				uni.showToast({
					title: t('appointment.registerFail'),
					icon: 'error'
				});
				return;
			}

			// 注册成功后再登录
			let loginStatus = await loginSms('+7' + model1.userInfo.mobile, smsCode.value);
			if (loginStatus !== 'success') {
				uni.showToast({
					title: t('appointment.loginFail'),
					icon: 'error'
				});
				return;
			}
			closePasswordPopup()
			// 登录成功后执行预约
			await createBooking();
		} catch (error) {
			console.error(error);
			uni.showToast({
				title: t('appointment.registerFail'),
				icon: 'error'
			});
		}
	};

	// 重置表单
	// const reset = () => {
	// 	form.value.resetFields()
	// 	form.value.clearValidate()
	// }
	const changePopup = (e) => {
		if (!e.show) {
			form.value.resetFields()
			form.value.clearValidate()
		}
	}

	// 显示性别选择
	const showSexSelect = () => {
		sexSelectRefs.value.open()
		hideKeyboard()
	}

	// 选择性别
	const sexSelect = (e) => {
		model1.userInfo.sex = e.name
		model1.userInfo.sexValue = e.value
		console.log(model1.userInfo.sex)
		console.log(model1.userInfo.sexValue)
		// 对部分表单字段进行校验
		form.value.validateField('userInfo.sex', err => {
			// 处理错误后的逻辑
		})
	}

	// 隐藏键盘
	const hideKeyboard = () => {
		uni.hideKeyboard()
	}

	const showDataPicker = () => {
		datetimePicker.value.open()
	}
	const showTimePicker = () => {
		timePicker.value.open()
	}

	const confirmDate = (e) => {
		console.log(e);
		bookingDate.value = e.value; // 暂存日期时间戳
		showTimePicker();
	};

	const confirmTime = (e) => {
		console.log(e);

		const dateTimestamp = bookingDate.value; // 获取暂存的日期时间戳
		const timeString = e.value; // 获取时间字符串，例如 "09:00"

		if (!dateTimestamp || !timeString) {
			console.error("日期或时间数据不完整");
			return;
		}

		// 将日期时间戳转换为本地时间的 Date 对象
		const date = new Date(dateTimestamp);

		// 提取并设置当天的本地年月日（确保时间为本地时间的 00:00:00）
		const year = date.getFullYear();
		const month = date.getMonth();
		const day = date.getDate();
		const localDate = new Date(year, month, day);

		// 从时间字符串提取小时和分钟
		const [hours, minutes] = timeString.split(":").map(Number);

		// 设置新的小时和分钟到当天的本地日期
		localDate.setHours(hours, minutes);

		// 转换为时间戳
		bookingDate.value = localDate.getTime();
		model1.userInfo.appointmentTime = localDate.toLocaleString();

		console.log("合并后的时间戳:", bookingDate.value);
		console.log("合并后的时间:", model1.userInfo.appointmentTime);
	};



	// 复杂的日期过滤器
	const filter = (type, options) => {

		if (type === 'minute') {
			// 只显示整10分钟
			return options.filter(minute => [0, 10, 20, 30, 40, 50].includes(Number(minute)))
		}

		// 如果不匹配任何类型，返回原始选项
		return options
	}

	const getAppointmentData = () => {
		const data = {
			pageNo: 1,
			pageSize: 50,
		}

		// 根据当前选中的分段器添加不同的参数
		if (currentTab.value === 1) {
			// 历史预约需要传递status=3
			data.status = 3;
		}
		// 当前预约不需要传递status参数

		// 显示加载状态
		uni.showLoading({
			title: t('common.loading')
		});

		getAppointmentList(data).then(res => {
			if (res.code === 0) {
				appointmentList.value = res.data.list
				console.log(res.data.list)
			}
		}).catch(err => {
			console.error(err)
		}).finally(() => {
			// 隐藏加载状态
			uni.hideLoading();
		})
	}

	/**
	 * 转换毫秒时间戳为 "YYYY-MM-DD" 格式
	 * @param {number} timestamp 毫秒时间戳
	 * @returns {string} 格式化后的年月日
	 */
	function formatToDate(timestamp) {
		const date = new Date(timestamp);
		const year = date.getFullYear();
		const month = String(date.getMonth() + 1).padStart(2, "0"); // 月份从0开始
		const day = String(date.getDate()).padStart(2, "0");
		return `${year}-${month}-${day}`;
	}

	/**
	 * 转换毫秒时间戳为 "HH:mm" 格式
	 * @param {number} timestamp 毫秒时间戳
	 * @returns {string} 格式化后的小时分钟
	 */
	function formatToTime(timestamp) {
		const date = new Date(timestamp);
		const hours = String(date.getHours()).padStart(2, "0");
		const minutes = String(date.getMinutes()).padStart(2, "0");
		return `${hours}:${minutes}`;
	}

	function getStatusFromStepsList(status) {
		const step = stepsList.find(s => s.value === status);
		return step ? step.title : '未知状态';
	}

	function getStatusClass(status) {
		return `status-${status}`;
	}

	// onLoad(() => {
	// 	getAppointmentData()
	// })
	onLoad(() => {
		if (Cache.has(USER_INFO)) {
			console.log('用户已登录')
			getAppointmentData()
		}
	})
</script>

<style lang="scss">
	.popupContent {
		margin: 60rpx 40rpx;
	}

	.popupHeight {
		margin: 60rpx 60rpx;
		height: 160rpx;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: space-between;
	}

	.popupPassword {
		margin: 60rpx 60rpx;
		height: 220rpx;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: space-between;
	}

	.detailContent {
		min-height: 60vh;
		padding: 30rpx;
		background-color: #f8f8f8;

		.header {
			text-align: center;
			margin-bottom: 40rpx;

			.title {
				font-size: 32rpx;
				font-weight: bold;
				color: #333;
			}
		}

		.detail-list {
			background-color: #fff;
			border-radius: 12rpx;
			padding: 20rpx;

			.detail-item {
				display: flex;
				justify-content: space-between;
				align-items: center;
				padding: 24rpx 0;
				border-bottom: 1px solid #f5f5f5;

				&:last-child {
					border-bottom: none;
				}

				.label {
					font-size: 28rpx;
					color: #666;
					width: 160rpx;
				}

				.value {
					font-size: 28rpx;
					color: #333;
					flex: 1;
					text-align: right;

					&.status-1 {
						color: #ff9900;
					}

					&.status-2 {
						color: #19be6b;
					}

					&.status-3 {
						color: #2979ff;
					}

					&.status-4 {
						color: #909399;
					}
				}
			}

		}
	}

	.tabs-container {
		width: 500rpx;
	}

	.bookingContent {

		.bookingList {
			margin: 20rpx;
			padding: 30rpx 0;
			background-color: #fff;
			border-radius: 20rpx;
			display: flex;
			flex-direction: column;
			gap: 20rpx;

			.bookingTop {
				display: flex;
				justify-content: space-around;

				.bookingDate {
					display: flex;
					gap: 10rpx;
					align-items: center;
					flex-direction: row;
				}

				.bookingTime {
					display: flex;
					gap: 10rpx;
					align-items: center;
					flex-direction: row;
				}
			}

			// uni-view.uv-steps-item__wrapper,
			// uni-view.uv-steps-item__wrapper--row {
			// 	background-color: #d4ffae !important;
			// }
		}

		// ::v-deep(.uv-steps-item__wrapper) {
		// 	background-color: #d4ffae !important;
		// }
		// .uv-steps-item__wrapper{
		// 	background-color: #d4ffae !important;
		// }
	}
</style>