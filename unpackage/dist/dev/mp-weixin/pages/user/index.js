"use strict";
const common_vendor = require("../../common/vendor.js");
const api_user = require("../../api/user.js");
const utils_cache = require("../../utils/cache.js");
const config_cache = require("../../config/cache.js");
const locale_index = require("../../locale/index.js");
if (!Array) {
  const _easycom_uv_navbar2 = common_vendor.resolveComponent("uv-navbar");
  const _easycom_uv_avatar2 = common_vendor.resolveComponent("uv-avatar");
  const _easycom_uv_cell2 = common_vendor.resolveComponent("uv-cell");
  const _easycom_uv_cell_group2 = common_vendor.resolveComponent("uv-cell-group");
  const _easycom_uv_button2 = common_vendor.resolveComponent("uv-button");
  (_easycom_uv_navbar2 + _easycom_uv_avatar2 + _easycom_uv_cell2 + _easycom_uv_cell_group2 + _easycom_uv_button2)();
}
const _easycom_uv_navbar = () => "../../uni_modules/uv-navbar/components/uv-navbar/uv-navbar.js";
const _easycom_uv_avatar = () => "../../uni_modules/uv-avatar/components/uv-avatar/uv-avatar.js";
const _easycom_uv_cell = () => "../../uni_modules/uv-cell/components/uv-cell/uv-cell.js";
const _easycom_uv_cell_group = () => "../../uni_modules/uv-cell/components/uv-cell-group/uv-cell-group.js";
const _easycom_uv_button = () => "../../uni_modules/uv-button/components/uv-button/uv-button.js";
if (!Math) {
  (_easycom_uv_navbar + _easycom_uv_avatar + _easycom_uv_cell + _easycom_uv_cell_group + _easycom_uv_button + navBar)();
}
const navBar = () => "../../components/navBar.js";
const _sfc_main = {
  __name: "index",
  setup(__props) {
    const {
      t,
      locale
    } = common_vendor.useI18n();
    const userName = common_vendor.ref("");
    const cellList = [
      {
        title: locale_index.i18n.global.t("user.profileSettings"),
        icon: "setting-fill",
        isLink: true,
        value: "",
        path: "/pages/setting/index"
      },
      {
        title: locale_index.i18n.global.t("user.healthReport"),
        icon: "empty-search",
        isLink: true,
        value: "",
        path: "/pages/report/index"
      }
    ];
    const goToDetail = (index) => {
      common_vendor.index.navigateTo({
        url: cellList[index].path,
        animationType: "none"
      });
    };
    const logOut = () => {
      api_user.getLogout().then((res) => {
        if (res.code === 0) {
          console.log(res);
          utils_cache.Cache.clear(config_cache.USER_INFO);
          utils_cache.Cache.clear(config_cache.LOGIN_STATUS);
          common_vendor.index.showToast({
            title: t("user.logOutSuccess"),
            icon: "none",
            duration: 2e3
          });
          setTimeout(function() {
            common_vendor.index.navigateTo({
              url: "/pages/home/index",
              animationType: "none"
            });
          }, 1e3);
        }
      }).catch((err) => {
        console.error(err);
      });
    };
    common_vendor.onShow(() => {
      if (utils_cache.Cache.has(config_cache.USER_INFO, false)) {
        userName.value = utils_cache.Cache.get(config_cache.USER_INFO).nickname;
        console.log(userName.value);
        console.log(utils_cache.Cache.has(config_cache.USER_INFO, false));
      }
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.p({
          title: common_vendor.unref(t)("user.profileCenter"),
          placeholder: true,
          leftIcon: ""
        }),
        b: common_vendor.p({
          size: 60
        }),
        c: common_vendor.t(userName.value),
        d: common_vendor.f(cellList, (item, index, i0) => {
          return {
            a: common_vendor.o(($event) => goToDetail(index)),
            b: "0e18bfae-3-" + i0 + ",0e18bfae-2",
            c: common_vendor.p({
              icon: item.icon,
              title: item.title,
              isLink: item.isLink,
              value: item.value
            })
          };
        }),
        e: common_vendor.o(($event) => logOut()),
        f: common_vendor.p({
          type: "error",
          text: common_vendor.unref(t)("user.logOut")
        }),
        g: common_vendor.p({
          activeIndex: 2
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "C:/Users/Aibol/Desktop/work/host/pages/user/index.vue"]]);
wx.createPage(MiniProgramPage);
