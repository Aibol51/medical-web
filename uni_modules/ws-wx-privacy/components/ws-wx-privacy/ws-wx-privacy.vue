<template>
	<uni-popup id="privacy" type="center" ref="privacyPopup" :maskClick="false">
		<view class="ws-privacy-popup" :style="rootStyle">
			<view class="ws-privacy-popup__header">
				<!--标题-->
				<view class="ws-picker__title">{{ title }}</view>
			</view>
			<view class="ws-privacy-popup__container">
				<text>{{ desc }}</text>
				<text class="ws-privacy-popup__container-protocol" :style="protocolStyle"
					@click="openPrivacyContract">{{ privacyContractName||protocol }}</text>
				<text>{{ subDesc }}</text>
			</view>
			<view class="ws-privacy-popup__footer">
				<button class="is-agree" :style="agreeStyle" id="agree-btn" open-type="agreePrivacyAuthorization"
					@agreeprivacyauthorization="handleAgree">
					{{agreeText}}
				</button>
				<button class="is-disagree" id="disagree-btn" @click="handleDisagree">
					{{disagreeText}}
				</button>
			</view>
		</view>
	</uni-popup>
</template>
<script>
	import {
		getContext,
		getComponent
	} from './util'
	const privacyResolves = new Set() // onNeedPrivacyAuthorization的reslove

	let privacyHandler = null
	// 注册监听
	if (uni.onNeedPrivacyAuthorization) {
		uni.onNeedPrivacyAuthorization((resolve) => {
			if (typeof privacyHandler === 'function') {
				privacyHandler(resolve)
			}
		})
	}

	export default {
		name: 'wsWxPrivacy',
		emits: ['disagree', 'agree'],
		props: {
			// 标题
			title: {
				type: String,
				default: '用户隐私保护提示'
			},
			// 描述
			desc: {
				type: String,
				default: '感谢您使用本应用，您使用本应用的服务之前请仔细阅读并同意'
			},
			// 自定义隐私保护指引名称
			protocol: {
				type: String,
				default: '《用户隐私保护指引》'
			},
			// 是否自动获取隐私保护指引名称（开启后调用getPrivacySetting获取名称）
			enableAutoProtocol: {
				type: Boolean,
				default: false, // 默认为使用自定义隐私指引名称
			},
			// 子描述
			subDesc: {
				type: String,
				default: '。当您点击同意并开始使用产品服务时，即表示你已理解并同意该条款内容，该条款将对您产生法律约束力。如您拒绝，将无法使用相应服务。'
			},
			/**
			 * 控制是否可以点击不同意按钮并显示提示。
			 * 如果设置为 true，用户可以点击不同意按钮执行后续逻辑。
			 * 如果设置为 false，点击不同意按钮会显示提示信息，但不会执行后续逻辑。
			 * 默认为 true
			 */
			disagreeEnabled: {
				type: Boolean,
				default: true, // 默认为可以点击
			},
			/**
			 * 配置不同意按钮的提示消息内容。
			 */
			disagreePromptText: {
				type: String,
				default: '请先仔细阅读并同意隐私协议', // 默认提示消息
			},
			// 拒绝按钮文字
			disagreeText: {
				type: String,
				default: '不同意'
			},
			// 同意按钮文字
			agreeText: {
				type: String,
				default: '同意并继续'
			},
			// 自定义背景颜色
			bgColor: {
				type: String,
				default: ''
			},
			// 自定义主题颜色（控制同意按钮和隐私协议名称的颜色）
			themeColor: {
				type: String,
				default: ''
			}
		},
		data() {
			return {
				privacyContractName: '',
			}
		},
		computed: {
			rootStyle() {
				if (this.bgColor) {
					return `background:${this.bgColor}`
				} else {
					return ''
				}
			},
			protocolStyle() {
				if (this.themeColor) {
					return `color:${this.themeColor}`
				} else {
					return ''
				}
			},
			agreeStyle() {
				if (this.themeColor) {
					return `background:${this.themeColor}`
				} else {
					return ''
				}
			}
		},
		created() {
			privacyHandler = (resolve) => {
				const context = getContext()
				const privacyPopup = getComponent(context, '#privacy-popup')
				if (privacyPopup) {
					const privacy = getComponent(privacyPopup, '#privacy')
					if (privacy && privacy.open) {
						privacy.open()
					}
				}
				privacyResolves.add(resolve)
			}
			if (this.enableAutoProtocol && uni.getPrivacySetting) {
				uni.getPrivacySetting({
					success: res => {
						if (res.privacyContractName) {
							this.privacyContractName = res.privacyContractName
						}
					},
					fail: () => {},
					complete: () => {}
				})
			}
		},
		methods: {
			/**
			 * 打开隐私协议
			 */
			openPrivacyContract() {
				wx.openPrivacyContract({
					success: (res) => {
						console.log('openPrivacyContract success')
					},
					fail: (res) => {
						console.error('openPrivacyContract fail', res)
					}
				})
			},

			/**
			 * 拒绝隐私协议
			 */
			handleDisagree() {
				if (this.disagreeEnabled) {
					this.$refs.privacyPopup.close()
					privacyResolves.forEach((resolve) => {
						resolve({
							event: 'disagree'
						})
					})
					privacyResolves.clear()
					this.$emit('disagree')
				} else {
					uni.showToast({
						icon: 'none',
						title: this.disagreePromptText
					})
				}

			},

			/**
			 * 同意隐私协议
			 */
			handleAgree() {
				this.$refs.privacyPopup.close()
				privacyResolves.forEach((resolve) => {
					resolve({
						event: 'agree',
						buttonId: 'agree-btn'
					})
				})
				privacyResolves.clear()
				this.$emit('agree')
			}
		}
	}
</script>
<style lang="scss" scoped>
	.ws-privacy-popup {
		padding: 48rpx;
		box-sizing: border-box;
		overflow: hidden;
		width: 560rpx;
		background: linear-gradient(180deg, #e5edff 0%, #ffffff 100%);
		border-radius: 24rpx;

		&__header {
			display: flex;
			align-items: center;
			justify-content: center;
			width: 100%;
			height: 52rpx;
			font-size: 36rpx;
			font-family: PingFangSC-Medium, PingFang SC;
			font-weight: 550;
			color: #1a1a1a;
			line-height: 52rpx;
			margin-bottom: 48rpx;
		}

		&__container {
			width: 100%;
			box-sizing: border-box;
			font-size: 28rpx;
			font-family: PingFangSC-Regular, PingFang SC;
			font-weight: 400;
			color: #333333;
			line-height: 48rpx;
			margin-bottom: 48rpx;

			&-protocol {
				font-weight: 550;
				color: #4D80F0;
			}
		}

		&__footer {
			display: flex;
			flex-direction: column;

			.is-disagree,
			.is-agree {
				width: 100%;
				height: 88rpx;
				background: #ffffff;
				border-radius: 44rpx;
				font-size: 32rpx;
				font-family: PingFangSC-Regular, PingFang SC;
				font-weight: 400;
				color: #666666;
			}

			.is-agree {
				background: #4D80F0;
				color: #ffffff;
				margin-bottom: 18rpx;
			}

			button {
				border: none;
				outline: none;

				&::after {
					border: none;
				}
			}
		}
	}
</style>