"use strict";
const common_vendor = require("../../../common/vendor.js");
const api_medicine = require("../../../api/medicine.js");
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
    const medicineData = common_vendor.ref({
      name: "",
      description: ""
    });
    const loadingState = common_vendor.ref(true);
    const getMedicineData = async (id) => {
      try {
        const data = {
          id: Number(id)
        };
        const res = await api_medicine.getMedicine(data);
        if (res.code === 0 && res.data) {
          const currentLocale = common_vendor.index.getLocale();
          const languageKey = currentLocale === "zh-Hans" ? "Zh" : currentLocale.charAt(0).toUpperCase() + currentLocale.slice(1);
          const nameKey = `name${languageKey}`;
          const descriptionKey = `description${languageKey}`;
          medicineData.value = {
            name: res.data[nameKey] || "",
            description: res.data[descriptionKey] || "",
            quantity: res.data.quantity,
            images: res.data.images
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
    common_vendor.onLoad((option) => {
      if (option && option.id) {
        getMedicineData(option.id);
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
          text: "加载中...",
          ["text-color"]: "#999999",
          ["text-size"]: "14"
        })
      } : medicineData.value.images ? {
        d: medicineData.value.images,
        e: common_vendor.t(medicineData.value.name),
        f: common_vendor.t(medicineData.value.quantity),
        g: common_vendor.t(medicineData.value.description)
      } : {}, {
        c: medicineData.value.images
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "C:/Users/Aibol/Desktop/work/host/pages/medicine/components/details.vue"]]);
wx.createPage(MiniProgramPage);
