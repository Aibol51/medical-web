"use strict";
const common_vendor = require("../../common/vendor.js");
const config_cache = require("../../config/cache.js");
const utils_cache = require("../../utils/cache.js");
const api_home = require("../../api/home.js");
if (!Array) {
  const _easycom_uv_skeleton2 = common_vendor.resolveComponent("uv-skeleton");
  const _easycom_uni_card2 = common_vendor.resolveComponent("uni-card");
  (_easycom_uv_skeleton2 + _easycom_uni_card2)();
}
const _easycom_uv_skeleton = () => "../../uni_modules/uv-skeleton/components/uv-skeleton/uv-skeleton.js";
const _easycom_uni_card = () => "../../uni_modules/uni-card/components/uni-card/uni-card.js";
if (!Math) {
  (statusBar + _easycom_uv_skeleton + _easycom_uni_card + navBar)();
}
const navBar = () => "../../components/navBar.js";
const statusBar = () => "../../components/statusBar.js";
const _sfc_main = {
  __name: "index",
  setup(__props) {
    const {
      t,
      locale
    } = common_vendor.useI18n();
    const isWeChatMiniProgram = common_vendor.ref(false);
    common_vendor.onMounted(() => {
      isWeChatMiniProgram.value = true;
    });
    const userName = common_vendor.ref("");
    const languageList = [
      t("locale.kk"),
      t("locale.zh-hans"),
      t("locale.ru"),
      t("locale.en")
    ];
    const languageCodes = ["kk", "zh-Hans", "ru", "en"];
    const currentLanguageIndex = common_vendor.ref(0);
    const selectedLocale = common_vendor.ref("");
    const swiperData = common_vendor.ref([]);
    const swiperLoading = common_vendor.ref(true);
    const newsData = common_vendor.ref([]);
    const newsLoading = common_vendor.ref(true);
    const menuList = common_vendor.computed(() => [
      {
        name: t("home.booking"),
        path: "/pages/appointment/index",
        img: "/static/booking.png"
      },
      {
        name: t("home.medicine"),
        path: "/pages/medicine/index",
        img: "/static/pharmacy.png"
      },
      // {
      // 	name: t("home.video"),
      // 	path: "/static/video.png",
      // 	img: "/static/video.png"
      // },
      {
        name: t("home.news"),
        path: "/pages/news/index",
        img: "/static/news.png"
      },
      {
        name: t("home.question"),
        path: "/static/question.png",
        img: "/static/question.png"
      }
    ]);
    const menuClick = (path) => {
      common_vendor.index.navigateTo({
        url: path,
        animationType: "none"
      });
    };
    const bindPickerChange = (e) => {
      const selectedIndex = e.detail.value;
      currentLanguageIndex.value = selectedIndex;
      selectedLocale.value = languageCodes[selectedIndex];
      common_vendor.index.showModal({
        content: t("index.language-change-confirm"),
        success: (res) => {
          if (res.confirm) {
            common_vendor.index.setLocale(selectedLocale.value);
            locale.value = selectedLocale.value;
            getSwiperList();
            getNewsList();
          }
        }
      });
    };
    const getSwiperList = () => {
      const data = {
        page: 1,
        pageSize: 50
      };
      api_home.swiperList(data).then((res) => {
        if (res.code === 0) {
          const currentLocale = common_vendor.index.getLocale();
          const languageKey = currentLocale === "zh-Hans" ? "Zh" : currentLocale.charAt(0).toUpperCase() + currentLocale.slice(1);
          const bannerKey = `banner${languageKey}`;
          swiperData.value = res.data.data.map((item) => ({
            id: item.id,
            title: item[`title${languageKey}`],
            banner: item[bannerKey],
            jumpUrl: item.jumpUrl
          })).filter((item) => item.banner);
          swiperLoading.value = false;
        }
      }).catch((err) => {
        console.error(err);
      });
    };
    const getNewsList = () => {
      const data = {
        page: 1,
        pageSize: 50
      };
      api_home.newsList(data).then((res) => {
        if (res.code === 0) {
          console.log(res.data);
          const currentLocale = common_vendor.index.getLocale();
          const languageKey = currentLocale === "zh-Hans" ? "Zh" : currentLocale.charAt(0).toUpperCase() + currentLocale.slice(1);
          newsData.value = res.data.data.map((item) => ({
            id: item.id,
            title: item[`title${languageKey}`],
            converUrl: item.coverUrl
          }));
          console.log(newsData.value);
          newsLoading.value = false;
        }
      }).catch((err) => {
        console.error(err);
      });
    };
    const gotoDetail = (id) => {
      console.log(id);
      common_vendor.index.navigateTo({
        url: "/pages/news/components/details?id=" + id,
        animationType: "none"
      });
    };
    common_vendor.onLoad(() => {
      getSwiperList();
      getNewsList();
    });
    common_vendor.onShow(() => {
      if (utils_cache.Cache.has(config_cache.USER_INFO, false)) {
        userName.value = utils_cache.Cache.get(config_cache.USER_INFO).nickname;
        console.log(userName.value);
        console.log(utils_cache.Cache.has(config_cache.USER_INFO, false));
      }
    });
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.p({
          useThemeColor: true
        }),
        b: common_vendor.o(bindPickerChange),
        c: currentLanguageIndex.value,
        d: languageList,
        e: isWeChatMiniProgram.value ? "flex-start" : "",
        f: common_vendor.t(common_vendor.unref(t)("home.hello")),
        g: !common_vendor.unref(utils_cache.Cache).has(common_vendor.unref(config_cache.USER_INFO), false)
      }, !common_vendor.unref(utils_cache.Cache).has(common_vendor.unref(config_cache.USER_INFO), false) ? {
        h: common_vendor.t(common_vendor.unref(t)("login.login")),
        i: common_vendor.t(common_vendor.unref(t)("login.register")),
        j: common_vendor.o(($event) => menuClick("/pages/login/index"))
      } : {
        k: common_vendor.t(userName.value)
      }, {
        l: swiperLoading.value
      }, swiperLoading.value ? {
        m: common_vendor.p({
          loading: true,
          animate: true,
          titleHeight: "300rpx",
          titleWidth: "100%"
        })
      } : {
        n: common_vendor.f(swiperData.value, (item, index, i0) => {
          return {
            a: item.banner,
            b: index
          };
        })
      }, {
        o: common_vendor.f(menuList.value, (item, index, i0) => {
          return {
            a: item.img,
            b: common_vendor.t(item.name),
            c: index,
            d: common_vendor.o(($event) => menuClick(item.path), index)
          };
        }),
        p: common_vendor.t(common_vendor.unref(t)("home.news")),
        q: newsLoading.value
      }, newsLoading.value ? {
        r: common_vendor.f(2, (i, k0, i0) => {
          return {
            a: "ec8d007c-2-" + i0,
            b: i
          };
        }),
        s: common_vendor.p({
          loading: true,
          animate: true,
          titleHeight: "350rpx",
          titleWidth: "100%",
          rows: "0"
        })
      } : {
        t: common_vendor.f(newsData.value, (item, index, i0) => {
          return {
            a: item.converUrl,
            b: common_vendor.t(item.title),
            c: common_vendor.o(($event) => gotoDetail(item.id), index),
            d: index,
            e: "ec8d007c-3-" + i0
          };
        }),
        v: common_vendor.p({
          padding: "0",
          spacing: "0"
        })
      }, {
        w: common_vendor.p({
          activeIndex: 0
        })
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "C:/Users/Aibol/Desktop/work/host/pages/home/index.vue"]]);
wx.createPage(MiniProgramPage);
