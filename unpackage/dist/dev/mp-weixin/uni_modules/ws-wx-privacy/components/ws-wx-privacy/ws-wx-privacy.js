"use strict";
const common_vendor = require("../../../../common/vendor.js");
const uni_modules_wsWxPrivacy_components_wsWxPrivacy_util = require("./util.js");
const privacyResolves = /* @__PURE__ */ new Set();
let privacyHandler = null;
if (common_vendor.index.onNeedPrivacyAuthorization) {
  common_vendor.index.onNeedPrivacyAuthorization((resolve) => {
    if (typeof privacyHandler === "function") {
      privacyHandler(resolve);
    }
  });
}
const _sfc_main = {
  name: "wsWxPrivacy",
  emits: ["disagree", "agree"],
  props: {
    // 标题
    title: {
      type: String,
      default: "用户隐私保护提示"
    },
    // 描述
    desc: {
      type: String,
      default: "感谢您使用本应用，您使用本应用的服务之前请仔细阅读并同意"
    },
    // 自定义隐私保护指引名称
    protocol: {
      type: String,
      default: "《用户隐私保护指引》"
    },
    // 是否自动获取隐私保护指引名称（开启后调用getPrivacySetting获取名称）
    enableAutoProtocol: {
      type: Boolean,
      default: false
      // 默认为使用自定义隐私指引名称
    },
    // 子描述
    subDesc: {
      type: String,
      default: "。当您点击同意并开始使用产品服务时，即表示你已理解并同意该条款内容，该条款将对您产生法律约束力。如您拒绝，将无法使用相应服务。"
    },
    /**
     * 控制是否可以点击不同意按钮并显示提示。
     * 如果设置为 true，用户可以点击不同意按钮执行后续逻辑。
     * 如果设置为 false，点击不同意按钮会显示提示信息，但不会执行后续逻辑。
     * 默认为 true
     */
    disagreeEnabled: {
      type: Boolean,
      default: true
      // 默认为可以点击
    },
    /**
     * 配置不同意按钮的提示消息内容。
     */
    disagreePromptText: {
      type: String,
      default: "请先仔细阅读并同意隐私协议"
      // 默认提示消息
    },
    // 拒绝按钮文字
    disagreeText: {
      type: String,
      default: "不同意"
    },
    // 同意按钮文字
    agreeText: {
      type: String,
      default: "同意并继续"
    },
    // 自定义背景颜色
    bgColor: {
      type: String,
      default: ""
    },
    // 自定义主题颜色（控制同意按钮和隐私协议名称的颜色）
    themeColor: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      privacyContractName: ""
    };
  },
  computed: {
    rootStyle() {
      if (this.bgColor) {
        return `background:${this.bgColor}`;
      } else {
        return "";
      }
    },
    protocolStyle() {
      if (this.themeColor) {
        return `color:${this.themeColor}`;
      } else {
        return "";
      }
    },
    agreeStyle() {
      if (this.themeColor) {
        return `background:${this.themeColor}`;
      } else {
        return "";
      }
    }
  },
  created() {
    privacyHandler = (resolve) => {
      const context = uni_modules_wsWxPrivacy_components_wsWxPrivacy_util.getContext();
      const privacyPopup = uni_modules_wsWxPrivacy_components_wsWxPrivacy_util.getComponent(context, "#privacy-popup");
      if (privacyPopup) {
        const privacy = uni_modules_wsWxPrivacy_components_wsWxPrivacy_util.getComponent(privacyPopup, "#privacy");
        if (privacy && privacy.open) {
          privacy.open();
        }
      }
      privacyResolves.add(resolve);
    };
    if (this.enableAutoProtocol && common_vendor.index.getPrivacySetting) {
      common_vendor.index.getPrivacySetting({
        success: (res) => {
          if (res.privacyContractName) {
            this.privacyContractName = res.privacyContractName;
          }
        },
        fail: () => {
        },
        complete: () => {
        }
      });
    }
  },
  methods: {
    /**
     * 打开隐私协议
     */
    openPrivacyContract() {
      common_vendor.wx$1.openPrivacyContract({
        success: (res) => {
          console.log("openPrivacyContract success");
        },
        fail: (res) => {
          console.error("openPrivacyContract fail", res);
        }
      });
    },
    /**
     * 拒绝隐私协议
     */
    handleDisagree() {
      if (this.disagreeEnabled) {
        this.$refs.privacyPopup.close();
        privacyResolves.forEach((resolve) => {
          resolve({
            event: "disagree"
          });
        });
        privacyResolves.clear();
        this.$emit("disagree");
      } else {
        common_vendor.index.showToast({
          icon: "none",
          title: this.disagreePromptText
        });
      }
    },
    /**
     * 同意隐私协议
     */
    handleAgree() {
      this.$refs.privacyPopup.close();
      privacyResolves.forEach((resolve) => {
        resolve({
          event: "agree",
          buttonId: "agree-btn"
        });
      });
      privacyResolves.clear();
      this.$emit("agree");
    }
  }
};
if (!Array) {
  const _easycom_uni_popup2 = common_vendor.resolveComponent("uni-popup");
  _easycom_uni_popup2();
}
const _easycom_uni_popup = () => "../../../uni-popup/components/uni-popup/uni-popup.js";
if (!Math) {
  _easycom_uni_popup();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.t($props.title),
    b: common_vendor.t($props.desc),
    c: common_vendor.t($data.privacyContractName || $props.protocol),
    d: common_vendor.s($options.protocolStyle),
    e: common_vendor.o((...args) => $options.openPrivacyContract && $options.openPrivacyContract(...args)),
    f: common_vendor.t($props.subDesc),
    g: common_vendor.t($props.agreeText),
    h: common_vendor.s($options.agreeStyle),
    i: common_vendor.o((...args) => $options.handleAgree && $options.handleAgree(...args)),
    j: common_vendor.t($props.disagreeText),
    k: common_vendor.o((...args) => $options.handleDisagree && $options.handleDisagree(...args)),
    l: common_vendor.s($options.rootStyle),
    m: common_vendor.sr("privacyPopup", "8a07aa0a-0"),
    n: common_vendor.p({
      id: "privacy",
      type: "center",
      maskClick: false
    })
  };
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-8a07aa0a"], ["__file", "C:/Users/Aibol/Desktop/work/host/uni_modules/ws-wx-privacy/components/ws-wx-privacy/ws-wx-privacy.vue"]]);
wx.createComponent(Component);
