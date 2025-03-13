// +----------------------------------------------------------------------
// | CRMEB [ CRMEB赋能开发者，助力企业发展 ]
// +----------------------------------------------------------------------
// | Copyright (c) 2016~2023 https://www.crmeb.com All rights reserved.
// +----------------------------------------------------------------------
// | Licensed CRMEB并不是自由软件，未经许可不能去掉CRMEB相关版权
// +----------------------------------------------------------------------
// | Author: CRMEB Team <admin@crmeb.com>
// +----------------------------------------------------------------------

import {
	EXPIRE
} from '../config/app';

class Cache {

	constructor(handler) {
		this.cacheSetHandler = uni.setStorageSync;
		this.cacheGetHandler = uni.getStorageSync;
		this.cacheClearHandler = uni.removeStorageSync;
		this.cacheExpire = 'UNI-APP-CRMEB:TAG';
		this.clearOverdue();
	}

	/**
	 * 获取当前时间戳
	 */
	time() {
		return Date.now(); // 返回毫秒级时间戳
	}

	/**
	 * 字符串转时间戳
	 * @param {Object} expiresTime
	 */
	strTotime(expiresTime) {
		let expires_time = expiresTime.substring(0, 19);
		expires_time = expires_time.replace(/-/g, '/');
		return Math.round(new Date(expires_time).getTime() / 1000);
	}


	/**
	 * 设置过期时间缓存
	 * @param {string} key - 缓存的键
	 * @param {number} expire - 过期时间（绝对时间戳，单位为毫秒）
	 */
	setExpireCaheTag(key, expire) {
		if (typeof expire === 'number') {
			let tag = this.cacheGetHandler(this.cacheExpire), // 获取当前过期标签
				newTag = [],
				newKeys = [];

			if (typeof tag === 'object' && Array.isArray(tag)) {
				// 遍历已有标签，更新匹配的 key 的过期时间
				newTag = tag.map(item => {
					newKeys.push(item.key);
					if (item.key === key) {
						item.expire = expire; // 直接设置为绝对时间戳
					}
					return item;
				});
			}

			// 如果 key 不存在，则新增
			if (!newKeys.length || newKeys.indexOf(key) === -1) {
				newTag.push({
					key: key,
					expire: expire // 直接设置为绝对时间戳
				});
			}

			// 更新缓存
			this.cacheSetHandler(this.cacheExpire, newTag);
		}
	}


	/**
	 * 缓存是否过期,过期自动删除
	 * @param {Object} key
	 * @param {Object} $bool true = 删除,false = 不删除
	 */
	getExpireCahe(key, $bool) {
		try {
			let tag = this.cacheGetHandler(this.cacheExpire),
				time = 0,
				index = false;
			if (typeof tag === 'object' && tag.length) {
				tag.map((item, i) => {
					if (item.key === key) {
						time = item.expire
						index = i
					}
				});
				if (time) {
					let newTime = parseInt(time);
					if (time && time < this.time() && !Number.isNaN(newTime)) {
						if ($bool === undefined || $bool === true) {
							this.cacheClearHandler(key);
							if (index !== false) {
								tag.splice(index, 1)
								this.cacheSetHandler(this.cacheExpire, tag);
							}
						}
						return false;
					} else
						return true;
				} else {
					return !!this.cacheGetHandler(key);
				}
			}
			return false;
		} catch (e) {
			return false;
		}
	}

	/**
	 * 设置缓存
	 * @param {Object} key
	 * @param {Object} data
	 */
	set(key, data, expire) {
		if (data === undefined) {
			return true;
		}
		// if (typeof data === 'object')
		// 	data = JSON.stringify(data);
		try {
			this.setExpireCaheTag(key, expire);
			return this.cacheSetHandler(key, data);
		} catch (e) {
			return false;
		}
	}

	/**
	 * 检测缓存是否存在
	 * @param {Object} key
	 */
	has(checkwhethethecacheexists, isDel) {
		this.clearOverdue();
		return this.getExpireCahe(checkwhethethecacheexists, isDel);
	}

	/**
	 * 获取缓存
	 * @param {Object} key
	 * @param {Object} $default
	 * @param {Object} expire
	 */
	get(key, $default, expire) {
		this.clearOverdue();
		try {
			let isBe = this.getExpireCahe(key);
			let data = this.cacheGetHandler(key);
			if (data && isBe) {
				if (typeof $default === 'boolean')
					return JSON.parse(data);
				else
					return data;
			} else {
				if (typeof $default === 'function') {
					let value = $default();
					this.set(key, value, expire);
					return value;
				} else {
					this.set(key, $default, expire);
					return $default;
				}
			}
		} catch (e) {
			return null;
		}
	}
	
	/**
	 * 更新缓存中的值
	 * @param {string} key - 缓存的键
	 * @returns {Object} - 返回一个代理对象，可用于动态更新缓存中的字段
	 */
	update(key) {
	    const currentData = this.cacheGetHandler(key);
	    if (!currentData) {
	        console.warn(`Cache key "${key}" does not exist. Initializing with an empty object.`);
	        this.set(key, {}); // 初始化为一个空对象
	    }
	
	    const handler = {
	        get: (target, prop) => target[prop],
	        set: (target, prop, value) => {
	            target[prop] = value;
	            this.set(key, target); // 更新缓存
	            return true;
	        }
	    };
	
	    const parsedData = typeof currentData === 'string' ? JSON.parse(currentData) : currentData;
	    return new Proxy(parsedData || {}, handler);
	}


	/**
	 * 删除缓存
	 * @param {Object} key
	 */
	clear(key) {
		try {
			let cahceValue = this.cacheGetHandler(this.cacheExpire),
				index = false;
			if (cahceValue && typeof cahceValue === 'object' && cahceValue.length) {
				cahceValue.map((item, i) => {
					if (item.key === key) {
						index = i;
					}
				});

				if (index !== false) {
					cahceValue.splice(index, 1);
				}
				this.cacheSetHandler(this.cacheExpire, cahceValue);
			}
			return this.cacheClearHandler(key);
		} catch (e) {
			return false;
		}
	}

	/**
	 * 清除过期缓存
	 */
	clearOverdue() {
		let cahceValue = this.cacheGetHandler(this.cacheExpire),
			time = this.time(),
			newBeOverdueValue = [],
			newTagValue = [];

		if (cahceValue && typeof cahceValue === 'object' && cahceValue.length) {
			cahceValue.map(item => {
				if (item) {
					if ((item.expire !== undefined && item.expire > time) || item.expire === 0) {
						newTagValue.push(item);
					} else {
						newBeOverdueValue.push(item.key);
					}
				}
			});
		}
		//保存没有过期的缓存标签
		if (newTagValue.length !== cahceValue.length) {
			this.cacheSetHandler(this.cacheExpire, newTagValue);
		}
		//删除过期缓存
		newBeOverdueValue.forEach(k => {
			this.cacheClearHandler(k);
		})
	}
}


export default new Cache;