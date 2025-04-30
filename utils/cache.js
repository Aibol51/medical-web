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
  constructor() {
    // uniapp 同步 API
    this.cacheSet = uni.setStorageSync;
    this.cacheGet = uni.getStorageSync;
    this.cacheRemove = uni.removeStorageSync;
  }

  set(key, data) {
    try {
      this.cacheSet(key, data);
      return true;
    } catch (e) {
      console.error('Cache.set 错误', e);
      return false;
    }
  }

  has(key) {
    try {
      const val = this.cacheGet(key);
      return val !== '' && val !== null && val !== undefined;
    } catch (e) {
      console.warn('Cache.has 读取失败', e);
      return false;
    }
  }

  get(key, defaultValue) {
    try {
      const data = this.cacheGet(key);
      if (data !== '' && data !== null && data !== undefined) {
        return data;
      }
      // 不存在时写入并返回 defaultValue
      this.set(key, defaultValue);
      return defaultValue;
    } catch (e) {
      console.error('Cache.get 错误', e);
      return defaultValue;
    }
  }

  clear(key) {
    try {
      this.cacheRemove(key);
      return true;
    } catch (e) {
      console.error('Cache.clear 错误', e);
      return false;
    }
  }
}

export default new Cache();
