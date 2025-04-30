import request from "@/utils/request.js";


/**
 * 获取病历
 */
export function reportList(data) {
  return request.get("/medical/record/page",data);
}

/**
 * 获取新闻
 */
export function getNews(data) {
  return request.get("/medical/record/get",data,{ noAuth : true});
}