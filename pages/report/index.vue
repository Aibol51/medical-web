<template>
	<view class="record-list">
		<!-- 空状态显示 -->
		<uv-empty v-if="!reportData?.length" mode="history" textSize="18" :text="$t('report.empty')" width="200"
			height="200" />

		<!-- 简化卡片列表显示 -->
		<view v-else>
			<view v-for="(item, index) in reportData" :key="item.id" class="record-card" @click="showDetail(index)">
				<view class="record-header">
					<view class="patient-info">
						<text class="patient-name">{{item.patientName}}</text>
						<text class="gender-age">{{item.gender === 1 ? $t('report.male') : $t('report.female')}} |
							{{item.age}}{{$t('report.age')}}</text>
					</view>
					<text class="visit-date">{{formatDate(item.createTime)}}</text>
				</view>

				<view class="record-brief">
					<view class="brief-item">
						<text class="brief-label">{{$t('report.complaintTitle')}}：</text>
						<text class="brief-value">{{item.chiefComplaint || $t('report.none')}}</text>
					</view>
					<view class="brief-item">
						<text class="brief-label">{{$t('report.diagnosis')}}：</text>
						<text class="brief-value">{{item.diagnosis}}</text>
					</view>
				</view>

				<view class="record-footer">
					<view class="tag" :class="{'critical': isCritical(item)}">{{getStatusTag(item)}}</view>
					<text class="view-detail">{{$t('report.viewDetail')}} <text class="arrow">›</text></text>
				</view>
			</view>
		</view>

		<!-- 底部弹窗 -->
		<uv-popup ref="popupRef" mode="bottom" @change="changePopup" :close-on-click-overlay="true" :closeable="true"
			custom-style="max-height: 85vh;" :round="20">
			<view class="popup-content" v-if="currentRecord">
				<view class="popup-header">
					<text class="popup-title">{{$t('report.popupTitle')}}</text>
				</view>

				<!-- 患者基本信息 -->
				<view class="detail-section">
					<view class="section-header">
						<text class="section-title">{{$t('report.basicInfo')}}</text>
					</view>
					<view class="info-grid">
						<view class="info-cell">
							<text class="info-label">{{$t('report.name')}}</text>
							<text class="info-value">{{currentRecord.patientName}}</text>
						</view>
						<view class="info-cell">
							<text class="info-label">{{$t('report.gender_label')}}</text>
							<text
								class="info-value">{{currentRecord.gender === 1 ? $t('report.male') : $t('report.female')}}</text>
						</view>
						<view class="info-cell">
							<text class="info-label">{{$t('appointment.age')}}</text>
							<text class="info-value">{{currentRecord.age}}{{$t('report.age')}}</text>
						</view>
						<view class="info-cell">
							<text class="info-label">{{$t('report.idCard')}}</text>
							<text class="info-value">{{formatIdCard(currentRecord.idCardNumber)}}</text>
						</view>
						<view class="info-cell">
							<text class="info-label">{{$t('report.phone')}}</text>
							<text class="info-value">{{currentRecord.patientPhone}}</text>
						</view>
						<view class="info-cell">
							<text class="info-label">{{$t('report.visitTime')}}</text>
							<text class="info-value">{{formatDateTime(currentRecord.createTime)}}</text>
						</view>
					</view>
				</view>

				<!-- 病情信息 -->
				<view class="detail-section">
					<view class="section-header">
						<text class="section-title">{{$t('report.illnessInfo')}}</text>
					</view>
					<view class="info-item">
						<text class="info-label">{{$t('report.complaintTitle')}}</text>
						<text class="info-value">{{currentRecord.chiefComplaint || $t('report.none')}}</text>
					</view>
					<view class="info-item">
						<text class="info-label">{{$t('report.presentIllnessTitle')}}</text>
						<text class="info-value">{{currentRecord.presentIllness || $t('report.none')}}</text>
					</view>
					<view class="info-item">
						<text class="info-label">{{$t('report.pastHistoryTitle')}}</text>
						<text class="info-value">{{currentRecord.pastHistory || $t('report.none')}}</text>
					</view>

					<!-- 生活习惯 -->
					<view class="habit-row">
						<view class="habit-item" :class="{'warning': [2, 3, 4].includes(currentRecord.smokingHistory)}">
							<text class="habit-icon">🚬</text>
							<text class="habit-name">{{$t('report.smoking')}}</text>
							<text class="habit-status">{{smokingStatus(currentRecord.smokingHistory)}}</text>
						</view>
						<view class="habit-item"
							:class="{'warning': [2, 3, 4].includes(currentRecord.drinkingHistory)}">
							<text class="habit-icon">🍺</text>
							<text class="habit-name">{{$t('report.drinking')}}</text>
							<text class="habit-status">{{smokingStatus(currentRecord.drinkingHistory)}}</text>
						</view>
						<view class="habit-item" :class="{'warning': currentRecord.allergyHistory === 2}">
							<text class="habit-icon">🧪</text>
							<text class="habit-name">{{$t('report.allergy')}}</text>
							<text class="habit-status">{{formatHabitStatus(currentRecord.allergyHistory)}}</text>
						</view>
					</view>
				</view>

				<!-- 体征指标 -->
				<view class="detail-section">
					<view class="section-header">
						<text class="section-title">{{$t('report.vitalSigns')}}</text>
					</view>
					<view class="vital-grid">
						<view class="vital-item">
							<text class="vital-value">{{currentRecord.heartRate}}</text>
							<text class="vital-unit">{{$t('report.heartRateUnit')}}</text>
							<text class="vital-name">{{$t('report.heartRate')}}</text>
						</view>
						<view class="vital-item">
							<text class="vital-value">{{currentRecord.bloodPressure}}</text>
							<text class="vital-unit">{{$t('report.bloodPressureUnit')}}</text>
							<text class="vital-name">{{$t('report.bloodPressure')}}</text>
						</view>
						<view class="vital-item">
							<text class="vital-value">{{currentRecord.oxygenSaturation}}</text>
							<text class="vital-unit">{{$t('report.oxygenSaturationUnit')}}</text>
							<text class="vital-name">{{$t('report.oxygenSaturation')}}</text>
						</view>
						<view class="vital-item">
							<text class="vital-value">{{currentRecord.bloodGlucose}}</text>
							<text class="vital-unit">{{$t('report.bloodGlucoseUnit')}}</text>
							<text class="vital-name">{{$t('report.bloodGlucose')}}</text>
						</view>
						<view class="vital-item">
							<text class="vital-value">{{currentRecord.weight}}</text>
							<text class="vital-unit">{{$t('report.weightUnit')}}</text>
							<text class="vital-name">{{$t('report.weight')}}</text>
						</view>
						<view class="vital-item">
							<text class="vital-value">{{currentRecord.waistCircumference}}</text>
							<text class="vital-unit">{{$t('report.waistCircumferenceUnit')}}</text>
							<text class="vital-name">{{$t('report.waistCircumference')}}</text>
						</view>
						<view class="vital-item">
							<text class="vital-value">{{currentRecord.bodyFat}}</text>
							<text class="vital-unit">{{$t('report.bodyFatUnit')}}</text>
							<text class="vital-name">{{$t('report.bodyFat')}}</text>
						</view>
					</view>
				</view>

				<!-- 诊断与治疗 -->
				<view class="detail-section">
					<view class="section-header">
						<text class="section-title">{{$t('report.diagnosisTreatment')}}</text>
					</view>
					<view class="diagnosis-box">
						<text class="diagnosis-label">{{$t('report.diagnosisTitle')}}</text>
						<text class="diagnosis-value">{{currentRecord.diagnosis}}</text>
					</view>

					<view class="treatment-box">
						<text class="treatment-label">{{$t('report.treatmentPlan')}}</text>
						<text class="treatment-value">{{currentRecord.treatmentPlan}}</text>
					</view>

					<!-- 治疗建议 -->
					<view class="therapy-row">
						<view class="therapy-item" :class="{
						        'type-1': currentRecord.dietTherapy === 1,
						        'type-2': currentRecord.dietTherapy === 2,
						        'type-3': currentRecord.dietTherapy === 3,
						        'type-4': currentRecord.dietTherapy === 4,
						        'type-5': currentRecord.dietTherapy === 5,
						        'type-6': currentRecord.dietTherapy === 6,
						        'type-7': currentRecord.dietTherapy === 7
						      }">
							<text class="therapy-icon">🍽️</text>
							<text class="therapy-name">{{$t('report.dietTherapy')}}</text>
							<text class="therapy-status">{{$t(`report.diet.${currentRecord.dietTherapy}`)}}</text>
						</view>
						<!-- 运动治疗 -->
						<view class="therapy-item" :class="{
        'exercise-1': currentRecord.exerciseTherapy === 1,
        'exercise-2': currentRecord.exerciseTherapy === 2
      }">
							<text class="therapy-icon">🏃</text>
							<text class="therapy-name">{{$t('report.exerciseTherapy')}}</text>
							<text
								class="therapy-status">{{$t(`report.exercise.${currentRecord.exerciseTherapy}`)}}</text>
						</view>

						<!-- 药物治疗 -->
						<view class="therapy-item" :class="{
        'medication-1': currentRecord.medicationTherapy === 1,
        'medication-2': currentRecord.medicationTherapy === 2,
        'medication-3': currentRecord.medicationTherapy === 3,
        'medication-4': currentRecord.medicationTherapy === 4
      }">
							<text class="therapy-icon">💊</text>
							<text class="therapy-name">{{$t('report.medicationTherapy')}}</text>
							<text
								class="therapy-status">{{$t(`report.medication.${currentRecord.medicationTherapy}`)}}</text>
						</view>
					</view>

					<!-- 备注信息 -->
					<view class="remarks-box" v-if="currentRecord.remarks">
						<text class="remarks-label">{{$t('report.remarks')}}</text>
						<text class="remarks-value">{{currentRecord.remarks}}</text>
					</view>
				</view>

				<!-- 医生建议 -->
				<view class="detail-section" v-if="currentRecord.doctorAdvice">
					<view class="section-header">
						<text class="section-title">{{$t('report.doctorAdvice')}}</text>
					</view>
					<view class="advice-box">
						<text class="advice-content">{{currentRecord.doctorAdvice}}</text>
					</view>
				</view>

				<!-- 				<view class="popup-footer">
					<button class="action-button print">打印记录</button>
					<button class="action-button share">分享记录</button>
				</view> -->
			</view>
		</uv-popup>
	</view>
</template>

<script setup>
	import {
		reportList
	} from '@/api/report.js'
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

	const {
		t
	} = useI18n()
	const reportData = ref([])
	const popupRef = ref(null)
	const currentRecord = ref(null)
	const currentIndex = ref(-1)

	const getReportList = () => {
		const data = {
			pageNo: 1,
			pageSize: 50
		}
		reportList(data).then(res => {
			if (res.code === 0) {
				reportData.value = res.data.list
				console.log(res.data)
			}
		}).catch(err => {
			console.error(err)
		})
	}

	// 显示详情弹窗
	const showDetail = (index) => {
		currentIndex.value = index
		currentRecord.value = reportData.value[index]
		console.log(currentRecord.value)
		popupRef.value.open()
	}

	// 弹窗状态变化
	const changePopup = (e) => {
		if (!e.show) {
			currentRecord.value = null
			currentIndex.value = -1
		}
	}

	// 格式化日期
	const formatDate = (timestamp) => {
		if (!timestamp) return '--'
		const date = new Date(timestamp)
		return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`
	}

	// 格式化日期时间
	const formatDateTime = (timestamp) => {
		console.log(timestamp)
		if (!timestamp) return '--'
		const date = new Date(timestamp)
		return `${formatDate(timestamp)} ${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`
	}

	// 格式化身份证号码（显示前4位和后4位，中间用*替代）
	const formatIdCard = (idCard) => {
		if (!idCard) return '--'
		if (idCard.length > 8) {
			return idCard.substring(0, 4) + '****' + idCard.substring(idCard.length - 4)
		}
		return idCard
	}

	// 格式化习惯状态
	const smokingStatus = (status) => {
		if (status === 1) return t('report.habit.0')
		if (status === 2) return t('report.habit.1')
		if (status === 3) return t('report.habit.2')
		if (status === 4) return t('report.habit.3')
		if (status === 5) return t('report.habit.4')
		return '未知'
	}

	// 格式化习惯状态
	const formatHabitStatus = (status) => {
		if (status === 1) return t('report.habit.0')
		if (status === 2) return t('report.habit.1')
		return '未知'
	}


	// 判断是否为关键/紧急情况
	const isCritical = (item) => {
		// 这里可以根据业务需求定义紧急情况的判断逻辑
		// 例如：心率过高或过低、血压异常等
		if (!item) return false

		// 示例判断逻辑，根据实际需求调整
		return (
			(item.heartRate > 100 || item.heartRate < 50) ||
			(item.oxygenSaturation < 90) ||
			(item.allergyHistory === 1)
		)
	}

	// 获取状态标签
	const getStatusTag = (item) => {
		if (isCritical(item)) {
			return t('report.attention')
		}
		return t('report.normal')
	}

	onShow(() => {
		getReportList()
	})
</script>

<style lang="scss">
	.record-list {
		padding: 20rpx;
		background-color: #f5f5f5;
		min-height: 100vh;

		.record-card {
			background-color: #fff;
			border-radius: 12rpx;
			padding: 24rpx;
			margin-bottom: 20rpx;
			box-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.05);

			.record-header {
				display: flex;
				justify-content: space-between;
				align-items: center;
				margin-bottom: 16rpx;

				.patient-info {
					display: flex;
					align-items: center;

					.patient-name {
						font-size: 32rpx;
						font-weight: bold;
						color: #333;
						margin-right: 20rpx;
					}

					.gender-age {
						font-size: 26rpx;
						color: #666;
					}
				}

				.visit-date {
					font-size: 24rpx;
					color: #999;
				}
			}

			.record-brief {
				margin: 16rpx 0;

				.brief-item {
					display: flex;
					margin-bottom: 8rpx;

					.brief-label {
						font-size: 26rpx;
						color: #666;
						min-width: 80rpx;
					}

					.brief-value {
						font-size: 26rpx;
						color: #333;
						flex: 1;
						// 文本超出部分显示省略号
						white-space: nowrap;
						overflow: hidden;
						text-overflow: ellipsis;
					}
				}
			}

			.record-footer {
				display: flex;
				justify-content: space-between;
				align-items: center;
				margin-top: 16rpx;

				.tag {
					font-size: 22rpx;
					padding: 4rpx 14rpx;
					border-radius: 20rpx;
					background-color: #e6f7ff;
					color: #1890ff;

					&.critical {
						background-color: #fff1f0;
						color: #ff4d4f;
					}
				}

				.view-detail {
					font-size: 24rpx;
					color: #1890ff;

					.arrow {
						font-size: 28rpx;
					}
				}
			}
		}
	}

	// 弹窗样式
	.popup-content {
		max-height: 90vh;
		overflow-y: auto;
		padding-bottom: 30rpx;

		.popup-header {
			text-align: center;
			padding: 30rpx 0;
			position: sticky;
			top: 0;
			background-color: #fff;
			z-index: 1;

			.popup-title {
				font-size: 32rpx;
				font-weight: bold;
				color: #333;
			}
		}

		.detail-section {
			padding: 0 30rpx;
			margin-bottom: 30rpx;

			.section-header {
				margin-bottom: 20rpx;

				.section-title {
					font-size: 30rpx;
					font-weight: bold;
					color: #333;
					position: relative;
					padding-left: 20rpx;

					&:before {
						content: '';
						position: absolute;
						left: 0;
						top: 6rpx;
						height: 28rpx;
						width: 6rpx;
						background-color: #1890ff;
						border-radius: 3rpx;
					}
				}
			}

			.info-grid {
				display: flex;
				flex-wrap: wrap;
				background-color: #f9f9f9;
				border-radius: 8rpx;
				overflow: hidden;

				.info-cell {
					width: 50%;
					padding: 16rpx;
					box-sizing: border-box;
					border-bottom: 1rpx solid #f0f0f0;
					border-right: 1rpx solid #f0f0f0;

					&:nth-child(2n) {
						border-right: none;
					}

					&:nth-last-child(1),
					&:nth-last-child(2) {
						border-bottom: none;
					}

					.info-label {
						font-size: 24rpx;
						color: #999;
						margin-bottom: 8rpx;
						display: block;
					}

					.info-value {
						font-size: 28rpx;
						color: #333;
					}
				}
			}

			.info-item {
				margin-bottom: 16rpx;

				.info-label {
					font-size: 26rpx;
					color: #666;
					display: block;
					margin-bottom: 8rpx;
				}

				.info-value {
					font-size: 28rpx;
					color: #333;
					background-color: #f9f9f9;
					padding: 16rpx;
					border-radius: 8rpx;
					display: block;
				}
			}

			.habit-row {
				display: flex;
				justify-content: space-between;
				margin-top: 20rpx;

				.habit-item {
					flex: 1;
					margin: 0 8rpx;
					background-color: #f9f9f9;
					padding: 16rpx;
					border-radius: 8rpx;
					text-align: center;

					&.warning {
						background-color: #fff1f0;

						.habit-icon,
						.habit-status {
							color: #ff4d4f;
						}
					}

					.habit-icon {
						font-size: 40rpx;
						display: block;
						margin-bottom: 8rpx;
					}

					.habit-name {
						font-size: 24rpx;
						color: #666;
						margin-bottom: 8rpx;
						display: block;
					}

					.habit-status {
						font-size: 26rpx;
						color: #333;
						font-weight: bold;
					}
				}
			}

			.vital-grid {
				display: flex;
				flex-wrap: wrap;
				margin: 0 -8rpx;

				.vital-item {
					width: 25%;
					padding: 8rpx;
					box-sizing: border-box;
					text-align: center;
					margin-bottom: 16rpx;

					.vital-value {
						font-size: 32rpx;
						color: #333;
						font-weight: bold;
					}

					.vital-unit {
						font-size: 22rpx;
						color: #999;
					}

					.vital-name {
						font-size: 24rpx;
						color: #666;
						margin-top: 8rpx;
						display: block;
					}
				}
			}

			.diagnosis-box,
			.treatment-box {
				background-color: #f9f9f9;
				padding: 16rpx;
				border-radius: 8rpx;
				margin-bottom: 16rpx;

				.diagnosis-label,
				.treatment-label {
					font-size: 26rpx;
					color: #666;
					margin-bottom: 8rpx;
					display: block;
				}

				.diagnosis-value,
				.treatment-value {
					font-size: 28rpx;
					color: #333;
					font-weight: bold;
				}
			}

			.diagnosis-box {
				background-color: #e6f7ff;
				border-left: 6rpx solid #1890ff;

				.diagnosis-label {
					color: #1890ff;
				}
			}

			.therapy-row {
				display: flex;
				justify-content: space-between;
				margin-top: 20rpx;
				margin-bottom: 20rpx;

				.therapy-item {
					flex: 1;
					margin: 0 8rpx;
					background-color: #f9f9f9;
					padding: 16rpx;
					border-radius: 8rpx;
					text-align: center;

					/* 低强度运动 */
					&.exercise-1 {
						background-color: #e6f7ff;
						border-color: #1890ff;
					}

					/* 中强度运动 */
					&.exercise-2 {
						background-color: #fff1f0;
						border-color: #ff4d4f;
					}

					/* 中药茶饮 */
					&.medication-1 {
						background-color: #f6ffed;
						border-color: #52c41a;
					}

					/* 中成药 */
					&.medication-2 {
						background-color: #fff7e6;
						border-color: #faad14;
					}

					/* 中草药 */
					&.medication-3 {
						background-color: #f9f0ff;
						border-color: #722ed1;
					}

					/* 西药 */
					&.medication-4 {
						background-color: #f0f5ff;
						border-color: #2f54eb;
					}

					&.type-1 {
						/* 清淡 */
						background-color: #e8f4ff;
						border-color: #69b1ff;
					}

					&.type-2 {
						/* 少辣刺激 */
						background-color: #fff1f0;
						border-color: #ff7875;
					}

					&.type-3 {
						/* 少肉 */
						background-color: #fff7e6;
						border-color: #ffa940;
					}

					&.type-4 {
						/* 低盐 */
						background-color: #f6ffed;
						border-color: #95de64;
					}

					&.type-5 {
						/* 低脂 */
						background-color: #f9f0ff;
						border-color: #b37feb;
					}

					&.type-6 {
						/* 少糖 */
						background-color: #fff0f6;
						border-color: #ff85c0;
					}

					&.type-7 {
						/* 少谅 */
						background-color: #f0f5ff;
						border-color: #85a5ff;
					}

					.therapy-icon {
						font-size: 40rpx;
						display: block;
						margin-bottom: 8rpx;
					}

					.therapy-name {
						font-size: 24rpx;
						color: #666;
						margin-bottom: 8rpx;
						display: block;
					}

					.therapy-status {
						font-size: 26rpx;
						color: #333;
						font-weight: bold;
					}
				}
			}

			.remarks-box,
			.advice-box {
				background-color: #f9f9f9;
				padding: 16rpx;
				border-radius: 8rpx;

				.remarks-label {
					font-size: 26rpx;
					color: #666;
					margin-bottom: 8rpx;
					display: block;
				}

				.remarks-value,
				.advice-content {
					font-size: 28rpx;
					color: #333;
				}
			}
		}

		// .popup-footer {
		// 	display: flex;
		// 	justify-content: space-between;
		// 	padding: 0 30rpx;
		// 	margin-top: 30rpx;

		// 	.action-button {
		// 		width: 48%;
		// 		height: 80rpx;
		// 		line-height: 80rpx;
		// 		text-align: center;
		// 		border-radius: 40rpx;
		// 		font-size: 28rpx;

		// 		&.print {
		// 			background-color: #f5f5f5;
		// 			color: #333;
		// 		}

		// 		&.share {
		// 			background-color: #1890ff;
		// 			color: #fff;
		// 		}
		// 	}
		// }
	}
</style>