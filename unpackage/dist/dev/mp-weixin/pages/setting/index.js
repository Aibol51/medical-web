"use strict";
const common_vendor = require("../../common/vendor.js");
const locale_index = require("../../locale/index.js");
if (!Array) {
  const _easycom_uv_cell2 = common_vendor.resolveComponent("uv-cell");
  const _easycom_uv_cell_group2 = common_vendor.resolveComponent("uv-cell-group");
  (_easycom_uv_cell2 + _easycom_uv_cell_group2)();
}
const _easycom_uv_cell = () => "../../uni_modules/uv-cell/components/uv-cell/uv-cell.js";
const _easycom_uv_cell_group = () => "../../uni_modules/uv-cell/components/uv-cell-group/uv-cell-group.js";
if (!Math) {
  (_easycom_uv_cell + _easycom_uv_cell_group)();
}
const _sfc_main = {
  __name: "index",
  setup(__props) {
    const cellList = [
      {
        title: locale_index.i18n.global.t("user.editInformation"),
        icon: "edit-pen",
        isLink: true,
        value: "",
        path: "/pages/setting/components/editProfile"
      },
      {
        title: locale_index.i18n.global.t("user.editPassword"),
        icon: "lock-open",
        isLink: true,
        value: "",
        path: "/pages/setting/components/editPassword"
      }
    ];
    const goToDetail = (index) => {
      common_vendor.index.navigateTo({
        url: cellList[index].path,
        animationType: "none"
      });
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(cellList, (item, index, i0) => {
          return {
            a: common_vendor.o(($event) => goToDetail(index)),
            b: "5aec75e3-1-" + i0 + ",5aec75e3-0",
            c: common_vendor.p({
              icon: item.icon,
              title: item.title,
              isLink: item.isLink,
              value: item.value
            })
          };
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "C:/Users/Aibol/Desktop/work/host/pages/setting/index.vue"]]);
wx.createPage(MiniProgramPage);
