"use strict";
const common_vendor = require("../../../common/vendor.js");
const api_home = require("../../../api/home.js");
if (!Array) {
  const _easycom_uv_loading_icon2 = common_vendor.resolveComponent("uv-loading-icon");
  _easycom_uv_loading_icon2();
}
const _easycom_uv_loading_icon = () => "../../../uni_modules/uv-loading-icon/components/uv-loading-icon/uv-loading-icon.js";
if (!Math) {
  _easycom_uv_loading_icon();
}
const _sfc_main = {
  __name: "details",
  setup(__props) {
    const newsData = common_vendor.ref({
      title: "",
      content: ""
    });
    const loadingState = common_vendor.ref(true);
    const getNewsData = async (id) => {
      try {
        const data = {
          id: Number(id)
        };
        const res = await api_home.getNews(data);
        if (res.code === 0 && res.data) {
          const currentLocale = common_vendor.index.getLocale();
          const languageKey = currentLocale === "zh-Hans" ? "Zh" : currentLocale.charAt(0).toUpperCase() + currentLocale.slice(1);
          const titleKey = `title${languageKey}`;
          const contentKey = `content${languageKey}`;
          newsData.value = {
            title: res.data[titleKey] || "",
            content: res.data[contentKey] || "",
            createdAt: formatToDate(res.data.createdAt),
            time: formatToTime(res.data.createdAt)
          };
          Promise.resolve().then(() => {
            loadingState.value = false;
          });
        } else {
          console.error("Failed to fetch news data");
          common_vendor.index.showToast({
            title: "Failed to load news",
            icon: "none"
          });
          loadingState.value = false;
        }
      } catch (err) {
        console.error("Error fetching news:", err);
        common_vendor.index.showToast({
          title: "Network error",
          icon: "none"
        });
        loadingState.value = false;
      }
    };
    function formatToDate(timestamp) {
      const date = new Date(timestamp);
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");
      return `${year}-${month}-${day}`;
    }
    function formatToTime(timestamp) {
      const date = new Date(timestamp);
      const hours = String(date.getHours()).padStart(2, "0");
      const minutes = String(date.getMinutes()).padStart(2, "0");
      return `${hours}:${minutes}`;
    }
    common_vendor.onLoad((option) => {
      if (option && option.id) {
        getNewsData(option.id);
      } else {
        loadingState.value = false;
        common_vendor.index.showToast({
          title: "Missing news ID",
          icon: "none"
        });
      }
    });
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: loadingState.value
      }, loadingState.value ? {
        b: common_vendor.p({
          show: true,
          mode: "spinner",
          text: _ctx.$t("home.loading"),
          ["text-color"]: "#999999",
          ["text-size"]: "14"
        })
      } : newsData.value.content ? {
        d: common_vendor.t(newsData.value.title),
        e: common_vendor.t(newsData.value.createdAt),
        f: common_vendor.t(newsData.value.time),
        g: newsData.value.content
      } : {}, {
        c: newsData.value.content
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "C:/Users/Aibol/Desktop/work/host/pages/news/components/details.vue"]]);
wx.createPage(MiniProgramPage);
