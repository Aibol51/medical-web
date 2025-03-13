"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const common_vendor = require("./common/vendor.js");
const locale_index = require("./locale/index.js");
if (!Math) {
  "./pages/home/index.js";
  "./pages/appointment/index.js";
  "./pages/news/index.js";
  "./pages/login/index.js";
  "./pages/news/components/details.js";
  "./pages/user/index.js";
  "./pages/medicine/index.js";
  "./pages/medicine/components/details.js";
  "./pages/report/index.js";
  "./pages/setting/index.js";
  "./pages/setting/components/editProfile.js";
  "./pages/setting/components/editPassword.js";
  "./pages/privacy/privacy.js";
  "./pages/privacy/userService.js";
}
const _sfc_main = {
  onLaunch: function() {
    console.log("App Launch");
  },
  onShow: function() {
    console.log("App Show");
  },
  onHide: function() {
    console.log("App Hide");
  }
};
const App = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "C:/Users/Aibol/Desktop/work/host/App.vue"]]);
function createApp() {
  const app = common_vendor.createSSRApp(App);
  app.use(locale_index.i18n);
  return {
    app
  };
}
createApp().app.mount("#app");
exports.createApp = createApp;
