<template>
	<view class="home-container">
		<!-- 状态栏 -->
		<statusBar :useThemeColor="true"></statusBar>

		<!-- 顶部区域 -->
		<view class="header-section">
			<!-- 顶部导航栏 -->
			<view class="top-navbar">
				<!-- 语言选择器 -->
				<view class="language-selector" :style="{ alignItems: isWeChatMiniProgram ? 'flex-start' : '' }">
					<picker @change="bindPickerChange" :value="currentLanguageIndex" :range="languageList">
						<view class="language-picker">
							<image class="language-icon" src="/static/global.svg" />
						</view>
					</picker>
				</view>

				<!-- 用户欢迎区 -->
				<view class="welcome-container">
					<text class="welcome-text">{{t('home.hello')}}</text>
					<view v-if="!Cache.has(USER_INFO, false)" class="auth-buttons"
						@click="menuClick('/pages/login/index')">
						<text class="login-text">{{t("login.login")}} / {{t("login.register")}}</text>
					</view>
					<view v-else class="user-greeting">
						<text class="user-name">{{userName}}</text>
						<text class="wave-emoji">👋</text>
					</view>
				</view>
			</view>

			<!-- 轮播图区域 -->
			<view class="banner-container">
				<!-- 骨架屏 -->
				<uv-skeleton v-if="swiperLoading" :loading="true" :animate="true" class="skeleton-banner"
					titleHeight="330rpx" titleWidth="100%">
				</uv-skeleton>

				<!-- 轮播图 -->
				<swiper v-else class="banner-swiper" circular :indicator-dots="true" :autoplay="true" :interval="3000"
					indicator-color="rgba(255, 255, 255, 0.6)" indicator-active-color="#FFFFFF">
					<swiper-item v-for="(item, index) in swiperData" :key="index">
						<view class="swiper-item-container">
							<image class="banner-image" :src="item.banner" mode="aspectFill" />
							<view class="banner-overlay"></view>
							<view v-if="item.title" class="banner-title">
								<text>{{item.title}}</text>
							</view>
						</view>
					</swiper-item>
				</swiper>
			</view>
		</view>

		<!-- 功能菜单区域 -->
		<view class="features-section">
			<view class="features-container">
				<view class="feature-item" v-for="(item, index) in menuList" :key="index"
					@click="item.link ? toLink(item.path) : menuClick(item.path)"
					:style="{ animationDelay: index * 0.05 + 's' }">
					<view class="feature-icon-container">
						<image class="feature-icon" :src="item.img" mode="aspectFit" />
					</view>
					<text class="feature-name">{{ item.name }}</text>
				</view>
			</view>
		</view>

		<!-- 新闻资讯区域 -->
		<view class="news-section">
			<view class="section-header">
				<text class="section-title">{{t("home.news")}}</text>
				<view class="section-more" @click="viewAllNews">
					<text>{{t("home.viewAll")}}</text>
					<uni-icons type="right" size="14" color="#8C6E63"></uni-icons>
				</view>
			</view>

			<!-- 新闻骨架屏 -->
			<view v-if="newsLoading" class="news-skeleton">
				<view v-for="i in 2" :key="i" class="skeleton-news-item">
					<uv-skeleton :loading="true" :animate="true" titleHeight="350rpx" titleWidth="100%" rows="0">
					</uv-skeleton>
				</view>
			</view>

			<!-- 新闻列表 -->
			<view v-else class="news-list">
				<view class="news-card" v-for="(item, index) in newsData" :key="index" @click="gotoDetail(item.id)">
					<image class="news-image" :src="item.converUrl" mode="aspectFill"></image>
					<view class="news-content">
						<text class="news-title">{{item.title}}</text>
						<view class="news-meta" v-if="item.publishDate || item.viewCount">
							<text v-if="item.publishDate" class="news-date">{{formatDate(item.publishDate)}}</text>
							<text v-if="item.viewCount" class="news-views">{{item.viewCount}} {{t("home.views")}}</text>
						</view>
					</view>
				</view>
			</view>
		</view>

		<!-- 底部导航栏 -->
		<navBar :activeIndex="0"></navBar>
	</view>
</template>
<script setup>
	import {
		LOGIN_STATUS,
		USER_INFO,
	} from '@/config/cache';
	import Cache from '@/utils/cache';
	import {
		ref,
		computed,
		onMounted
	} from 'vue'
	import {
		onLoad,
		onShow
	} from '@dcloudio/uni-app'
	import {
		useI18n
	} from 'vue-i18n'
	import navBar from "@/components/navBar.vue"
	import statusBar from "@/components/statusBar.vue"
	import {
		swiperList,
		newsList
	} from '@/api/home.js'

	const {
		t,
		locale
	} = useI18n()

	// const loginStatus = computed(()=>{
	// 	if (Cache.has(LOGIN_STATUS, false))
	// })
	// 定义响应式变量
	const isWeChatMiniProgram = ref(false);

	// 检测运行环境
	onMounted(() => {
		// #ifdef MP-WEIXIN
		isWeChatMiniProgram.value = true;
		// #endif
	});

	const userName = ref("")

	// Language Configuration
	const languageList = [
		t("locale.kk"),
		t("locale.zh-hans"),
		t("locale.ru"),
		t("locale.en")
	]
	const languageCodes = ["kk", "zh-Hans", "ru", "en"]
	const currentLanguageIndex = ref(0)
	const selectedLocale = ref('')

	// Swiper Data
	const swiperData = ref([])
	const swiperLoading = ref(true)
	const newsData = ref([])
	const newsLoading = ref(true)

	// Menu List Computation
	const menuList = computed(() => [{
			name: t("home.booking"),
			path: "/pages/appointment/index",
			img: "/static/booking.png",
			link: false
		},
		{
			name: t("home.medicine"),
			path: "/pages/medicine/index",
			img: "/static/pharmacy.png",
			link: false
		},
		{
			name: t("home.doctorList"),
			path: "/pages/expert/index",
			img: "/static/expert.png",
			link: false
		},
		{
			name: t("home.service"),
			path: "/pages/service/index",
			img: "/static/service.png",
			link: false
		},

		// {
		// 	name: t("home.video"),
		// 	path: "/static/video.png",
		// 	img: "/static/video.png"
		// },
		{
			name: t("home.news"),
			path: "/pages/news/index",
			img: "/static/news.png",
			link: false
		},
		{
			name: t("home.question"),
			path: "https://wa.me/77008011117",
			img: "/static/question.png",
			link: true
		}
	])

	const menuClick = (path) => {
		uni.navigateTo({
			url: path,
			animationType: 'none'
		})
	}
	
	const viewAllNews = () => {
		uni.navigateTo({
			url: '/pages/news/index',
			animationType: 'none'
		})
	}

	const toLink = (path) => {
		window.location.href = path
	}

	// Language Change Handler
	const bindPickerChange = (e) => {
		const selectedIndex = e.detail.value
		currentLanguageIndex.value = selectedIndex
		selectedLocale.value = languageCodes[selectedIndex]

		uni.setLocale(selectedLocale.value)
		locale.value = selectedLocale.value
		getSwiperList()
		getNewsList()
		// uni.showModal({
		// 	content: t('index.language-change-confirm'),
		// 	success: (res) => {
		// 		if (res.confirm) {
		// 			uni.setLocale(selectedLocale.value)
		// 			locale.value = selectedLocale.value
		// 			getSwiperList()
		// 			getNewsList()
		// 		}
		// 	}
		// })
	}

	// Fetch Swiper List
	const getSwiperList = () => {
		const data = {
			page: 1,
			pageSize: 50
		}

		swiperList(data).then(res => {
			if (res.code === 0) {
				const currentLocale = uni.getLocale()
				const languageKey = currentLocale === 'zh-Hans' ? 'Zh' :
					currentLocale.charAt(0).toUpperCase() + currentLocale.slice(1)
				const bannerKey = `banner${languageKey}`

				swiperData.value = res.data.data.map(item => ({
					id: item.id,
					title: item[`title${languageKey}`],
					banner: item[bannerKey],
					jumpUrl: item.jumpUrl
				})).filter(item => item.banner)
				swiperLoading.value = false
			}
		}).catch(err => {
			console.error(err)
		})
	}
	const getNewsList = () => {
		const data = {
			page: 1,
			pageSize: 50
		}

		newsList(data).then(res => {
			if (res.code === 0) {
				console.log(res.data)
				const currentLocale = uni.getLocale()
				const languageKey = currentLocale === 'zh-Hans' ? 'Zh' :
					currentLocale.charAt(0).toUpperCase() + currentLocale.slice(1)

				newsData.value = res.data.data.map(item => ({
					id: item.id,
					title: item[`title${languageKey}`],
					converUrl: item.coverUrl
				}))
				console.log(newsData.value)
				newsLoading.value = false
			}
		}).catch(err => {
			console.error(err)
		})
	}

	const gotoDetail = (id) => {
		console.log(id)
		uni.navigateTo({
			url: "/pages/news/components/details?id=" + id,
			animationType: 'none'
		})
	}


	// Lifecycle Hook
	onLoad(() => {
		getSwiperList()
		getNewsList()

	})
	onShow(() => {
		if (Cache.has(USER_INFO, false)) {
			userName.value = Cache.get(USER_INFO).nickname
			console.log(userName.value)
			console.log(Cache.has(USER_INFO, false))
		}
	})
</script>

<style lang="scss">
	.home-container {
		display: flex;
		flex-direction: column;
		min-height: 100vh;
		background-color: #F8F4F2;
		padding-bottom: constant(safe-area-inset-bottom); // 兼容 IOS<11.2 
		padding-bottom: env(safe-area-inset-bottom); // 兼容 IOS>11.2 

		// 顶部区域样式
		.header-section {
			position: relative;
			background: linear-gradient(to bottom, $theme-color, darken($theme-color, 5%));
			border-radius: 0 0 30rpx 30rpx;
			padding-bottom: 30rpx;
			box-shadow: 0 4rpx 20rpx rgba(0, 0, 0, 0.1);

			// 顶部导航栏
			.top-navbar {
				display: flex;
				flex-direction: column;
				padding: 20rpx 30rpx;

				// 语言选择器
				.language-selector {
					display: flex;
					justify-content: flex-end;
					margin-bottom: 20rpx;

					.language-picker {
						background-color: rgba(255, 255, 255, 0.2);
						padding: 10rpx;
						border-radius: 50%;

						.language-icon {
							width: 44rpx;
							height: 44rpx;
						}
					}
				}

				// 欢迎区域
				.welcome-container {
					display: flex;
					flex-direction: column;
					gap: 10rpx;

					.welcome-text {
						font-size: 36rpx;
						font-weight: 600;
						color: rgba(255, 255, 255, 0.9);
					}

					.auth-buttons {
						.login-text {
							font-size: 32rpx;
							color: #FFFFFF;
							background-color: rgba(255, 255, 255, 0.2);
							padding: 8rpx 20rpx;
							border-radius: 30rpx;
							display: inline-block;
						}
					}

					.user-greeting {
						display: flex;
						align-items: center;
						gap: 10rpx;

						.user-name {
							font-size: 46rpx;
							font-weight: 700;
							color: #FFFFFF;
						}

						.wave-emoji {
							font-size: 42rpx;
							animation: wave 1.5s infinite;
						}
					}
				}
			}

			// 轮播图区域
			.banner-container {
				margin-top: 20rpx;
				padding: 0 30rpx;

				.skeleton-banner {
					border-radius: 20rpx;
					overflow: hidden;
				}

				.banner-swiper {
					height: 330rpx;
					border-radius: 20rpx;
					overflow: hidden;
					box-shadow: 0 8rpx 20rpx rgba(0, 0, 0, 0.15);

					.swiper-item-container {
						position: relative;
						width: 100%;
						height: 100%;

						.banner-image {
							width: 100%;
							height: 100%;
						}

						.banner-overlay {
							position: absolute;
							bottom: 0;
							left: 0;
							right: 0;
							height: 100rpx;
							background: linear-gradient(to top, rgba(0, 0, 0, 0.6), transparent);
						}

						.banner-title {
							position: absolute;
							bottom: 20rpx;
							left: 20rpx;
							right: 20rpx;

							text {
								color: #FFFFFF;
								font-size: 32rpx;
								font-weight: 600;
							}
						}
					}
				}
			}
		}

		// 功能菜单区域
		.features-section {
			margin-top: 40rpx;
			padding: 0 30rpx;

			.features-container {
				display: grid;
				grid-template-columns: repeat(3, 1fr);
				column-gap: 20rpx;
				padding: 30rpx;
				background-color: #FFFFFF;
				border-radius: 20rpx;
				box-shadow: 0 4rpx 16rpx rgba(0, 0, 0, 0.05);

				.feature-item {
					display: flex;
					flex-direction: column;
					align-items: center;
					gap: 16rpx;
					padding: 20rpx 10rpx;
					border-radius: 16rpx;
					transition: all 0.3s;
					animation: fadeIn 0.5s ease-out forwards;
					opacity: 0;

					&:active {
						background-color: rgba(140, 110, 99, 0.1);
					}

					.feature-icon-container {
						width: 90rpx;
						height: 90rpx;
						display: flex;
						align-items: center;
						justify-content: center;
						background-color: rgba(140, 110, 99, 0.1);
						border-radius: 50%;

						.feature-icon {
							width: 60rpx;
							height: 60rpx;
						}
					}

					.feature-name {
						font-size: 26rpx;
						color: #333333;
						text-align: center;
					}
				}
			}
		}

		// 新闻资讯区域
		.news-section {
			margin-top: 40rpx;
			padding: 0 30rpx;
			margin-bottom: 120rpx; // 底部导航栏空间

			.section-header {
				display: flex;
				justify-content: space-between;
				align-items: center;
				margin-bottom: 20rpx;

				.section-title {
					font-size: 34rpx;
					font-weight: 600;
					color: #333333;
				}

				.section-more {
					display: flex;
					align-items: center;
					gap: 4rpx;

					text {
						font-size: 26rpx;
						color: #8C6E63;
					}
				}
			}

			.news-skeleton {
				.skeleton-news-item {
					margin-bottom: 20rpx;
					border-radius: 16rpx;
					overflow: hidden;
				}
			}

			.news-list {
				display: flex;
				flex-direction: column;
				gap: 20rpx;

				.news-card {
					position: relative;
					border-radius: 16rpx;
					overflow: hidden;
					background-color: #FFFFFF;
					box-shadow: 0 4rpx 16rpx rgba(0, 0, 0, 0.05);

					.news-image {
						width: 100%;
						height: 350rpx;
					}

					.news-content {
						position: absolute;
						bottom: 0;
						left: 0;
						right: 0;
						padding: 20rpx;
						background: linear-gradient(to top, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.4), transparent);

						.news-title {
							font-size: 30rpx;
							font-weight: 600;
							color: #FFFFFF;
							margin-bottom: 10rpx;
							display: -webkit-box;
							-webkit-box-orient: vertical;
							-webkit-line-clamp: 2;
							overflow: hidden;
						}

						.news-meta {
							display: flex;
							justify-content: space-between;
							align-items: center;

							.news-date,
							.news-views {
								font-size: 24rpx;
								color: rgba(255, 255, 255, 0.8);
							}
						}
					}
				}
			}
		}
	}

	// 动画效果
	@keyframes fadeIn {
		from {
			opacity: 0;
			transform: translateY(20rpx);
		}

		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	@keyframes wave {
		0% {
			transform: rotate(0deg);
		}

		10% {
			transform: rotate(14deg);
		}

		20% {
			transform: rotate(-8deg);
		}

		30% {
			transform: rotate(14deg);
		}

		40% {
			transform: rotate(-4deg);
		}

		50% {
			transform: rotate(10deg);
		}

		60% {
			transform: rotate(0deg);
		}

		100% {
			transform: rotate(0deg);
		}
	}
</style>