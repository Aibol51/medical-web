import request from "@/utils/request.js";


/**
 * 获取专家列表
 */
export function expertList(data) {
  return request.post("/mms-api/expert/list",data,{ noAuth : true});
}

/**
 * 获取专家
 */
export function getExpert(data) {
  return request.post("/mms-api/expert",data,{ noAuth : true});
}