"use strict";
const common_vendor = require("../common/vendor.js");
const _sfc_main = {
  props: {
    // 父组件通过该参数决定背景颜色
    useThemeColor: {
      type: Boolean,
      default: false
      // 默认背景为白色
    }
  },
  data() {
    return {
      statusBarHeight: "",
      // 系统状态栏高度
      themeColor: "#6AE75A"
      // 主题颜色
    };
  },
  created() {
    this.statusBarHeight = common_vendor.index.getSystemInfoSync().statusBarHeight;
    const platform = common_vendor.index.getSystemInfoSync().uniPlatform;
    console.log(platform);
    if (platform !== "mp-weixin") {
      this.themeColor = getComputedStyle(document.documentElement).getPropertyValue("--theme-color") || "#000000";
    } else {
      this.themeColor = "";
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: $data.statusBarHeight + "px",
    b: $props.useThemeColor ? $data.themeColor : "#ffffff"
  };
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-826a6678"], ["__file", "C:/Users/Aibol/Desktop/work/host/components/statusBar.vue"]]);
wx.createComponent(Component);
