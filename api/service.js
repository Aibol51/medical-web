import request from "@/utils/request.js";


/**
 * 获取服务列表
 */
export function servicetList(data) {
  return request.post("/mms-api/service/list",data,{ noAuth : true});
}

/**
 * 获取服务
 */
export function getService(data) {
  return request.post("/mms-api/service",data,{ noAuth : true});
}