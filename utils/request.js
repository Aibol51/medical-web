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
		});
	}, 2000);
}

// 判断是否需要刷新
function isTokenExpired(expiresTime) {
	const now = Date.now();
	return !expiresTime || now + 60000 >= expiresTime; // 提前1分钟刷新
}

// 刷新 accessToken
function refreshToken(user) {
	const HEADER = {
		'content-type': 'application/x-www-form-urlencoded',
		'Form-type': 'app'
	};

	return new Promise((resolve, reject) => {
		if (!user || !user.refreshToken) {
			toLogin();
			return reject('No refreshToken');
		}

		const header = {
			...HEADER,
			[TOKENNAME]: 'Bearer ' + user.accessToken
		};

		uni.request({
			url: HTTP_REQUEST_URL + '/member/auth/refresh-token',
			method: 'POST', // 你指定了 POST，这里就用 POST
			header,
			data: {
				refreshToken: user.refreshToken
			},
			// 你没用 data 就留空（因为你拼到了 URL 上）
			success: (res) => {
				if (res.statusCode === 200 && res.data.code === 0) {
					const newData = res.data.data;
					const newUserInfo = {
						...user,
						accessToken: newData.accessToken,
						refreshToken: newData.refreshToken,
						expiresTime: newData.expiresTime
					};
					uni.setStorageSync('USER_INFO', newUserInfo);
					resolve(newUserInfo);
				} else {
					toLogin();
					reject('Refresh failed');
				}
			},
			fail: () => {
				toLogin();
				reject('Refresh failed');
			}
		});
	});
}


function baseRequest(url, method, data, {
	noAuth = false,
	noVerify = false
}) {
	let Url = HTTP_REQUEST_URL;
	let header = {
		...HEADER
	};
	if (!data) data = {};

	let user = uni.getStorageSync('USER_INFO');

	const proceed = (tokenToUse) => {
		if (tokenToUse) {
			header[TOKENNAME] = 'Bearer ' + tokenToUse;
		}
		return new Promise((resolve, reject) => {
			uni.request({
				url: Url + url,
				method: method || 'GET',
				header,
				data,
				success: (res) => {
					if (res.statusCode === 401) {
						toLogin();
						return reject({
							message: '未授权，请重新登录',
							data: res.data
						});
					}
					if (noVerify || res.data.code === 0) {
						resolve(res.data);
					} else {
						reject(res.data);
					}
				},
				fail: reject
			});
		});
	};
	// 主逻辑：先判断是否过期，过期就刷新，然后发请求
	if (!noAuth && user && user.accessToken) {
		if (isTokenExpired(user.expiresTime)) {
			return refreshToken(user).then((newUser) => {
				return proceed(newUser.accessToken);
			}).catch((err) => {
				return Promise.reject(err);
			});
		} else {
			return proceed(user.accessToken);
		}
	} else {
		return proceed(); // 不需要 token
	}
}


const request = {};

['options', 'get', 'post', 'put', 'head', 'delete', 'trace', 'connect'].forEach((method) => {
	request[method] = (api, data, opt) => baseRequest(api, method, data, opt || {})
});



export default request;