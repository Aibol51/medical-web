<template>
	<view class="medicine-detail-container">
		<template v-if="loadingState">
			<view class="loading-wrapper">
				<uv-loading-icon 
					:show="true" 
					mode="spinner" 
					text="加载中..." 
					text-color="#999999"
					text-size="14">
				</uv-loading-icon>
			</view>
		</template>
		<template v-else-if="medicineData.images">
			<view class="medicine-image-container">
				<image class="medicine-image" :src="medicineData.images" />
			</view>
			<view class="medicine-info">
				<view class="medicine-name">{{ medicineData.name }}</view>
				<view class="medicine-quantity">库存：{{ medicineData.quantity }} 件</view>
				<view class="medicine-description">{{ medicineData.description }}</view>
			</view>
		</template>
		<template v-else>
			<view class="no-content">暂无内容</view>
		</template>
	</view>
</template>


<script setup>
	import {
		onLoad
	} from '@dcloudio/uni-app'
	import {
		ref,
		onMounted
	} from 'vue'
	import {
		getMedicine
	} from '@/api/medicine.js'

	// 使用响应式对象，减少嵌套
	const medicineData = ref({
		name: '',
		description: ''
	})

	const loadingState = ref(true)

	// 改进错误处理和类型安全
	const getMedicineData = async (id) => {
		try {
			const data = {
				id: Number(id)
			}
			const res = await getMedicine(data)

			if (res.code === 0 && res.data) {
				// 使用更健壮的语言处理逻辑
				const currentLocale = uni.getLocale()
				const languageKey = currentLocale === 'zh-Hans' ?
					'Zh' :
					currentLocale.charAt(0).toUpperCase() + currentLocale.slice(1)

				const nameKey = `name${languageKey}`
				const descriptionKey = `description${languageKey}`

				// 安全地赋值，避免直接修改响应数据
				medicineData.value = {
					name: res.data[nameKey] || '',
					description: res.data[descriptionKey] || '',
					quantity: res.data.quantity,
					images: res.data.images
				}

				// 使用微任务更新加载状态，避免阻塞
				Promise.resolve().then(() => {
					loadingState.value = false
				})
			} else {
				console.error('Failed to fetch news data')
				uni.showToast({
					title: 'Failed to load news',
					icon: 'none'
				})
				loadingState.value = false
			}
		} catch (err) {
			console.error('Error fetching news:', err)
			uni.showToast({
				title: 'Network error',
				icon: 'none'
			})
			loadingState.value = false
		}
	}
	onLoad((option) => {
		if (option && option.id) {
			getMedicineData(option.id)
		} else {
			// 如果没有ID，也要关闭加载状态
			loadingState.value = false
			uni.showToast({
				title: 'Missing news ID',
				icon: 'none'
			})
		}

	})
</script>
<style>
/* 整体容器样式 */
.medicine-detail-container {
	display: flex;
	flex-direction: column;
	background-color: #f8f8f8;
	min-height: 100vh;
}

/* 加载状态样式 */
.loading-wrapper {
	display: flex;
	justify-content: center;
	align-items: center;
	height: 100%;
}

/* 父级容器样式，保证1:1比例 */
.medicine-image-container {
	width: 100%; /* 宽度占满父级 */
	padding-top: 100%; /* 高度通过内边距设置为宽度的100%，保持1:1比例 */
	position: relative; /* 作为图片的定位参考 */
	overflow: hidden; /* 防止图片溢出 */
	background-color: #eaeaea; /* 提供加载时的背景颜色 */
}

/* 图片样式 */
.medicine-image {
	position: absolute; /* 绝对定位，填满父容器 */
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	object-fit: cover; /* 保持图片比例并填充容器 */
}

/* 药品信息样式 */
.medicine-info {
	padding: 20rpx;
	background-color: #ffffff;
	border-top-left-radius: 20rpx;
	border-top-right-radius: 20rpx;
	margin-top: -20rpx; /* 实现圆角与图片的过渡 */
	box-shadow: 0 -2rpx 8rpx rgba(0, 0, 0, 0.1);
}

/* 药品名称样式 */
.medicine-name {
	font-size: 36rpx;
	font-weight: bold;
	color: #333333;
	margin-bottom: 10rpx;
}

/* 药品库存样式 */
.medicine-quantity {
	font-size: 28rpx;
	color: #ff4d4f; /* 突出库存信息 */
	margin-bottom: 20rpx;
}

/* 药品描述样式 */
.medicine-description {
	font-size: 28rpx;
	line-height: 1.5;
	color: #666666;
	text-align: justify;
}

/* 无内容提示样式 */
.no-content {
	text-align: center;
	color: #999999;
	font-size: 30rpx;
	margin-top: 100rpx;
}
</style>