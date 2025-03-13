// +----------------------------------------------------------------------
// | CRMEB [ CRMEB赋能开发者，助力企业发展 ]
// +----------------------------------------------------------------------
// | Copyright (c) 2016~2021 https://www.crmeb.com All rights reserved.
// +----------------------------------------------------------------------
// | Licensed CRMEB并不是自由软件，未经许可不能去掉CRMEB相关版权
// +----------------------------------------------------------------------
// | Author: CRMEB Team <admin@crmeb.com>
// +----------------------------------------------------------------------
import {
	HTTP_REQUEST_URL,
	HEADER,
	TOKENNAME
} from '@/config/app';

import i18n from "@/locale/index.js"
console.log(i18n)
function toLogin() {
	uni.showToast({
		title: i18n.global.t('login.prompt'),
		icon: 'none',
		duration: 1000
	});
	setTimeout(function() {
		uni.navigateTo({
			url: "/pages/login/index",
			animationType: 'none'
		})
	}, 2000);
}

/**
 * 发送请求
 */
function baseRequest(url, method, data, {
	noAuth = false,
	noVerify = false
}) {
	let Url = HTTP_REQUEST_URL,
		header = HEADER;


	if (!data) {
		data = {}
	}

	let user = uni.getStorageSync('USER_INFO')
	// if (!noAuth && user.token === '') {
	// 	toLogin()
	// }
	// if (user && user.token != '') {
	// 	data.uid = user.userId
	// 	data.token = user.token
	// }
	if (user && user.token) header[TOKENNAME] = 'Bearer ' + user.token;
	return new Promise((reslove, reject) => {
		uni.request({
			url: Url + url,
			method: method || 'GET',
			header: header,
			data: data || {},
			success: (res) => {
				// 检查401状态码 
				if (res.statusCode === 401) {
					console.log('未授权，请重新登录');
					toLogin(); // 可选是否提示用户 
					reject({
						message: '未授权，请重新登录',
						data: res.data
					});
					return;
				}
				console.log(Url + url, data, res.data);
				if (noVerify) {
					console.log(Url + url, data, res.data);
					reslove(res.data, res);
				}
				reslove(res.data, res);

			}
		})
	});
}

const request = {};

['options', 'get', 'post', 'put', 'head', 'delete', 'trace', 'connect'].forEach((method) => {
	request[method] = (api, data, opt) => baseRequest(api, method, data, opt || {})
});



export default request;