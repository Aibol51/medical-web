<template>
	<view class="newsContent">
		<view class="grid-container">
			<view class="grid-item" v-for="(item, index) in expertData" :key="index" @click="gotoDetail(item.id)">
				<image class="cover-image" :src="item.converUrl"></image>
				<view class="cover-content">
					<text class="title">{{ item.title }}</text>
				</view>
			</view>
		</view>
		<uv-load-more :status="status" :loadmore-text="t('news.loadmore')" :loading-text="t('news.loading')"
			:nomore-text="t('news.nomore')" />
	</view>
</template>

<script setup>
	import {
		ref,
		onMounted
	} from 'vue';
	import {
		expertList
	} from '@/api/expert.js';
	import {
		useI18n
	} from 'vue-i18n';

	const {
		t
	} = useI18n();
	const expertData = ref([]);
	const status = ref('loadmore');
	const page = ref(1);
	const pageSize = ref(8);
	const hasMore = ref(true);

	const getExpertList = async () => {
		if (!hasMore.value) return;
		status.value = 'loading';
		try {
			const res = await expertList({
				pageNo: page.value,
				pageSize: pageSize.value
			});
			if (res.code === 0) {
				const serverData = res.data?.list || [];
				if (serverData.length === 0 && page.value === 1) {
					hasMore.value = false;
					status.value = 'nomore';
					return;
				}
				const currentLocale = uni.getLocale();
				const languageKey = currentLocale === 'zh-Hans' ? 'Zh' : currentLocale.charAt(0).toUpperCase() +
					currentLocale.slice(1);
				const newData = serverData.map(item => ({
					id: item.id,
					title: item.nickname,
					converUrl: item.avatar
				}));
				if (newData.length < pageSize.value) {
					hasMore.value = false;
					status.value = 'nomore';
				} else {
					status.value = 'loadmore';
				}
				expertData.value = [...expertData.value, ...newData];
				page.value += 1;
			} else {
				hasMore.value = false;
				status.value = 'error';
			}
		} catch (error) {
			console.error(error);
			status.value = 'error';
		}
	};

	const gotoDetail = (id) => {
		uni.navigateTo({
			url: `/pages/expert/components/details?id=${id}`
		});
	};

	onMounted(() => {
		getExpertList();
	});
</script>

<style lang="scss">
	.newsContent {
		padding-bottom: 50rpx;
	}

	.grid-container {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: 20rpx;
		padding: 20rpx;
	}

	.grid-item {
		background: #fff;
		border-radius: 12rpx;
		overflow: hidden;
		box-shadow: 0 4rpx 10rpx rgba(0, 0, 0, 0.1);
		transition: transform 0.2s;
	}

	.grid-item:active {
		transform: scale(0.95);
	}

	.cover-image {
		width: 100%;
		height: 280rpx;
		object-fit: cover;
		border-top-left-radius: 12rpx;
		border-top-right-radius: 12rpx;
	}

	.cover-content {
		padding: 15rpx;
		text-align: center;
	}

	.title {
		font-size: 28rpx;
		font-weight: bold;
		color: #333;
		display: block;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}
</style>