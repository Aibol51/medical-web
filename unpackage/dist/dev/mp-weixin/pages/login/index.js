"use strict";
const common_vendor = require("../../common/vendor.js");
const loginPage = () => "./components/login.js";
const registerPage = () => "./components/register.js";
const _sfc_main = {
  components: {
    loginPage,
    registerPage
  },
  data() {
    return {
      items: [this.$t("login.login"), this.$t("login.register")],
      current: 0
    };
  },
  methods: {
    onClickItem(e) {
      if (this.current != e.currentIndex) {
        this.current = e.currentIndex;
      }
    },
    switchToLogin() {
      this.current = 0;
    }
  }
};
if (!Array) {
  const _easycom_uni_segmented_control2 = common_vendor.resolveComponent("uni-segmented-control");
  const _component_loginPage = common_vendor.resolveComponent("loginPage");
  const _component_registerPage = common_vendor.resolveComponent("registerPage");
  const _easycom_ws_wx_privacy2 = common_vendor.resolveComponent("ws-wx-privacy");
  (_easycom_uni_segmented_control2 + _component_loginPage + _component_registerPage + _easycom_ws_wx_privacy2)();
}
const _easycom_uni_segmented_control = () => "../../uni_modules/uni-segmented-control/components/uni-segmented-control/uni-segmented-control.js";
const _easycom_ws_wx_privacy = () => "../../uni_modules/ws-wx-privacy/components/ws-wx-privacy/ws-wx-privacy.js";
if (!Math) {
  (_easycom_uni_segmented_control + _easycom_ws_wx_privacy)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.o($options.onClickItem),
    b: common_vendor.p({
      current: $data.current,
      values: $data.items,
      styleType: "button",
      activeColor: "#4cd964"
    }),
    c: $data.current === 0,
    d: common_vendor.p({
      switchToLogin: $options.switchToLogin
    }),
    e: $data.current === 1,
    f: common_vendor.p({
      id: "privacy-popup"
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "C:/Users/Aibol/Desktop/work/host/pages/login/index.vue"]]);
wx.createPage(MiniProgramPage);
