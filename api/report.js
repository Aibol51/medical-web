import request from "@/utils/request.js";


/**
 * 获取病历
 */
export function reportList(data) {
  return request.post("/mms-api/medical_record/list",data,{ noAuth : true});
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