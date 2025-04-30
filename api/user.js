import request from "@/utils/request.js";
/**
 * 用户手机号登录
 * @param data object 用户手机号 
 */
export function loginMobile(data) {
	console.log('data',data)
	return request.post("/member/auth/login", data, {
		noAuth: true
	});
}

/**
 * 手机验证码登录
 * @param data object 用户手机号 
 */
export function loginBySms(data) {
	return request.post("/mms-api/member/login_by_sms", data, {
		noAuth: true
	});
}

/**
 * 用户手机号注册
 * @param data object 用户手机号 
 */
export function registerMobile(data) {
	return request.post("/member/auth/register", data, {
		noAuth: true
	});
}


/**
 * 微信登录
 * @param data object 用户登录凭证 
 */
export function wechatLogin(data) {
	return request.post("/mms-api/oauth/login/wechat/mini_program", data, {
		noAuth: true
	});
}

/**
 * 获取图片验证码
 * 
 */
export function getCaptcha() {
	return request.get('/mms-api/captcha', {
		noAuth: true
	});
}

/**
 * 获取短信验证码
 * 
 */
export function getSmsCaptcha(data) {
	return request.post('/member/auth/send-sms-code', data, {
		noAuth: true
	});
}

/**
 * 用户名登录
 * @param data object 用户名
 */
export function loginVerify(data) {
	return request.post("/mms-api/member/login", data, {
		noAuth: true
	});
}

/*
 * 退出登录
 * */
export function getLogout() {
	return request.post("/member/auth/logout");
}

/**
 * 获取用户信息
 * @param data object 用户id
 */
export function getMemberInfo() {
	return request.get("/member/user/get");
}

/**
 * 通过短信重置密码
 * @param data object 手机号,验证码,密码
 */
export function resetPasswordBySms(data) {
	return request.put("/member/user/reset-password", data);
}


/**
 * 用户修改信息
 * @param data object 昵称
 */
export function modifyProfile(data) {
	return request.put("/member/user/update", data);
}
