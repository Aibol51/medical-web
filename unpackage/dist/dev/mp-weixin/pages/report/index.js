"use strict";
const common_vendor = require("../../common/vendor.js");
const api_report = require("../../api/report.js");
if (!Array) {
  const _easycom_uv_empty2 = common_vendor.resolveComponent("uv-empty");
  _easycom_uv_empty2();
}
const _easycom_uv_empty = () => "../../uni_modules/uv-empty/components/uv-empty/uv-empty.js";
if (!Math) {
  _easycom_uv_empty();
}
const _sfc_main = {
  __name: "index",
  setup(__props) {
    common_vendor.useI18n();
    const reportData = common_vendor.ref([]);
    const getReportList = () => {
      const data = {
        page: 1,
        pageSize: 50
      };
      api_report.reportList(data).then((res) => {
        if (res.code === 0) {
          reportData.value = res.data.data;
          console.log(res.data);
        }
      }).catch((err) => {
        console.error(err);
      });
    };
    const formatDate = (timestamp) => {
      const date = new Date(timestamp);
      return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
    };
    common_vendor.onShow(() => {
      getReportList();
    });
    return (_ctx, _cache) => {
      var _a, _b;
      return common_vendor.e({
        a: !((_a = reportData.value) == null ? void 0 : _a.length)
      }, !((_b = reportData.value) == null ? void 0 : _b.length) ? {
        b: common_vendor.p({
          mode: "history",
          textSize: "18",
          text: "无检查记录",
          width: "200",
          height: "200"
        })
      } : {
        c: common_vendor.f(reportData.value, (item, k0, i0) => {
          return {
            a: common_vendor.t(item.patientName),
            b: common_vendor.t(item.gender === 1 ? "男" : "女"),
            c: common_vendor.t(item.age),
            d: common_vendor.t(formatDate(item.createdAt)),
            e: common_vendor.t(item.department),
            f: common_vendor.t(item.diagnosis),
            g: common_vendor.t(item.treatmentPlan),
            h: common_vendor.t(item.doctorAdvice),
            i: common_vendor.t(item.phoneNumber),
            j: common_vendor.t(item.visitTime),
            k: item.id
          };
        })
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "C:/Users/Aibol/Desktop/work/host/pages/report/index.vue"]]);
wx.createPage(MiniProgramPage);
