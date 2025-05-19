# 医疗网站项目交接文档
## 项目概述
本项目是一个多语言支持的医疗服务网站，提供预约、药品查询、专家列表、新闻资讯等功能。项目使用 uni-app 框架开发，支持多端部署。

## 目录结构
/medical-web/
├── .gitignore                 # Git忽略文件
├── .hbuilderx/                # HBuilderX配置文件
├── App.vue                    # 应用入口组件
├── README.md                  # 项目说明文档
├── androidPrivacy.json        # 安卓隐私政策配置
├── api/                       # API接口目录
│   ├── appointment.js         # 预约相关接口
│   ├── expert.js              # 专家相关接口
│   ├── home.js                # 首页相关接口
│   ├── inquiry.js             # 咨询相关接口
│   ├── medicine.js            # 药品相关接口
│   ├── report.js              # 报告相关接口
│   ├── service.js             # 服务相关接口
│   └── user.js                # 用户相关接口
├── components/                # 公共组件
│   ├── navBar.vue             # 导航栏组件
│   └── statusBar.vue          # 状态栏组件
├── config/                    # 配置文件目录
│   ├── app.js                 # 应用配置
│   ├── cache.js               # 缓存配置
│   └── socket.js              # WebSocket配置
├── locale/                    # 国际化语言文件
│   ├── en.json                # 英文
│   ├── index.js               # 国际化配置入口
│   ├── kk.json                # 哈萨克语
│   ├── ru.json                # 俄语
│   └── zh-Hans.json           # 简体中文
├── main.js                    # 项目入口文件
├── manifest.json              # 应用配置清单
├── pages.json                 # 页面路由配置
├── pages/                     # 页面目录
│   ├── appointment/           # 预约页面
│   ├── expert/                # 专家页面
│   ├── home/                  # 首页
│   ├── login/                 # 登录页面
│   ├── medicine/              # 药品页面
│   ├── news/                  # 新闻页面
│   ├── privacy/               # 隐私政策页面
│   ├── report/                # 报告页面
│   ├── service/               # 服务页面
│   ├── setting/               # 设置页面
│   └── user/                  # 用户中心页面
├── static/                    # 静态资源目录
│   ├── logo.png               # 应用logo
│   ├── navBar/                # 导航栏图标
│   └── ...                    # 其他静态资源
├── uni.scss                   # 全局样式变量
├── uni_modules/               # uni扩展模块
│   ├── uni-forms/             # 表单组件
│   ├── uni-icons/             # 图标组件
│   ├── uni-popup/             # 弹窗组件
│   └── ...                    # 其他组件
├── utils/                     # 工具函数目录
│   ├── cache.js               # 缓存工具
│   ├── format.js              # 格式化工具
│   ├── request.js             # 请求工具
│   ├── util.js                # 通用工具
│   └── validate.js            # 验证工具
└── vue.config.js              # Vue配置文件

## 核心功能模块
### 1. 首页模块 (pages/home/index.vue)
功能描述 ：

- 多语言切换功能
- 用户欢迎区域（登录/未登录状态显示不同）
- 轮播图展示
- 功能导航菜单（预约、药品、专家列表、服务、新闻、问题咨询）
关键代码 ：
// 语言配置
const languageList = [
  t("locale.kk"),
  t("locale.zh-hans"),
  t("locale.ru"),
  t("locale.en")
]
const languageCodes = ["kk", "zh-Hans", "ru", "en"]

### 2. 预约模块 (pages/appointment/index.vue)
功能描述 ：

- 预约表单提交
- 预约记录查询
- 预约状态管理（待确认、已确认、已完成、已取消、已过期）
- 短信验证码登录/注册
关键流程 ：

1. 填写预约信息（姓名、手机号、性别、年龄等）
2. 选择预约时间
3. 提交预约
4. 未登录用户会引导注册/登录

### 3. 药品模块 (pages/medicine/index.vue)
功能描述 ：

- 药品列表展示
- 药品详情查看
- 多语言药品名称显示
数据处理 ：
// 根据当前语言生成键名后缀
const languageKey =
  currentLocale === "zh-Hans"
    ? "Zh"
    : currentLocale.charAt(0).toUpperCase() + currentLocale.slice(1);
const nameKey = `name${languageKey}`;

// 映射数据并根据状态筛选
medicineData.value = res.data.list.map((item) => ({
  id: item.id,
  name: name[nameKey],
  images: item.imagePath,
  status: item.status,
  quantity: item.quantity,
}));

### 4. 用户中心模块 (pages/user/index.vue)
功能描述 ：

- 用户信息展示
- 个人设置入口
- 健康报告入口
- 退出登录功能
设置列表 ：
const cellList = [{
  title: i18n.global.t('user.profileSettings'),
  icon: "setting-fill",
  isLink: true,
  value: "",
  path: "/pages/setting/index"
},
{
  title: i18n.global.t('user.healthReport'),
  icon: "file-text",
  isLink: true,
  value: "",
  path: "/pages/report/index"
}]
### 5. 设置模块 (pages/setting/index.vue)
功能描述 ：

- 个人资料修改
- 密码修改
- 语言切换
语言切换功能 ：
const toggleLanguage = () => {
  uni.showActionSheet({
    itemList: ['中文', 'English'],
    success: function(res) {
      if (res.tapIndex === 0) {
        locale.value = 'zh-Hans'
      } else {
        locale.value = 'en'
      }
      uni.showToast({
        title: t('user.languageChanged'),
      })
    }
  })
}

### 6. 国际化支持 (locale/)
支持语言 ：

- 简体中文 (zh-Hans.json)
- 英文 (en.json)
- 俄语 (ru.json)
- 哈萨克语 (kk.json)
使用方式 ：
import { useI18n } from 'vue-i18n'
const { t, locale } = useI18n()

// 使用翻译
t('home.booking') // 返回当前语言的"预约"文本

## 工具类
### 1. 请求工具 (utils/request.js)
处理API请求，包括请求拦截、响应拦截、错误处理等。

### 2. 缓存工具 (utils/cache.js)
管理本地缓存数据，提供设置、获取、删除缓存的方法。

### 3. 验证工具 (utils/validate.js)
提供表单验证功能，如手机号、密码格式验证等。

## 第三方组件
项目使用了大量uni-ui和uv-ui组件：

- uni-forms: 表单组件
- uni-popup: 弹窗组件
- uni-icons: 图标组件
- uv-button: 按钮组件
- uv-skeleton: 骨架屏组件
- 等等
## 开发与部署
### 开发环境
项目使用HBuilderX进行开发，基于uni-app框架。

### 构建与发布
通过HBuilderX可以构建为各平台应用：

- H5网页
- 微信小程序
- App（Android/iOS）
## 注意事项
1. 项目使用多语言支持，新增功能需要在各语言文件中添加对应翻译
2. API接口调用统一通过api目录下的文件进行
3. 用户登录状态通过缓存管理，登录成功后会将用户信息存入缓存
## 常见问题
1. 语言切换不生效 ：检查locale目录下是否有对应语言的翻译文件
2. 接口请求失败 ：检查网络连接和接口地址是否正确
3. 页面样式异常 ：可能是uni-app版本兼容性问题，建议更新到最新版本
以上是项目的基本结构和功能说明，如有其他问题，请联系开发人员。