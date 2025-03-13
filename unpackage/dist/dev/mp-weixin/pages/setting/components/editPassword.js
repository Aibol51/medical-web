"use strict";
const common_vendor = require("../../../common/vendor.js");
const locale_index = require("../../../locale/index.js");
const utils_cache = require("../../../utils/cache.js");
const api_user = require("../../../api/user.js");
const config_cache = require("../../../config/cache.js");
const _sfc_main = {
  data() {
    return {
      formData: {
        phoneNumber: "",
        password: "",
        rePassword: "",
        captcha: ""
      },
      rules: {
        phoneNumber: {
          rules: [
            {
              required: true,
              errorMessage: this.$t("login.phone.input")
            },
            {
              minLength: 10,
              maxLength: 10,
              errorMessage: this.$t("login.phone.length.error")
            }
          ]
        },
        password: {
          rules: [
            {
              required: true,
              errorMessage: this.$t("login.password.input")
            },
            {
              minLength: 6,
              maxLength: 16,
              errorMessage: this.$t("login.password.length.error")
            }
          ]
        },
        rePassword: {
          rules: [
            {
              required: true,
              errorMessage: this.$t("login.password.input")
            },
            {
              minLength: 6,
              maxLength: 16,
              errorMessage: this.$t("login.password.length.error")
            },
            {
              validateFunction: (rule, value, data) => {
                if (value !== this.formData.password) {
                  return this.$t("register.passwordMismatch");
                }
                return true;
              }
            }
          ]
        },
        captcha: {
          rules: [
            {
              required: true,
              errorMessage: this.$t("login.verification.input")
            },
            {
              minLength: 5,
              maxLength: 5,
              errorMessage: this.$t("login.verification.error")
            }
          ]
        }
      },
      isSending: false,
      countdown: 60
    };
  },
  onShow() {
    this.getMemberInfo();
  },
  methods: {
    submit() {
      this.$refs.valiForm.validate().then((res) => {
        console.log("表单数据信息：", res);
        this.formData.phoneNumber = "+7" + this.formData.phoneNumber;
        api_user.resetPasswordBySms(this.formData).then((res2) => {
          if (res2.code === 0) {
            console.log(res2);
            common_vendor.index.showToast({
              title: locale_index.i18n.global.t("user.editPasswordSuccess"),
              icon: "none",
              duration: 2e3
            });
            common_vendor.index.navigateTo({
              url: "/pages/user/index",
              animationType: "none"
            });
          } else if (res2.code === 3) {
            common_vendor.index.showToast({
              title: locale_index.i18n.global.t("register.codeError"),
              icon: "none",
              duration: 3e3
            });
          }
        });
      }).catch((err) => {
        console.log("表单错误信息：", err);
      });
    },
    sendCaptcha() {
      const phoneRules = this.rules.phoneNumber.rules;
      const phoneNumber = this.formData.phoneNumber;
      const isPhoneValid = phoneRules.every((rule) => {
        if (rule.required && !phoneNumber) {
          common_vendor.index.showToast({
            title: rule.errorMessage,
            icon: "none",
            duration: 2e3
          });
          return false;
        }
        if (rule.minLength && phoneNumber.length < rule.minLength) {
          common_vendor.index.showToast({
            title: rule.errorMessage,
            icon: "none",
            duration: 2e3
          });
          return false;
        }
        if (rule.maxLength && phoneNumber.length > rule.maxLength) {
          common_vendor.index.showToast({
            title: rule.errorMessage,
            icon: "none",
            duration: 2e3
          });
          return false;
        }
        return true;
      });
      if (!isPhoneValid) {
        return;
      }
      if (this.isSending)
        return;
      const data = {
        phoneNumber: "+7" + phoneNumber
      };
      api_user.getSmsCaptcha(data).then((res) => {
        if (res.code === 0) {
          common_vendor.index.showToast({
            title: locale_index.i18n.global.t("register.codeSent"),
            icon: "none",
            duration: 1e3
          });
          console.log("发送验证码...");
          this.isSending = true;
          let timer = setInterval(() => {
            this.countdown -= 1;
            if (this.countdown <= 0) {
              clearInterval(timer);
              this.isSending = false;
              this.countdown = 60;
            }
          }, 1e3);
        }
      });
    },
    getMemberInfo() {
      const data = {
        id: utils_cache.Cache.get(config_cache.USER_INFO).userId
      };
      api_user.getMemberById(data).then((res) => {
        if (res.code === 0) {
          console.log(res.data);
          let mobile = res.data.mobile;
          if (mobile.startsWith("+7")) {
            mobile = mobile.replace("+7", "");
          }
          this.formData.phoneNumber = mobile;
        }
      });
    }
  }
};
if (!Array) {
  const _easycom_uni_easyinput2 = common_vendor.resolveComponent("uni-easyinput");
  const _easycom_uni_forms_item2 = common_vendor.resolveComponent("uni-forms-item");
  const _easycom_uni_forms2 = common_vendor.resolveComponent("uni-forms");
  (_easycom_uni_easyinput2 + _easycom_uni_forms_item2 + _easycom_uni_forms2)();
}
const _easycom_uni_easyinput = () => "../../../uni_modules/uni-easyinput/components/uni-easyinput/uni-easyinput.js";
const _easycom_uni_forms_item = () => "../../../uni_modules/uni-forms/components/uni-forms-item/uni-forms-item.js";
const _easycom_uni_forms = () => "../../../uni_modules/uni-forms/components/uni-forms/uni-forms.js";
if (!Math) {
  (_easycom_uni_easyinput + _easycom_uni_forms_item + _easycom_uni_forms)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.o(($event) => $data.formData.phoneNumber = $event),
    b: common_vendor.p({
      type: "number",
      placeholder: _ctx.$t("login.phone.input"),
      disabled: true,
      modelValue: $data.formData.phoneNumber
    }),
    c: common_vendor.p({
      required: true,
      label: _ctx.$t("login.phone.number"),
      name: "phoneNumber"
    }),
    d: common_vendor.o(($event) => $data.formData.password = $event),
    e: common_vendor.p({
      type: "password",
      placeholder: _ctx.$t("login.password.input"),
      modelValue: $data.formData.password
    }),
    f: common_vendor.p({
      required: true,
      label: _ctx.$t("login.password"),
      name: "password"
    }),
    g: common_vendor.o(($event) => $data.formData.rePassword = $event),
    h: common_vendor.p({
      type: "password",
      placeholder: _ctx.$t("login.password.input"),
      modelValue: $data.formData.rePassword
    }),
    i: common_vendor.p({
      required: true,
      label: _ctx.$t("register.confirmPassword"),
      name: "rePassword"
    }),
    j: common_vendor.t($data.isSending ? `${$data.countdown}s` : _ctx.$t("register.sendCode")),
    k: $data.isSending,
    l: $data.isSending,
    m: common_vendor.o((...args) => $options.sendCaptcha && $options.sendCaptcha(...args)),
    n: common_vendor.o(($event) => $data.formData.captcha = $event),
    o: common_vendor.p({
      type: "text",
      placeholder: _ctx.$t("login.verification.input"),
      modelValue: $data.formData.captcha
    }),
    p: common_vendor.p({
      required: true,
      label: _ctx.$t("login.verification.code"),
      name: "captcha"
    }),
    q: common_vendor.sr("valiForm", "57537fef-0"),
    r: common_vendor.p({
      rules: $data.rules,
      modelValue: $data.formData,
      ["label-position"]: "top",
      ["label-width"]: "70"
    }),
    s: common_vendor.t(_ctx.$t("user.editPassword")),
    t: common_vendor.o(($event) => $options.submit())
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "C:/Users/Aibol/Desktop/work/host/pages/setting/components/editPassword.vue"]]);
wx.createPage(MiniProgramPage);
