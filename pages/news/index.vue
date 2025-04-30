<template>
  <view class="news-container">
    <!-- 顶部标题栏 -->
    <view class="news-header">
      <text class="news-header-title">{{ t('home.news') }}</text>
    </view>

    <!-- 新闻列表 -->
    <view class="news-list">
      <view v-if="newsData.length === 0 && status !== 'loading'" class="empty-state">
        <image class="empty-image" src="/static/empty-news.png" mode="aspectFit"></image>
        <text class="empty-text">{{ t('news.empty') }}</text>
        <button class="refresh-btn" @click="refreshNews">{{ t('news.refresh') }}</button>
      </view>

      <view 
        v-for="(item, index) in newsData" 
        :key="item.id" 
        class="news-item"
        :class="{'news-item-highlight': index === 0}"
        @click="gotoDetail(item.id)"
        :style="{ animationDelay: `${index * 0.05}s` }">
        
        <!-- 头条新闻 (第一条) 特殊样式 -->
        <template v-if="index === 0">
          <image class="news-featured-image" :src="item.converUrl" mode="aspectFill"></image>
          <view class="news-featured-content">
            <view class="news-label">{{ t('news.featured') }}</view>
            <text class="news-featured-title">{{ item.title }}</text>
            <view class="news-meta">
              <text class="news-time">{{ formatDate(item.createdAt) }}</text>
            </view>
          </view>
        </template>
        
        <!-- 普通新闻样式 -->
        <template v-else>
          <view class="news-content">
            <view class="news-image-container">
              <image class="news-image" :src="item.converUrl" mode="aspectFill"></image>
            </view>
            <view class="news-info">
              <text class="news-title">{{ item.title }}</text>
              <view class="news-footer">
                <text class="news-time">{{ formatDate(item.createdAt) }}</text>
              </view>
            </view>
          </view>
        </template>
      </view>
    </view>

    <!-- 加载更多 -->
    <view class="load-more-wrapper">
      <uv-load-more 
        :status="status" 
        :loadmore-text="t('news.loadmore')" 
        :loading-text="t('news.loading')" 
        :nomore-text="t('news.nomore')" 
        color="#8C6E63" />
    </view>

    <!-- 返回顶部按钮 -->
    <view 
      class="back-to-top" 
      :class="{'visible': showBackToTop}"
      @click="scrollToTop">
      <uni-icons type="top" size="20" color="#FFFFFF"></uni-icons>
    </view>
  </view>
</template>

<script setup>
  import {
    ref,
    computed,
    onMounted
  } from 'vue'
  import {
    onLoad,
    onReachBottom,
    onPageScroll
  } from '@dcloudio/uni-app';
  import {
    newsList
  } from '@/api/home.js'
  import {
    useI18n
  } from 'vue-i18n'
  import i18n from "@/locale/index.js"
  
  const {
    t,
    locale
  } = useI18n()
  
  const newsData = ref([])
  const status = ref('loadmore');
  const page = ref(1);
  const pageSize = ref(10);
  const hasMore = ref(true);
  const showBackToTop = ref(false);
  const isRefreshing = ref(false);

  const getNewsList = (refresh = false) => {
    if (!hasMore.value && !refresh) return;
    
    if (refresh) {
      page.value = 1;
      newsData.value = [];
      hasMore.value = true;
      isRefreshing.value = true;
    }

    status.value = 'loading';

    const data = {
      pageNo: page.value,
      pageSize: pageSize.value
    };

    newsList(data)
      .then(res => {
        if (res.code === 0) {
          const serverData = res.data?.list || [];
          if (serverData.length === 0 && page.value === 1) {
            hasMore.value = false;
            status.value = 'nomore';
            return;
          }

          const currentLocale = uni.getLocale();
          const languageKey = currentLocale === 'zh-Hans' ? 'Zh' :
            currentLocale.charAt(0).toUpperCase() + currentLocale.slice(1);

          const newData = serverData.map(item => ({
            id: item.id,
            title: item[`title${languageKey}`],
            converUrl: item.coverPath,
            createdAt: item.createTime,
            views: Math.floor(Math.random() * 1000) // 模拟浏览量，实际应从API获取
          }));

          if (newData.length < pageSize.value) {
            hasMore.value = false;
            status.value = 'nomore';
          } else {
            status.value = 'loadmore';
          }

          if (refresh) {
            newsData.value = newData;
            uni.showToast({
              title: t('news.refreshSuccess'),
              icon: 'success',
              duration: 2000
            });
          } else {
            newsData.value = [...newsData.value, ...newData];
          }
          
          page.value += 1;
        } else {
          hasMore.value = false;
          status.value = 'error';
          if (refresh) {
            uni.showToast({
              title: t('news.refreshFailed'),
              icon: 'error',
              duration: 2000
            });
          }
        }
      })
      .catch(err => {
        console.error(err);
        status.value = 'error';
        if (refresh) {
          uni.showToast({
            title: t('news.refreshFailed'),
            icon: 'error',
            duration: 2000
          });
        }
      })
      .finally(() => {
        isRefreshing.value = false;
      });
  };

  const gotoDetail = (id) => {
    uni.navigateTo({
      url: "/pages/news/components/details?id=" + id,
      animationType: 'slide-in-right'
    });
  }

  const refreshNews = () => {
    if (isRefreshing.value) return;
    getNewsList(true);
  }

  const scrollToTop = () => {
    uni.pageScrollTo({
      scrollTop: 0,
      duration: 300
    });
  }

  // 时间戳格式化 - 更智能的显示方式
  const formatDate = (timestamp) => {
    const now = new Date();
    const date = new Date(timestamp);
    
    // 计算时间差（毫秒）
    const diff = now - date;
    
    // 如果是今天的新闻
    if (diff < 24 * 60 * 60 * 1000 && 
        now.getDate() === date.getDate() &&
        now.getMonth() === date.getMonth() &&
        now.getFullYear() === date.getFullYear()) {
      
      // 1小时内
      if (diff < 60 * 60 * 1000) {
        const minutes = Math.floor(diff / (60 * 1000));
        return minutes <= 0 ? t('news.justNow') : `${minutes} ${t('news.minutesAgo')}`;
      }
      
      // 显示小时前
      const hours = Math.floor(diff / (60 * 60 * 1000));
      return `${hours} ${t('news.hoursAgo')}`;
    }
    
    // 昨天
    const yesterday = new Date(now);
    yesterday.setDate(yesterday.getDate() - 1);
    if (yesterday.getDate() === date.getDate() &&
        yesterday.getMonth() === date.getMonth() &&
        yesterday.getFullYear() === date.getFullYear()) {
      return t('news.yesterday');
    }
    
    // 一周内
    if (diff < 7 * 24 * 60 * 60 * 1000) {
      const days = Math.floor(diff / (24 * 60 * 60 * 1000));
      return `${days} ${t('news.daysAgo')}`;
    }
    
    // 其他情况显示完整日期
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const day = ('0' + date.getDate()).slice(-2);
    
    // 如果是当年的，不显示年份
    if (year === now.getFullYear()) {
      return `${month}-${day}`;
    }
    
    return `${year}-${month}-${day}`;
  }

  // 监听页面滚动
  onPageScroll(({ scrollTop }) => {
    showBackToTop.value = scrollTop > 300;
  });

  onLoad(() => {
    getNewsList();
  });

  onReachBottom(() => {
    getNewsList();
  });
</script>

<style lang="scss">
  .news-container {
    min-height: 100vh;
    background-color: #F8F8F8;
    padding: 20rpx 30rpx 40rpx;
    position: relative;
    
    // 顶部标题
    .news-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 30rpx;
      
      .news-header-title {
        font-size: 36rpx;
        font-weight: 600;
        color: #333;
      }
      
      .news-filter {
        display: flex;
        align-items: center;
        gap: 8rpx;
        background-color: rgba(140, 110, 99, 0.1);
        padding: 10rpx 20rpx;
        border-radius: 30rpx;
        
        text {
          font-size: 24rpx;
          color: #8C6E63;
        }
      }
    }
    
    // 新闻列表
    .news-list {
      margin-bottom: 20rpx;
      
      // 空数据状态
      .empty-state {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding: 80rpx 0;
        
        .empty-image {
          width: 200rpx;
          height: 200rpx;
          margin-bottom: 20rpx;
          opacity: 0.6;
        }
        
        .empty-text {
          font-size: 28rpx;
          color: #999;
          margin-bottom: 30rpx;
        }
        
        .refresh-btn {
          font-size: 28rpx;
          color: #FFFFFF;
          background-color: #8C6E63;
          padding: 10rpx 40rpx;
          border-radius: 40rpx;
        }
      }
      
      // 新闻条目
      .news-item {
        margin-bottom: 20rpx;
        border-radius: 16rpx;
        background-color: #FFFFFF;
        box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.05);
        overflow: hidden;
        animation: fadeInUp 0.5s ease-out forwards;
        opacity: 0;
        transform: translateY(30rpx);
        
        &-highlight {
          box-shadow: 0 6rpx 16rpx rgba(0, 0, 0, 0.08);
        }
        
        // 头条新闻样式
        .news-featured-image {
          width: 100%;
          height: 340rpx;
          display: block;
        }
        
        .news-featured-content {
          padding: 20rpx;
          
          .news-label {
            display: inline-block;
            font-size: 22rpx;
            color: #FFF;
            background-color: #FF6B6B;
            padding: 4rpx 12rpx;
            border-radius: 6rpx;
            margin-bottom: 10rpx;
          }
          
          .news-featured-title {
            font-size: 32rpx;
            font-weight: 600;
            color: #333;
            line-height: 1.5;
            margin-bottom: 10rpx;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 2;
            overflow: hidden;
          }
        }
        
        // 普通新闻样式
        .news-content {
          display: flex;
          padding: 20rpx;
          
          .news-image-container {
            width: 220rpx;
            height: 150rpx;
            border-radius: 12rpx;
            overflow: hidden;
            margin-right: 20rpx;
            background-color: #F5F5F5;
            flex-shrink: 0;
            
            .news-image {
              width: 100%;
              height: 100%;
              object-fit: cover;
            }
          }
          
          .news-info {
            flex: 1;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            
            .news-title {
              font-size: 28rpx;
              font-weight: 500;
              color: #333;
              line-height: 1.5;
              margin-bottom: 10rpx;
              
              display: -webkit-box;
              -webkit-box-orient: vertical;
              -webkit-line-clamp: 2;
              overflow: hidden;
            }
            
            .news-footer {
              display: flex;
              justify-content: space-between;
              align-items: center;
              
              .news-time {
                font-size: 24rpx;
                color: #999;
              }
              
              .news-stats {
                display: flex;
                align-items: center;
                gap: 16rpx;
                
                .stat-item {
                  display: flex;
                  align-items: center;
                  gap: 4rpx;
                  
                  text {
                    font-size: 22rpx;
                    color: #999;
                  }
                }
              }
            }
          }
        }
        
        .news-meta {
          display: flex;
          justify-content: space-between;
          align-items: center;
          
          .news-time {
            font-size: 24rpx;
            color: #999;
          }
        }
      }
    }
    
    // 加载更多
    .load-more-wrapper {
      padding: 20rpx 0;
      
      :deep(.uni-load-more__img) {
        width: 30rpx !important;
        height: 30rpx !important;
      }
      
      :deep(.uni-load-more__text) {
        font-size: 26rpx;
        color: #8C6E63;
      }
    }
    
    // 返回顶部按钮
    .back-to-top {
      position: fixed;
      right: 30rpx;
      bottom: 120rpx;
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
  
  // 动画效果
  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(30rpx);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
</style>