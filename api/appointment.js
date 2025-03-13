import request from "@/utils/request.js";
/**
 * 预约详情
 * 
 */
export function appointmentDetails(data) {
	return request.post('/mms-api/appointment', data);
}
/**
 * 创建预约
 * 
 */
export function createAppointment(data) {
	return request.post('/mms-api/appointment/create', data);
}

/**
 * 删除预约
 * 
 */
export function cancelAppointment(data) {
	return request.post('/mms-api/appointment/delete', data);
}

/**
 * 预约列表
 * 
 */
export function getAppointmentList(data) {
	return request.post('/mms-api/appointment/list', data);
}
/**
 * 医生详情
 * 
 */
export function getDoctorDetails(data) {
	return request.get('App.Booked.Details', data, {
		noAuth: true
	});
}

/**
 * 获取医生列表
 * @returns {*}
 */
export function doctorsListapi() {
	return request.get("App.Booked.AppointmentList", {
		noAuth: true
	});
}

/**
 * 预约列表
 * @returns {*}
 */
export function subscribeList(data) {
	return request.get("App.Booked.Reservedlist", data, {

	});
}