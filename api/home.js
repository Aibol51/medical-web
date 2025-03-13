import request from "@/utils/request.js";


/**
 * 获取轮播图
 */
export function swiperList(data) {
  return request.post("/mms-api/swiper/list",data,{ noAuth : true});
}

/**
 * 获取新闻列表
 */
export function newsList(data) {
  return request.post("/mms-api/news/list",data,{ noAuth : true});
}
/**
 * 获取新闻
 */
export function getNews(data) {
  return request.post("/mms-api/news",data,{ noAuth : true});
}