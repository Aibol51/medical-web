"use strict";
const common_vendor = require("../../common/vendor.js");
const api_medicine = require("../../api/medicine.js");
const _sfc_main = {
  __name: "index",
  setup(__props) {
    const medicineData = common_vendor.ref([]);
    const getMedicineList = () => {
      const data = {
        page: 1,
        pageSize: 50
      };
      api_medicine.medicineList(data).then((res) => {
        if (res.code === 0) {
          const currentLocale = common_vendor.index.getLocale();
          const languageKey = currentLocale === "zh-Hans" ? "Zh" : currentLocale.charAt(0).toUpperCase() + currentLocale.slice(1);
          const nameKey = `name${languageKey}`;
          const descriptionKey = `description${languageKey}`;
          console.log("原始数据:", res.data.data);
          medicineData.value = res.data.data.map((item) => ({
            id: item.id,
            name: item[nameKey],
            description: item[descriptionKey],
            images: item.images,
            status: item.status,
            quantity: item.quantity
          })).filter((item) => item.status === 1);
          console.log("处理后的数据:", medicineData.value);
        } else {
          console.error("接口返回错误:", res.msg);
        }
      }).catch((err) => {
        console.error("请求失败:", err);
      });
    };
    const gotoDetail = (id) => {
      console.log(id);
      common_vendor.index.navigateTo({
        url: "/pages/medicine/components/details?id=" + id,
        animationType: "none"
      });
    };
    common_vendor.onLoad(() => {
      getMedicineList();
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(medicineData.value, (product, index, i0) => {
          return {
            a: product.images,
            b: common_vendor.t(product.name),
            c: common_vendor.t(product.quantity),
            d: index,
            e: common_vendor.o(($event) => gotoDetail(product.id), index)
          };
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "C:/Users/Aibol/Desktop/work/host/pages/medicine/index.vue"]]);
wx.createPage(MiniProgramPage);
