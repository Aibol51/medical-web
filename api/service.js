import request from "@/utils/request.js";


/**
 * 获取服务列表
 */
export function servicetList(data) {
  return request.get("/medical/service/page",data,{ noAuth : true});
}

/**
 * 获取服务
 */
export function getService(data) {
  return request.get("/medical/service/get",data,{ noAuth : true});
}