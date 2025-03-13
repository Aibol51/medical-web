"use strict";
const common_vendor = require("../../common/vendor.js");
const api_home = require("../../api/home.js");
require("../../locale/index.js");
if (!Array) {
  const _easycom_uni_card2 = common_vendor.resolveComponent("uni-card");
  const _easycom_uv_load_more2 = common_vendor.resolveComponent("uv-load-more");
  (_easycom_uni_card2 + _easycom_uv_load_more2)();
}
const _easycom_uni_card = () => "../../uni_modules/uni-card/components/uni-card/uni-card.js";
const _easycom_uv_load_more = () => "../../uni_modules/uv-load-more/components/uv-load-more/uv-load-more.js";
if (!Math) {
  (_easycom_uni_card + _easycom_uv_load_more)();
}
const _sfc_main = {
  __name: "index",
  setup(__props) {
    const {
      t,
      locale
    } = common_vendor.useI18n();
    const newsData = common_vendor.ref([]);
    const status = common_vendor.ref("loadmore");
    const page = common_vendor.ref(1);
    const pageSize = common_vendor.ref(10);
    const hasMore = common_vendor.ref(true);
    const getNewsList = () => {
      if (!hasMore.value)
        return;
      status.value = "loading";
      const data = {
        page: page.value,
        pageSize: pageSize.value
      };
      api_home.newsList(data).then((res) => {
        var _a;
        if (res.code === 0) {
          const serverData = ((_a = res.data) == null ? void 0 : _a.data) || [];
          if (serverData.length === 0 && page.value === 1) {
            hasMore.value = false;
            status.value = "nomore";
            return;
          }
          const currentLocale = common_vendor.index.getLocale();
          const languageKey = currentLocale === "zh-Hans" ? "Zh" : currentLocale.charAt(0).toUpperCase() + currentLocale.slice(1);
          const newData = serverData.map((item) => ({
            id: item.id,
            title: item[`title${languageKey}`],
            converUrl: item.coverUrl
          }));
          if (newData.length < pageSize.value) {
            hasMore.value = false;
            status.value = "nomore";
          } else {
            status.value = "loadmore";
          }
          newsData.value = [...newsData.value, ...newData];
          page.value += 1;
        } else {
          hasMore.value = false;
          status.value = "error";
        }
      }).catch((err) => {
        console.error(err);
        status.value = "error";
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
      getNewsList();
    });
    common_vendor.onReachBottom(() => {
      getNewsList();
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(newsData.value, (item, index, i0) => {
          return {
            a: item.converUrl,
            b: common_vendor.t(item.title),
            c: common_vendor.o(($event) => gotoDetail(item.id), index),
            d: index,
            e: "157f9694-0-" + i0
          };
        }),
        b: common_vendor.p({
          padding: "0",
          spacing: "0"
        }),
        c: common_vendor.p({
          status: status.value,
          ["loadmore-text"]: common_vendor.unref(t)("news.loadmore"),
          ["loading-text"]: common_vendor.unref(t)("news.loading"),
          ["nomore-text"]: common_vendor.unref(t)("news.nomore")
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "C:/Users/Aibol/Desktop/work/host/pages/news/index.vue"]]);
wx.createPage(MiniProgramPage);
