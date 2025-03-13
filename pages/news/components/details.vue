<template>
	<view class="news-detail-container">
		<!-- 顶部导航栏 -->
		<view class="nav-bar">
			<view class="nav-bar-left" @click="goBack">
				<uni-icons type="arrow-left" size="24" color="#333"></uni-icons>
			</view>
			<view class="nav-bar-title">{{ $t('news.detail') }}</view>
			<view class="nav-bar-right">
				<!-- <uni-icons type="share" size="24" color="#333"></uni-icons> -->
			</view>
		</view>

		<!-- 加载状态 -->
		<template v-if="loadingState">
			<view class="loading-container">
				<uv-loading-icon :show="true" mode="spinner" :text="$t('home.loading')" text-color="#8C6E63"
					text-size="28rpx"></uv-loading-icon>
			</view>
		</template>

		<!-- 无内容状态 -->
		<template v-else-if="!newsData.content">
			<view class="empty-container">
				<image class="empty-image" src="/static/empty-content.png" mode="aspectFit"></image>
				<text class="empty-text">{{ $t('news.noContent') }}</text>
				<button class="refresh-btn" @click="refreshNews">{{ $t('news.refresh') }}</button>
			</view>
		</template>

		<!-- 新闻内容 -->
		<template v-else>
			<view class="news-content-scroll" @scroll="handleScroll">
				<!-- 顶部图片 -->
				<image v-if="newsData.coverImage" class="news-hero-image" :src="newsData.coverImage" mode="aspectFill">
				</image>

				<!-- 新闻主体 -->
				<view class="news-main-content">
					<!-- 标题和元数据 -->
					<view class="news-header">
						<view class="news-category" v-if="newsData.category">{{ newsData.category }}</view>
						<view class="news-title">{{ newsData.title }}</view>
						<view class="news-meta">
							<view class="news-author" v-if="newsData.author">
								<image class="author-avatar" src="/static/default-avatar.png"></image>
								<text>{{ newsData.author }}</text>
							</view>
							<view class="news-datetime">
								<text>{{ newsData.createdAt }}</text>
								<text class="time-dot">•</text>
								<text>{{ newsData.time }}</text>
							</view>
						</view>
					</view>

					<!-- 摘要 -->
					<view class="news-summary" v-if="newsData.summary">
						<text>{{ newsData.summary }}</text>
					</view>

					<!-- 正文内容 -->
					<view class="news-content">
						<rich-text :nodes="processedContent"></rich-text>
					</view>

					<!-- 标签 -->
					<view class="news-tags" v-if="newsData.tags && newsData.tags.length">
						<text class="tag-title">{{ $t('news.tags') }}:</text>
						<view class="tags-list">
							<text v-for="(tag, index) in newsData.tags" :key="index" class="tag-item">#{{ tag }}</text>
						</view>
					</view>
				</view>
			</view>
		</template>

		<!-- 返回顶部按钮 -->
		<view class="back-to-top" :class="{ 'visible': showBackToTop }" @click="scrollToTop">
			<uni-icons type="top" size="20" color="#FFFFFF"></uni-icons>
		</view>
	</view>
</template>

<script setup>
	import {
		onLoad,
		onReady,
		onPageScroll,
		onShareAppMessage,
		onShareTimeline
	} from '@dcloudio/uni-app'
	import {
		ref,
		computed
	} from 'vue'
	import {
		getNews
	} from '@/api/home.js'

	// 响应式状态
	const newsData = ref({
		title: '',
		content: '',
		coverImage: '',
		summary: '',
		author: '',
		category: '',
		tags: []
	})
	const loadingState = ref(true)
	const showBackToTop = ref(false)
	const isLiked = ref(false)
	const isBookmarked = ref(false)
	const likesCount = ref(0)
	const commentsCount = ref(0)
	const relatedNews = ref([])

	// 处理HTML内容样式
	const processedContent = computed(() => {
		if (!newsData.value.content) return '';

		let content = newsData.value.content;

		// 添加图片样式
		content = content.replace(/<img/g,
			'<img style="max-width:100%;height:auto;border-radius:12rpx;margin:20rpx 0;"');

		// 添加段落样式
		content = content.replace(/<p/g,
			'<p style="margin-bottom:30rpx;line-height:1.8;color:#333;font-size:30rpx;"');

		// 添加标题样式
		content = content.replace(/<h1/g,
			'<h1 style="font-size:40rpx;margin:30rpx 0;font-weight:bold;color:#222;"');
		content = content.replace(/<h2/g,
			'<h2 style="font-size:36rpx;margin:28rpx 0;font-weight:bold;color:#222;"');
		content = content.replace(/<h3/g,
			'<h3 style="font-size:34rpx;margin:26rpx 0;font-weight:bold;color:#222;"');

		// 添加列表样式
		content = content.replace(/<ul/g, '<ul style="padding-left:40rpx;margin-bottom:30rpx;"');
		content = content.replace(/<li/g,
			'<li style="margin-bottom:16rpx;line-height:1.6;color:#333;font-size:30rpx;"');

		return content;
	});

	// 获取新闻数据
	const getNewsData = async (id) => {
		try {
			loadingState.value = true;

			const data = {
				id: Number(id)
			}
			const res = await getNews(data)

			if (res.code === 0 && res.data) {
				// 处理多语言
				const currentLocale = uni.getLocale()
				const languageKey = currentLocale === 'zh-Hans' ?
					'Zh' :
					currentLocale.charAt(0).toUpperCase() + currentLocale.slice(1)

				const titleKey = `title${languageKey}`
				const contentKey = `content${languageKey}`

				// 设置新闻数据
				newsData.value = {
					title: res.data[titleKey] || '',
					content: res.data[contentKey] || '',
					coverImage: res.data.coverUrl || '',
					createdAt: formatToDate(res.data.createdAt),
					time: formatToTime(res.data.createdAt),
					summary: res.data[`summary${languageKey}`] || '',
					author: res.data.author || '',
					category: res.data.category || '',
					tags: res.data.tags || []
				}

				// 模拟点赞和评论数据
				likesCount.value = Math.floor(Math.random() * 100) + 5;
				commentsCount.value = Math.floor(Math.random() * 20);

				// 模拟相关新闻
				getRelatedNews();

				// 延迟关闭加载状态，让过渡更平滑
				setTimeout(() => {
					loadingState.value = false;
				}, 300);
			} else {
				loadingState.value = false;
				uni.showToast({
					title: $t('news.loadFailed'),
					icon: 'error'
				})
			}
		} catch (err) {
			console.error('Error fetching news:', err)
			loadingState.value = false;
			uni.showToast({
				title: $t('news.networkError'),
				icon: 'error'
			})
		}
	}

	// 模拟获取相关新闻
	const getRelatedNews = () => {
		// 模拟数据
		relatedNews.value = [{
				id: 1,
				title: '相关新闻标题1',
				coverUrl: '/static/news-placeholder.jpg'
			},
			{
				id: 2,
				title: '相关新闻标题2',
				coverUrl: '/static/news-placeholder.jpg'
			},
			{
				id: 3,
				title: '相关新闻标题3',
				coverUrl: '/static/news-placeholder.jpg'
			}
		];
	}

	// 刷新新闻
	const refreshNews = () => {
		const pages = getCurrentPages();
		const currentPage = pages[pages.length - 1];
		const options = currentPage.options || {};

		if (options.id) {
			getNewsData(options.id);
		} else {
			uni.showToast({
				title: $t('news.missingId'),
				icon: 'none'
			});
		}
	}

	// 返回上一页
	const goBack = () => {
		uni.navigateBack();
	}


	// 监听页面滚动
	const handleScroll = (e) => {
		const scrollTop = e.detail.scrollTop;
		// 控制返回顶部按钮显示
		showBackToTop.value = scrollTop > 300;
	}

	// 返回顶部
	const scrollToTop = () => {
		uni.pageScrollTo({
			scrollTop: 0,
			duration: 300
		});
	}

	/**
	 * 格式化日期
	 */
	function formatToDate(timestamp) {
		const date = new Date(timestamp);
		const year = date.getFullYear();
		const month = String(date.getMonth() + 1).padStart(2, "0");
		const day = String(date.getDate()).padStart(2, "0");
		return `${year}-${month}-${day}`;
	}

	/**
	 * 格式化时间
	 */
	function formatToTime(timestamp) {
		const date = new Date(timestamp);
		const hours = String(date.getHours()).padStart(2, "0");
		const minutes = String(date.getMinutes()).padStart(2, "0");
		return `${hours}:${minutes}`;
	}

	// 页面加载处理
	onLoad((option) => {
		if (option && option.id) {
			getNewsData(option.id);
		} else {
			loadingState.value = false;
			uni.showToast({
				title: $t('news.missingId'),
				icon: 'none'
			});
		}
	});

	// 分享功能
	onShareAppMessage(() => {
		return {
			title: newsData.value.title,
			path: `/pages/news/components/details?id=${getCurrentPages()[getCurrentPages().length - 1].options.id}`
		};
	});

	onShareTimeline(() => {
		return {
			title: newsData.value.title,
			query: `id=${getCurrentPages()[getCurrentPages().length - 1].options.id}`
		};
	});
</script>

<style lang="scss">
	.news-detail-container {
		min-height: 100vh;
		background-color: #FFFFFF;
		position: relative;

		// 顶部导航栏
		.nav-bar {
			position: fixed;
			top: 0;
			left: 0;
			right: 0;
			height: 90rpx;
			background-color: rgba(255, 255, 255, 0.97);
			display: flex;
			align-items: center;
			justify-content: space-between;
			padding: 0 30rpx;
			box-shadow: 0 2rpx 10rpx rgba(0, 0, 0, 0.05);
			z-index: 100;
			backdrop-filter: blur(10px);

			.nav-bar-left,
			.nav-bar-right {
				width: 80rpx;
				height: 80rpx;
				display: flex;
				align-items: center;
				justify-content: center;
			}

			.nav-bar-title {
				font-size: 32rpx;
				font-weight: 600;
				color: #333;
				flex: 1;
				text-align: center;
			}
		}

		// 加载状态
		.loading-container {
			display: flex;
			justify-content: center;
			align-items: center;
			min-height: 500rpx;
			margin-top: 120rpx;
		}

		// 无内容状态
		.empty-container {
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			min-height: 700rpx;
			margin-top: 100rpx;

			.empty-image {
				width: 240rpx;
				height: 240rpx;
				margin-bottom: 30rpx;
				opacity: 0.6;
			}

			.empty-text {
				font-size: 30rpx;
				color: #999;
				margin-bottom: 40rpx;
			}

			.refresh-btn {
				font-size: 28rpx;
				color: #FFFFFF;
				background-color: #8C6E63;
				padding: 16rpx 50rpx;
				border-radius: 40rpx;
			}
		}

		// 新闻内容区
		.news-content-scroll {
			height: calc(100vh - 90rpx);
			width: 100%;
			margin-top: 90rpx;

			// 顶部大图
			.news-hero-image {
				width: 100%;
				height: 480rpx;
				display: block;
			}

			// 新闻主体内容
			.news-main-content {
				padding: 40rpx 40rpx 120rpx;

				// 标题和元数据
				.news-header {
					margin-bottom: 40rpx;

					.news-category {
						display: inline-block;
						font-size: 24rpx;
						color: #8C6E63;
						background-color: rgba(140, 110, 99, 0.1);
						padding: 6rpx 20rpx;
						border-radius: 6rpx;
						margin-bottom: 20rpx;
					}

					.news-title {
						font-size: 40rpx;
						font-weight: 700;
						color: #333;
						line-height: 1.4;
						margin-bottom: 30rpx;
					}

					.news-meta {
						display: flex;
						justify-content: space-between;
						align-items: center;

						.news-author {
							display: flex;
							align-items: center;
							gap: 10rpx;

							.author-avatar {
								width: 40rpx;
								height: 40rpx;
								border-radius: 50%;
							}

							text {
								font-size: 26rpx;
								color: #666;
							}
						}

						.news-datetime {
							display: flex;
							align-items: center;
							gap: 8rpx;

							text {
								font-size: 26rpx;
								color: #999;
							}

							.time-dot {
								color: #CCC;
							}
						}
					}
				}

				// 摘要
				.news-summary {
					background-color: #F8F8F8;
					padding: 30rpx;
					border-left: 6rpx solid #8C6E63;
					margin-bottom: 40rpx;
					border-radius: 0 12rpx 12rpx 0;

					text {
						font-size: 28rpx;
						color: #666;
						line-height: 1.6;
						font-style: italic;
					}
				}

				// 正文内容
				.news-content {
					margin-bottom: 50rpx;
				}

				// 标签
				.news-tags {
					margin: 40rpx 0;

					.tag-title {
						font-size: 28rpx;
						color: #666;
						margin-right: 16rpx;
					}

					.tags-list {
						display: flex;
						flex-wrap: wrap;
						gap: 16rpx;
						margin-top: 16rpx;

						.tag-item {
							font-size: 26rpx;
							color: #8C6E63;
							background-color: rgba(140, 110, 99, 0.1);
							padding: 8rpx 20rpx;
							border-radius: 30rpx;
						}
					}
				}
			}

		}

		// 返回顶部按钮
		.back-to-top {
			position: fixed;
			right: 30rpx;
			bottom: 130rpx;
			width: 80rpx;
			height: 80rpx;
			border-radius: 50%;
			background-color: rgba(140, 110, 99, 0.9);
			display: flex;
			align-items: center;
			justify-content: center;
			box-shadow: 0 4rpx 16rpx rgba(0, 0, 0, 0.15);
			opacity: 0;
			transform: scale(0.8);
			transition: all 0.3s;
			z-index: 99;

			&.visible {
				opacity: 1;
				transform: scale(1);
			}
		}
	}
</style>