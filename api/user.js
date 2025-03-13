import request from "@/utils/request.js";
/**
 * 用户手机号登录
 * @param data object 用户手机号 
 */
export function loginMobile(data) {
	return request.post("/mms-api/member/login_by_mobile", data, {
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
	return request.post("/mms-api/member/register_by_sms", data, {
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
	return request.post('/mms-api/captcha/sms', data, {
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
	return request.get("/mms-api/member/logout");
}

/**
 * 通过id获取用户信息
 * @param data object 用户id
 */
export function getMemberById(data) {
	return request.post("/mms-api/member/getMemberInfo", data);
}

/**
 * 通过短信重置密码
 * @param data object 手机号,验证码,密码
 */
export function resetPasswordBySms(data) {
	return request.post("/mms-api/member/reset_password_by_sms", data);
}


/**
 * 用户修改信息
 * @param data object 昵称
 */
export function modifyProfile(data) {
	return request.post("/mms-api/member/profile", data);
}




/**
 * 用户发送验证码
 * @param data object 用户手机号
 */
export function registerVerify(data) {
	return request.post("App.Login.GetCode", data, {
		noAuth: true
	});
}
/**
 * 用户手机号注册
 * @param data object 用户手机号 验证码 密码
 */
export function register(data) {
	return request.post("App.Login.Reg", data, {
		noAuth: true
	});
}

/**
 * 用户手机号修改密码
 * @param data object 用户手机号 验证码 密码
 */
export function registerReset(data) {
	return request.post("App.Login.Forget", data, {
		noAuth: true
	});
}
// 修改昵称
export function updateInfo(data) {
	return request.post('App.User.UpUserInfo', data);
}
/**
 * 用户登录
 * @param data object 用户账号密码
 */
export function loginH5(data) {
	return request.post("App.Login.LoginByPass", data, {
		noAuth: true
	});
}

/**
 * 用户手机号忘记密码
 */
export function registerForget(data) {
	return request.post("App.Login.Forget", data, {
		noAuth: true
	});
}

/**
 * 获取协议
 * 
 */
export function getIntegralInfo() {
	return request.get('App.Agreement.Get');
}

/**
 * 注销账户
 * @param object data
 * 
 */
export function userOut(data) {
	return request.post(`App.User.WriteOff`, data)
}

/**
 * 获取用户信息
 * 
 */
export function getUserInfo() {
	return request.get('App.User.GetBaseInfo');
}

/**
 * 头像
 * 
 */
export function editAvatar(data) {
	return request.post('App.User.UpUserInfo', data);
}
/** 修改手机号 */
export function modifyPhone(data) {
	return request.post('App.User.UpMobile', data);
}
/** 修改密码 */
export function modifyPassword(data) {
	return request.post('App.User.UpPass', data);
}