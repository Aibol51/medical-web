import { createI18n } from 'vue-i18n';
import en from './en.json';
import zhHans from './zh-Hans.json';
import ja from './ja.json';
import kk from './kk.json';
import ru from './ru.json';

const lang = uni.getLocale(); // 获取缓存中的语言
const i18n = createI18n({
  // legacy: false, // 使用 Composition API 模式
  locale: lang, // 当前语言
  messages: {
    en,
    'zh-Hans': zhHans,
    ja,
    kk,
    ru
  }
});

export default i18n;
