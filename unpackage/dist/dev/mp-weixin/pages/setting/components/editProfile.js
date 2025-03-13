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
        nickname: ""
      },
      rules: {
        nickname: {
          rules: [{
            required: true,
            errorMessage: this.$t("user.enterNickName")
          }]
        }
      }
    };
  },
  onShow() {
    this.getMemberInfo();
  },
  methods: {
    submit() {
      this.$refs.valiForm.validate().then((res) => {
        console.log("表单数据信息：", res);
        api_user.modifyProfile(this.formData).then((res2) => {
          if (res2.code === 0) {
            utils_cache.Cache.update(config_cache.USER_INFO).nickname = this.formData.nickname;
            console.log(res2);
            common_vendor.index.showToast({
              title: locale_index.i18n.global.t("user.editSuccess"),
              icon: "none",
              duration: 2e3
            });
            setTimeout(function() {
              common_vendor.index.navigateTo({
                url: "/pages/user/index",
                animationType: "none"
              });
            }, 1e3);
          }
        });
      }).catch((err) => {
        console.log("表单错误信息：", err);
      });
    },
    getMemberInfo() {
      const data = {
        id: utils_cache.Cache.get(config_cache.USER_INFO).userId
      };
      api_user.getMemberById(data).then((res) => {
        if (res.code === 0) {
          console.log(res.data);
          utils_cache.Cache.update(config_cache.USER_INFO).nickname = res.data.nickname;
          this.formData.nickname = res.data.nickname;
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
    a: common_vendor.o(($event) => $data.formData.nickname = $event),
    b: common_vendor.p({
      type: "text",
      placeholder: _ctx.$t("user.enterNickName"),
      modelValue: $data.formData.nickname
    }),
    c: common_vendor.p({
      required: true,
      label: _ctx.$t("user.nickName"),
      name: "nickname"
    }),
    d: common_vendor.sr("valiForm", "4a971ff6-0"),
    e: common_vendor.p({
      rules: $data.rules,
      modelValue: $data.formData,
      ["label-position"]: "top",
      ["label-width"]: "70"
    }),
    f: common_vendor.t(_ctx.$t("user.confirm")),
    g: common_vendor.o(($event) => $options.submit())
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "C:/Users/Aibol/Desktop/work/host/pages/setting/components/editProfile.vue"]]);
wx.createPage(MiniProgramPage);
