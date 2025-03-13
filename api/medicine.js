import request from "@/utils/request.js";


/**
 * 获取药品
 */
export function medicineList(data) {
  return request.post("/mms-api/medicine/list",data,{ noAuth : true});
}

/**
 * 获取药品
 */
export function getMedicine(data) {
  return request.post("/mms-api/medicine",data,{ noAuth : true});
}