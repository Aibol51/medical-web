import request from "@/utils/request.js";
/**
 * 预约详情
 * 
 */
export function appointmentDetails(data) {
	return request.get('/medical/appointment/get', data);
}
/**
 * 创建预约
 * 
 */
export function createAppointment(data) {
	return request.post('/medical/appointment/create', data);
}

/**
 * 删除预约
 * 
 */
export function cancelAppointment(data) {
	return request.delete('/medical/appointment/delete', data);
}

/**
 * 预约列表
 * 
 */
export function getAppointmentList(data) {
	return request.get('/medical/appointment/page', data);
}