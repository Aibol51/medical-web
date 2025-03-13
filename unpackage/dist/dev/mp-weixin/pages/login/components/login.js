"use strict";
const common_vendor = require("../../../common/vendor.js");
const api_user = require("../../../api/user.js");
const utils_cache = require("../../../utils/cache.js");
const config_cache = require("../../../config/cache.js");
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
  __name: "login",
  setup(__props) {
    const {
      t
    } = common_vendor.useI18n();
    const valiForm = common_vendor.ref(null);
    const formData = common_vendor.ref({
      phoneNumber: "",
      password: "",
      captcha: "",
      captchaId: ""
    });
    const captcha = common_vendor.ref({
      id: "",
      image: ""
    });
    const rules = common_vendor.ref({
      phoneNumber: {
        rules: [
          {
            required: true,
            errorMessage: t("login.phone.input")
          },
          {
            minLength: 10,
            maxLength: 10,
            errorMessage: t("login.phone.length.error")
          }
        ]
      },
      password: {
        rules: [
          {
            required: true,
            errorMessage: t("login.password.input")
          },
          {
            minLength: 6,
            maxLength: 16,
            errorMessage: t("login.password.length.error")
          }
        ]
      },
      captcha: {
        rules: [
          {
            required: true,
            errorMessage: t("login.verification.input")
          },
          {
            minLength: 5,
            maxLength: 5,
            errorMessage: t("login.verification.error")
          }
        ]
      }
    });
    const getCaptchaApi = async () => {
      const res = await api_user.getCaptcha();
      captcha.value.image = res.data.imgPath;
      captcha.value.id = res.data.captchaId;
    };
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
    const handleAgree = () => {
    };
    const submit = async () => {
      try {
        const res = await valiForm.value.validate();
        console.log("表单数据信息：", res);
        try {
          await doRequire();
        } catch (error) {
          return;
        }
        handleAgree();
        const data = {
          phoneNumber: "+7" + formData.value.phoneNumber,
          captchaId: captcha.value.id,
          captcha: formData.value.captcha,
          password: formData.value.password
        };
        const loginRes = await api_user.loginMobile(data);
        if (loginRes.code === 0) {
          utils_cache.Cache.set(config_cache.USER_INFO, loginRes.data, loginRes.data.expire);
          utils_cache.Cache.set(config_cache.LOGIN_STATUS, loginRes.data.token, loginRes.data.expire);
          common_vendor.index.showToast({
            title: t("login.login.success"),
            icon: "none",
            duration: 2e3
          });
          setTimeout(() => {
            common_vendor.index.navigateTo({
              url: "/pages/home/index",
              animationType: "none"
            });
          }, 1e3);
        } else if (loginRes.code === 3) {
          getCaptchaApi();
          common_vendor.index.showToast({
            title: t("login.login.error"),
            icon: "none",
            duration: 3e3
          });
        }
      } catch (err) {
        console.log("表单错误信息：", err);
      }
    };
    common_vendor.onMounted(() => {
      getCaptchaApi();
      console.log("getCaptchaApi has been called");
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o(($event) => formData.value.phoneNumber = $event),
        b: common_vendor.p({
          type: "number",
          placeholder: _ctx.$t("login.phone.input"),
          modelValue: formData.value.phoneNumber
        }),
        c: common_vendor.p({
          required: true,
          label: _ctx.$t("login.phone.number"),
          name: "phoneNumber"
        }),
        d: common_vendor.o(($event) => formData.value.password = $event),
        e: common_vendor.p({
          type: "password",
          placeholder: _ctx.$t("login.password.input"),
          modelValue: formData.value.password
        }),
        f: common_vendor.p({
          required: true,
          label: _ctx.$t("login.password"),
          name: "password"
        }),
        g: common_vendor.o(getCaptchaApi),
        h: captcha.value.image,
        i: common_vendor.o(($event) => formData.value.captcha = $event),
        j: common_vendor.p({
          type: "text",
          placeholder: _ctx.$t("login.verification.input"),
          modelValue: formData.value.captcha
        }),
        k: common_vendor.p({
          required: true,
          label: _ctx.$t("login.verification.code"),
          name: "captcha"
        }),
        l: common_vendor.sr(valiForm, "0e24102f-0", {
          "k": "valiForm"
        }),
        m: common_vendor.p({
          rules: rules.value,
          modelValue: formData.value,
          ["label-position"]: "top",
          ["label-width"]: "70"
        }),
        n: common_vendor.t(_ctx.$t("login.login")),
        o: common_vendor.o(submit)
      };
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-0e24102f"], ["__file", "C:/Users/Aibol/Desktop/work/host/pages/login/components/login.vue"]]);
wx.createComponent(Component);
