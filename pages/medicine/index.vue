<template>
	<view class="product-grid">
		<view class="product-item" v-for="(product, index) in medicineData" :key="index"
			@click="gotoDetail(product.id)">
			<image class="product-image" :src="product.images" mode="aspectFill" />
			<text class="product-name">{{ product.name }}</text>
			<text class="product-price">库存{{ product.quantity }}</text>
		</view>
	</view>
</template>

<script setup>
	import {
		ref,
		computed
	} from 'vue'
	import {
		onLoad
	} from '@dcloudio/uni-app'
	import {
		medicineList
	} from '@/api/medicine.js'

	const medicineData = ref([])

	const getMedicineList = () => {
		const data = {
			page: 1,
			pageSize: 50
		};

		medicineList(data)
			.then(res => {
				if (res.code === 0) {
					const currentLocale = uni.getLocale();
					// 根据当前语言生成键名后缀
					const languageKey = currentLocale === 'zh-Hans' ? 'Zh' :
						currentLocale.charAt(0).toUpperCase() + currentLocale.slice(1);
					const nameKey = `name${languageKey}`;
					const descriptionKey = `description${languageKey}`;

					console.log("原始数据:", res.data.data);

					// 映射数据并根据状态筛选
					medicineData.value = res.data.data.map(item => ({
						id: item.id,
						name: item[nameKey],
						description: item[descriptionKey],
						images: item.images,
						status: item.status,
						quantity: item.quantity
					})).filter(item => item.status === 1); // 仅筛选 status 为 1 的数据

					console.log("处理后的数据:", medicineData.value);
				} else {
					console.error("接口返回错误:", res.msg);
				}
			})
			.catch(err => {
				console.error("请求失败:", err);
			});
	};

	const gotoDetail = (id) => {
		console.log(id)
		uni.navigateTo({
			url: "/pages/medicine/components/details?id=" + id,
			animationType: 'none'
		})
	}

	onLoad(() => {
		getMedicineList()
	})
</script>

<style lang="scss">
	.product-grid {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		/* 2列布局 */
		gap: 16px;
		/* 格子之间的间距 */
		padding: 16px;
	}

	.product-item {
		display: flex;
		flex-direction: column;
		align-items: center;
		background-color: #fff;
		border-radius: 16rpx;
		box-shadow: 0 4rpx 8rpx rgba(0, 0, 0, 0.1);
		padding: 32rpx;
		transition: transform 0.2s;
	}
	.product-item:active {
		transform: scale(0.95);
	}

	.product-image {
		width: 100%;
		height: 180rpx;
		border-radius: 16rpx;
		margin-bottom: 16rpx;
	}

	.product-name {
		font-size: 32rpx;
		font-weight: bold;
		color: #333;
		margin-bottom: 8rpx;
	}

	.product-price {
		font-size: 24rpx;
		color: #ff5722;
	}
</style>