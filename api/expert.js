import request from "@/utils/request.js";


/**
 * 获取专家列表
 */
export function expertList(data) {
  return request.get("/medical/expert/page",data,{ noAuth : true});
}

/**
 * 获取专家
 */
export function getExpert(data) {
  return request.get("/medical/expert/get",data,{ noAuth : true});
}