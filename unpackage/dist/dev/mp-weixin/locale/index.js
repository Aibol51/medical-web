"use strict";
const common_vendor = require("../common/vendor.js");
const en = {
  "locale.auto": "System",
  "locale.en": "English",
  "locale.zh-hans": "简体中文",
  "locale.kk": "Қазақ",
  "locale.ru": "Русский",
  "locale.ja": "日语",
  "index.title": "Hello i18n",
  "index.home": "Home",
  "index.component": "Component",
  "index.api": "API",
  "index.schema": "Schema",
  "index.demo": "uni-app globalization",
  "index.demo-description": "Include uni-framework, manifest.json, pages.json, tabbar, Page, Component, API, Schema",
  "index.detail": "Detail",
  "index.language": "Language",
  "index.language-info": "Settings",
  "index.system-language": "System language",
  "index.application-language": "Application language",
  "index.language-change-confirm": "Applying this setting will restart the app",
  "api.message": "Message",
  "schema.name": "Name",
  "schema.add": "Add",
  "schema.add-success": "Add success",
  "home.booking": "Booking",
  "home.medicine": "Medicine",
  "home.video": "Video",
  "home.news": "News",
  "home.question": "Question",
  "home.hello": "Hello",
  "home.loading": "Loading",
  "unauthorized.message": "Unauthorized, please log in again",
  "login.prompt": "Please log in",
  "login.login": "Login",
  "login.register": "Register",
  "login.phone.number": "Phone Number",
  "login.phone.input": "Please enter your phone number",
  "login.password": "Password",
  "login.password.input": "Please enter your password",
  "login.verification.code": "Verification Code",
  "login.verification.input": "Please enter the verification code",
  "login.phone.length.error": "The phone number must be 10 characters long",
  "login.password.length.error": "The password must be between {minLength} and {maxLength} characters",
  "login.verification.error": "Please enter the correct verification code",
  "login.login.success": "Login successful",
  "login.login.error": "Phone number, password, or verification code is incorrect",
  "register.username": "Username",
  "register.username.input": "Please enter your username",
  "register.confirmPassword": "Confirm Password",
  "register.sendCode": "Send Verification Code",
  "register.register": "Register",
  "register.passwordMismatch": "Passwords do not match",
  "register.success": "Registration successful!",
  "register.codeError": "Verification code error",
  "register.codeSent": "Code sent successfully",
  "uni.picker.cancel": "Cancel",
  "uni.picker.done": "Done",
  "uni.showModal.cancel": "Cancel",
  "uni.showModal.confirm": "Confirm",
  "appointment.booking": "Booking Appointment",
  "appointment.noRecord": "No appointment records",
  "appointment.bookNow": "Book Now",
  "appointment.name": "Name",
  "appointment.phone": "Phone Number",
  "appointment.gender": "Gender",
  "appointment.selectGender": "Please select gender",
  "appointment.male": "Male",
  "appointment.female": "Female",
  "appointment.idCard": "ID Card",
  "appointment.age": "Age",
  "appointment.dateTime": "Appointment Time",
  "appointment.selectDateTime": "Please select time",
  "appointment.symptoms": "Symptoms Description",
  "appointment.remarks": "Remarks",
  "appointment.submit": "Submit",
  "appointment.pending": "Pending Confirmation",
  "appointment.confirmed": "Confirmed",
  "appointment.completed": "Completed",
  "appointment.canceled": "Canceled",
  "appointment.expired": "Expired",
  "appointment.fillName": "Please fill in your name",
  "appointment.correctPhone": "Please enter a valid phone number",
  "appointment.selectGenderOption": "Please select Male or Female",
  "appointment.fillAge": "Please fill in your age",
  "appointment.selectDateTimeOption": "Please select an appointment time",
  "appointment.validationPassed": "Validation Passed",
  "appointment.success": "Appointment Successful!",
  "appointment.validationFailed": "Validation Failed",
  "appointment.status": "Status",
  "appointment.year": "Age",
  "appointment.noData": "No data",
  "appointment.cancelAppointment": "Cancel Appointment",
  "appointment.appointmentDetails": "Appointment Details",
  "appointment.appointmentCancelled": "Appointment Cancelled",
  "user.logOut": "Log out",
  "user.logOutSuccess": "Log out successful!",
  "user.editPassword": "Edit Password",
  "user.editPasswordSuccess": "Password successfully changed",
  "user.nickName": "Nickname",
  "user.enterNickName": "Please enter a nickname",
  "user.confirm": "Confirm",
  "user.editSuccess": "Successfully modified",
  "user.profileCenter": "Personal Center",
  "user.profileSettings": "Personal Settings",
  "user.healthReport": "Health Report",
  "user.editInformation": "Edit Information",
  "news.loadmore": "Load more",
  "news.loading": "Loading...",
  "news.nomore": "No more data"
};
const zhHans = {
  "locale.auto": "系统",
  "locale.en": "English",
  "locale.zh-hans": "简体中文",
  "locale.kk": "Қазақ",
  "locale.ru": "Русский",
  "locale.ja": "日语",
  "index.title": "Hello i18n",
  "index.home": "主页",
  "index.component": "组件",
  "index.api": "API",
  "index.schema": "Schema",
  "index.demo": "uni-app 国际化演示",
  "index.demo-description": "包含 uni-framework、manifest.json、pages.json、tabbar、页面、组件、API、Schema",
  "index.detail": "详情",
  "index.language": "语言",
  "index.language-info": "语言信息",
  "index.system-language": "系统语言",
  "index.application-language": "应用语言",
  "index.language-change-confirm": "应用此设置将重启App",
  "api.message": "提示",
  "schema.name": "姓名",
  "schema.add": "新增",
  "schema.add-success": "新增成功",
  "home.booking": "预约",
  "home.medicine": "药品",
  "home.video": "视频",
  "home.news": "新闻",
  "home.question": "问题",
  "home.hello": "您好",
  "home.loading": "加载中",
  "unauthorized.message": "未授权，请重新登录",
  "login.prompt": "请登录",
  "login.login": "登录",
  "login.register": "注册",
  "login.phone.number": "手机号",
  "login.phone.input": "请输入手机号",
  "login.password": "密码",
  "login.password.input": "请输入密码",
  "login.verification.code": "验证码",
  "login.verification.input": "请输入验证码",
  "login.phone.length.error": "手机号长度为 10 个字符",
  "login.password.length.error": "密码长度在 6 到 16 个字符",
  "login.verification.error": "请输入正确验证码",
  "login.login.success": "登录成功",
  "login.login.error": "手机号密码或验证码错误",
  "register.username": "用户名",
  "register.username.input": "请输入用户名",
  "register.confirmPassword": "确认密码",
  "register.sendCode": "发送验证码",
  "register.register": "注册",
  "register.passwordMismatch": "密码不一致",
  "register.success": "注册成功!",
  "register.codeError": "验证码错误",
  "register.codeSent": "发送成功",
  "uni.picker.cancel": "取消",
  "uni.picker.done": "完成",
  "uni.showModal.cancel": "取消",
  "uni.showModal.confirm": "确定",
  "appointment.booking": "预约",
  "appointment.noRecord": "无预约记录",
  "appointment.bookNow": "马上预约",
  "appointment.name": "姓名",
  "appointment.phone": "手机号",
  "appointment.gender": "性别",
  "appointment.selectGender": "请选择性别",
  "appointment.male": "男",
  "appointment.female": "女",
  "appointment.idCard": "身份证",
  "appointment.age": "年龄",
  "appointment.dateTime": "预约时间",
  "appointment.selectDateTime": "请选择时间",
  "appointment.symptoms": "症状描述",
  "appointment.remarks": "备注信息",
  "appointment.submit": "提交",
  "appointment.pending": "待确认",
  "appointment.confirmed": "已确认",
  "appointment.completed": "已完成",
  "appointment.canceled": "已取消",
  "appointment.expired": "已过期",
  "appointment.fillName": "请填写姓名",
  "appointment.correctPhone": "请填写正确手机号码",
  "appointment.selectGenderOption": "请选择男或女",
  "appointment.fillAge": "请填写年龄",
  "appointment.selectDateTimeOption": "请选择预约时间",
  "appointment.validationPassed": "校验通过",
  "appointment.success": "预约成功！",
  "appointment.validationFailed": "校验失败",
  "appointment.status": "状态",
  "appointment.year": "岁",
  "appointment.noData": "暂无",
  "appointment.cancelAppointment": "取消预约",
  "appointment.appointmentDetails": "预约详情",
  "appointment.appointmentCancelled": "预约已取消",
  "user.logOut": "退出登录",
  "user.logOutSuccess": "登出成功!",
  "user.editPassword": "修改密码",
  "user.editPasswordSuccess": "修改成功",
  "user.nickName": "昵称",
  "user.enterNickName": "请输入昵称",
  "user.confirm": "确定",
  "user.editSuccess": "修改成功",
  "user.profileCenter": "个人中心",
  "user.profileSettings": "个人设置",
  "user.healthReport": "健康报告",
  "user.editInformation": "资料修改",
  "news.loadmore": "加载更多",
  "news.loading": "加载中...",
  "news.nomore": "没有更多数据"
};
const ja = {
  "locale.auto": "システム",
  "locale.en": "英語",
  "locale.zh-hans": "简体中文",
  "locale.zh-hant": "繁体中文",
  "locale.ja": "日语",
  "index.title": "Hello i18n",
  "index.home": "ホーム",
  "index.component": "コンポーネント",
  "index.api": "API",
  "index.schema": "Schema",
  "index.demo": "uni-app globalization",
  "index.demo-description": "ユニフレームワーク、manifest.json、pages.json、タブバー、ページ、コンポーネント、APIを含める、Schema",
  "index.detail": "詳細",
  "index.language": "言語",
  "index.language-info": "設定",
  "index.system-language": "システム言語",
  "index.application-language": "アプリケーション言語",
  "index.language-change-confirm": "この設定を適用すると、アプリが再起動します",
  "api.message": "メッセージ",
  "schema.add": "追加",
  "schema.add-success": "成功を追加"
};
const kk = {
  "locale.auto": "系统",
  "locale.en": "English",
  "locale.zh-hans": "简体中文",
  "locale.kk": "Қазақ",
  "locale.ru": "Русский",
  "locale.ja": "日语",
  "index.title": "Hello i18n",
  "index.home": "主页",
  "index.component": "组件",
  "index.api": "API",
  "index.schema": "Schema",
  "index.demo": "uni-app 国际化演示",
  "index.demo-description": "包含 uni-framework、manifest.json、pages.json、tabbar、页面、组件、API、Schema",
  "index.detail": "详情",
  "index.language": "语言",
  "index.language-info": "语言信息",
  "index.system-language": "系统语言",
  "index.application-language": "应用语言",
  "index.language-change-confirm": "Бұл параметрді қолдану қолданбаны қайта іске қосады",
  "api.message": "提示",
  "schema.name": "姓名",
  "schema.add": "新增",
  "schema.add-success": "新增成功",
  "home.booking": "Тіркелу",
  "home.medicine": "Дәрі-дәрмек",
  "home.video": "Бейне",
  "home.news": "Жаңалықтар",
  "home.question": "Сұрақ",
  "home.hello": "Сәлем",
  "home.loading": "Жүктелуде",
  "unauthorized.message": "Рұқсат жоқ, қайта кіріңіз",
  "login.prompt": "Кіруді сұраймыз",
  "login.login": "Кіру",
  "login.register": "Тіркелу",
  "login.phone.number": "Телефон нөмірі",
  "login.phone.input": "Телефон нөмірін енгізіңіз",
  "login.password": "Құпия сөз",
  "login.password.input": "Құпия сөзді енгізіңіз",
  "login.verification.code": "Тексеру коды",
  "login.verification.input": "Тексеру кодын енгізіңіз",
  "login.phone.length.error": "Телефон нөмірі 10 таңбадан тұруы керек",
  "login.password.length.error": "Құпия сөз ұзындығы 6 пен 16 таңба арасында болуы керек",
  "login.verification.error": "Дұрыс тексеру кодын енгізіңіз",
  "login.login.success": "Кіру сәтті аяқталды",
  "login.login.error": "Телефон нөмірі, құпия сөз немесе тексеру коды қате",
  "register.username": "Пайдаланушы аты",
  "register.username.input": "Пайдаланушы атын енгізіңіз",
  "register.confirmPassword": "Құпиясөзді растаңыз",
  "register.sendCode": "Растау кодын жіберу",
  "register.register": "Тіркелу",
  "register.passwordMismatch": "Құпиясөздер сәйкес келмейді",
  "register.success": "Тіркелу сәтті өтті!",
  "register.codeError": "Растау коды қате",
  "register.codeSent": "Код сәтті жіберілді",
  "uni.picker.cancel": "Бас тарту",
  "uni.picker.done": "Дайын",
  "uni.showModal.cancel": "Бас тарту",
  "uni.showModal.confirm": "Растау",
  "appointment.booking": "Қабылдауға жазылу",
  "appointment.noRecord": "Қабылдау жазбалары жоқ",
  "appointment.bookNow": "Қазір жазылу",
  "appointment.name": "Аты",
  "appointment.phone": "Телефон нөмірі",
  "appointment.gender": "Жыныс",
  "appointment.selectGender": "Жынысты таңдаңыз",
  "appointment.male": "Ер",
  "appointment.female": "Әйел",
  "appointment.idCard": "Жеке куәлік",
  "appointment.age": "Жас",
  "appointment.dateTime": "Қабылдау уақыты",
  "appointment.selectDateTime": "Уақытты таңдаңыз",
  "appointment.symptoms": "Симптомдарды сипаттау",
  "appointment.remarks": "Ескертулер",
  "appointment.submit": "Жіберу",
  "appointment.pending": "Расталуды күтуде",
  "appointment.confirmed": "Расталды",
  "appointment.completed": "Аяқталды",
  "appointment.canceled": "Болдырылмады",
  "appointment.expired": "Мерзімі өтті",
  "appointment.fillName": "Атыңызды енгізіңіз",
  "appointment.correctPhone": "Дұрыс телефон нөмірін енгізіңіз",
  "appointment.selectGenderOption": "Ер немесе Әйелді таңдаңыз",
  "appointment.fillAge": "Жасыңызды енгізіңіз",
  "appointment.selectDateTimeOption": "Қабылдау уақытын таңдаңыз",
  "appointment.validationPassed": "Тексеру сәтті өтті",
  "appointment.success": "Сәтті жазылды!",
  "appointment.validationFailed": "Тексеру сәтсіз аяқталды",
  "appointment.status": "Статус",
  "appointment.year": "Жас",
  "appointment.noData": "Деректер жоқ",
  "appointment.cancelAppointment": "Жазылуды болдырмау",
  "appointment.appointmentDetails": "Жазылу туралы мәліметтер",
  "appointment.appointmentCancelled": "Жазылу жойылды",
  "user.logOut": "Шығу",
  "user.logOutSuccess": "Шығу сәтті аяқталды!",
  "user.editPassword": "Құпия сөзді өзгерту",
  "user.editPasswordSuccess": "Құпия сөз сәтті өзгертілді",
  "user.nickName": "Аты",
  "user.enterNickName": "Атты енгізіңіз",
  "user.confirm": "Растау",
  "user.editSuccess": "Сәтті өзгертілді",
  "user.profileCenter": "Жеке кабинет",
  "user.profileSettings": "Жеке баптаулар",
  "user.healthReport": "Денсаулық туралы есеп",
  "user.editInformation": "Деректерді өңдеу",
  "news.loadmore": "Көбірек жүктеу",
  "news.loading": "Жүктелуде...",
  "news.nomore": "Деректер жоқ"
};
const ru = {
  "locale.auto": "系统",
  "locale.en": "English",
  "locale.zh-hans": "简体中文",
  "locale.kk": "Қазақ",
  "locale.ru": "Русский",
  "locale.ja": "日语",
  "index.title": "Hello i18n",
  "index.home": "主页",
  "index.component": "组件",
  "index.api": "API",
  "index.schema": "Schema",
  "index.demo": "uni-app 国际化演示",
  "index.demo-description": "包含 uni-framework、manifest.json、pages.json、tabbar、页面、组件、API、Schema",
  "index.detail": "详情",
  "index.language": "语言",
  "index.language-info": "语言信息",
  "index.system-language": "系统语言",
  "index.application-language": "应用语言",
  "index.language-change-confirm": "Применение этого настройки перезапустит приложение",
  "api.message": "提示",
  "schema.name": "姓名",
  "schema.add": "新增",
  "schema.add-success": "新增成功",
  "home.booking": "Запись",
  "home.medicine": "Лекарство",
  "home.video": "Видео",
  "home.news": "Новости",
  "home.question": "Вопрос",
  "home.hello": "Привет",
  "home.loading": "Загрузка",
  "unauthorized.message": "Нет авторизации, пожалуйста, войдите снова",
  "login.prompt": "Пожалуйста, войдите",
  "login.login": "Войти",
  "login.register": "Регистрация",
  "login.phone.number": "Номер телефона",
  "login.phone.input": "Пожалуйста, введите номер телефона",
  "login.password": "Пароль",
  "login.password.input": "Пожалуйста, введите пароль",
  "login.verification.code": "Код подтверждения",
  "login.verification.input": "Введите код подтверждения",
  "login.phone.length.error": "Номер телефона должен быть длиной 10 символов",
  "login.password.length.error": "Пароль должен быть от 6 до 16 символов",
  "login.verification.error": "Пожалуйста, введите правильный код подтверждения",
  "login.login.success": "Вход выполнен успешно",
  "login.login.error": "Номер телефона, пароль или код подтверждения введены неверно",
  "register.username": "Имя пользователя",
  "register.username.input": "Введите имя пользователя",
  "register.confirmPassword": "Подтвердите пароль",
  "register.sendCode": "Отправить код подтверждения",
  "register.register": "Зарегистрироваться",
  "register.passwordMismatch": "Пароли не совпадают",
  "register.success": "Регистрация прошла успешно!",
  "register.codeError": "Ошибка кода подтверждения",
  "register.codeSent": "Код успешно отправлен",
  "uni.picker.cancel": "Отмена",
  "uni.picker.done": "Готово",
  "uni.showModal.cancel": "Отмена",
  "uni.showModal.confirm": "Подтвердить",
  "appointment.booking": "Запись на прием",
  "appointment.noRecord": "Нет записей на прием",
  "appointment.bookNow": "Записаться сейчас",
  "appointment.name": "Имя",
  "appointment.phone": "Номер телефона",
  "appointment.gender": "Пол",
  "appointment.selectGender": "Пожалуйста, выберите пол",
  "appointment.male": "Мужчина",
  "appointment.female": "Женщина",
  "appointment.idCard": "Идентификационная карта",
  "appointment.age": "Возраст",
  "appointment.dateTime": "Время приема",
  "appointment.selectDateTime": "Пожалуйста, выберите время",
  "appointment.symptoms": "Описание симптомов",
  "appointment.remarks": "Примечания",
  "appointment.submit": "Отправить",
  "appointment.pending": "Ожидает подтверждения",
  "appointment.confirmed": "Подтверждено",
  "appointment.completed": "Завершено",
  "appointment.canceled": "Отменено",
  "appointment.expired": "Истекло",
  "appointment.fillName": "Пожалуйста, введите имя",
  "appointment.correctPhone": "Пожалуйста, введите правильный номер телефона",
  "appointment.selectGenderOption": "Пожалуйста, выберите Мужчина или Женщина",
  "appointment.fillAge": "Пожалуйста, введите возраст",
  "appointment.selectDateTimeOption": "Пожалуйста, выберите время приема",
  "appointment.validationPassed": "Проверка пройдена",
  "appointment.success": "Запись прошла успешно!",
  "appointment.validationFailed": "Проверка не пройдена",
  "appointment.status": "Статус",
  "appointment.year": "лет",
  "appointment.noData": "Нет данных",
  "appointment.cancelAppointment": "Отменить запись",
  "appointment.appointmentDetails": "Детали записи",
  "appointment.appointmentCancelled": "Запись отменена",
  "user.logOut": "Выйти",
  "user.logOutSuccess": "Выход выполнен успешно!",
  "user.editPassword": "Изменить пароль",
  "user.editPasswordSuccess": "Пароль успешно изменён",
  "user.nickName": "Имя",
  "user.enterNickName": "Пожалуйста, введите имя",
  "user.confirm": "Подтвердить",
  "user.editSuccess": "Изменение успешно",
  "user.profileCenter": "Личный кабинет",
  "user.profileSettings": "Настройки профиля",
  "user.healthReport": "Отчет о здоровье",
  "user.editInformation": "Изменение данных",
  "news.loadmore": "Загрузить ещё",
  "news.loading": "Загрузка...",
  "news.nomore": "Больше данных нет"
};
const lang = common_vendor.index.getLocale();
const i18n = common_vendor.createI18n({
  // legacy: false, // 使用 Composition API 模式
  locale: lang,
  // 当前语言
  messages: {
    en,
    "zh-Hans": zhHans,
    ja,
    kk,
    ru
  }
});
exports.i18n = i18n;
