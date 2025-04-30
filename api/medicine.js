import request from "@/utils/request.js";


/**
 * 获取药品
 */
export function medicineList(data) {
  return request.get("/medical/drug/page",data,{ noAuth : true});
}

/**
 * 获取药品
 */
export function getMedicine(data) {
  return request.get("/medical/drug/get",data,{ noAuth : true});
}