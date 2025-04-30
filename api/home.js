import request from "@/utils/request.js";


/**
 * 获取轮播图
 */
export function swiperList(data) {
  return request.get("/medical/swiper/page",data,{ noAuth : true});
}

/**
 * 获取新闻列表
 */
export function newsList(data) {
  return request.get("/medical/news/page",data);
}
/**
 * 获取新闻
 */
export function getNews(data) {
  return request.get("/medical/news/get",data,{ noAuth : true});
}