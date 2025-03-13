"use strict";
const common_vendor = require("../../../common/vendor.js");
const api_user = require("../../../api/user.js");
const locale_index = require("../../../locale/index.js");
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
const _sfc_main = {
  __name: "register",
  props: {
    switchToLogin: Function
  },
  setup(__props) {
    const props = __props;
    const valiForm = common_vendor.ref(null);
    const formData = common_vendor.reactive({
      username: "",
      phoneNumber: "",
      password: "",
      rePassword: "",
      captcha: ""
    });
    const isSending = common_vendor.ref(false);
    const countdown = common_vendor.ref(60);
    const rules = common_vendor.reactive({
      username: {
        rules: [{
          required: true,
          errorMessage: locale_index.i18n.global.t("register.username.input")
        }]
      },
      phoneNumber: {
        rules: [
          {
            required: true,
            errorMessage: locale_index.i18n.global.t("login.phone.input")
          },
          {
            minLength: 10,
            maxLength: 10,
            errorMessage: locale_index.i18n.global.t("login.phone.length.error")
          }
        ]
      },
      password: {
        rules: [
          {
            required: true,
            errorMessage: locale_index.i18n.global.t("login.password.input")
          },
          {
            minLength: 6,
            maxLength: 16,
            errorMessage: locale_index.i18n.global.t("login.password.length.error")
          }
        ]
      },
      rePassword: {
        rules: [
          {
            required: true,
            errorMessage: locale_index.i18n.global.t("login.password.input")
          },
          {
            minLength: 6,
            maxLength: 16,
            errorMessage: locale_index.i18n.global.t("login.password.length.error")
          },
          {
            validateFunction: (rule, value, data) => {
              if (value !== formData.password) {
                return locale_index.i18n.global.t("register.passwordMismatch");
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
            errorMessage: locale_index.i18n.global.t("login.verification.input")
          },
          {
            minLength: 5,
            maxLength: 5,
            errorMessage: locale_index.i18n.global.t("login.verification.error")
          }
        ]
      }
    });
    function doRequire() {
      return new Promise((resolve, reject) => {
        common_vendor.index.requirePrivacyAuthorize({
          success: () => {
            console.log("同意");
            resolve();
          },
          fail: () => {
            console.log("拒绝");
            reject(new Error("用户拒绝授权"));
          },
          complete: () => {
          }
        });
      });
    }
    const submit = async () => {
      try {
        try {
          await doRequire();
        } catch (error) {
          return;
        }
        await valiForm.value.validate();
        const submitData = {
          ...formData,
          phoneNumber: "+7" + formData.phoneNumber
        };
        const res = await api_user.registerMobile(submitData);
        if (res.code === 0) {
          console.log(res);
          common_vendor.index.showToast({
            title: locale_index.i18n.global.t("register.success"),
            icon: "none",
            duration: 2e3
          });
          props.switchToLogin();
        } else if (res.code === 3) {
          common_vendor.index.showToast({
            title: locale_index.i18n.global.t("register.codeError"),
            icon: "none",
            duration: 3e3
          });
        }
      } catch (err) {
        console.log("表单错误信息：", err);
      }
    };
    const sendCaptcha = async () => {
      const phoneRules = rules.phoneNumber.rules;
      const phoneNumber = formData.phoneNumber;
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
      if (!isPhoneValid || isSending.value)
        return;
      const data = {
        phoneNumber: "+7" + phoneNumber
      };
      const res = await api_user.getSmsCaptcha(data);
      if (res.code === 0) {
        common_vendor.index.showToast({
          title: locale_index.i18n.global.t("register.codeSent"),
          icon: "none",
          duration: 1e3
        });
        console.log("发送验证码...");
        isSending.value = true;
        const timer = setInterval(() => {
          countdown.value -= 1;
          if (countdown.value <= 0) {
            clearInterval(timer);
            isSending.value = false;
            countdown.value = 60;
          }
        }, 1e3);
      }
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o(($event) => formData.username = $event),
        b: common_vendor.p({
          type: "text",
          placeholder: _ctx.$t("register.username.input"),
          modelValue: formData.username
        }),
        c: common_vendor.p({
          required: true,
          label: _ctx.$t("register.username"),
          name: "username"
        }),
        d: common_vendor.o(($event) => formData.phoneNumber = $event),
        e: common_vendor.p({
          type: "number",
          placeholder: _ctx.$t("login.phone.input"),
          modelValue: formData.phoneNumber
        }),
        f: common_vendor.p({
          required: true,
          label: _ctx.$t("login.phone.number"),
          name: "phoneNumber"
        }),
        g: common_vendor.o(($event) => formData.password = $event),
        h: common_vendor.p({
          type: "password",
          placeholder: _ctx.$t("login.password.input"),
          modelValue: formData.password
        }),
        i: common_vendor.p({
          required: true,
          label: _ctx.$t("login.password"),
          name: "password"
        }),
        j: common_vendor.o(($event) => formData.rePassword = $event),
        k: common_vendor.p({
          type: "password",
          placeholder: _ctx.$t("login.password.input"),
          modelValue: formData.rePassword
        }),
        l: common_vendor.p({
          required: true,
          label: _ctx.$t("register.confirmPassword"),
          name: "rePassword"
        }),
        m: common_vendor.t(isSending.value ? `${countdown.value}s` : _ctx.$t("register.sendCode")),
        n: isSending.value,
        o: isSending.value,
        p: common_vendor.o(sendCaptcha),
        q: common_vendor.o(($event) => formData.captcha = $event),
        r: common_vendor.p({
          type: "text",
          placeholder: _ctx.$t("login.verification.input"),
          modelValue: formData.captcha
        }),
        s: common_vendor.p({
          required: true,
          label: _ctx.$t("login.verification.code"),
          name: "captcha"
        }),
        t: common_vendor.sr(valiForm, "07d7a9e6-0", {
          "k": "valiForm"
        }),
        v: common_vendor.p({
          rules,
          ["model-value"]: formData,
          ["label-position"]: "top",
          ["label-width"]: "70"
        }),
        w: common_vendor.t(_ctx.$t("register.register")),
        x: common_vendor.o(($event) => submit())
      };
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "C:/Users/Aibol/Desktop/work/host/pages/login/components/register.vue"]]);
wx.createComponent(Component);
