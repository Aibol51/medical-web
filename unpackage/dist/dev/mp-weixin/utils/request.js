"use strict";
const common_vendor = require("../common/vendor.js");
const config_app = require("../config/app.js");
const locale_index = require("../locale/index.js");
console.log(locale_index.i18n);
function toLogin() {
  common_vendor.index.showToast({
    title: locale_index.i18n.global.t("login.prompt"),
    icon: "none",
    duration: 1e3
  });
  setTimeout(function() {
    common_vendor.index.navigateTo({
      url: "/pages/login/index",
      animationType: "none"
    });
  }, 2e3);
}
function baseRequest(url, method, data, {
  noAuth = false,
  noVerify = false
}) {
  let Url = config_app.HTTP_REQUEST_URL, header = config_app.HEADER;
  if (!data) {
    data = {};
  }
  let user = common_vendor.index.getStorageSync("USER_INFO");
  if (user && user.token)
    header[config_app.TOKENNAME] = "Bearer " + user.token;
  return new Promise((reslove, reject) => {
    common_vendor.index.request({
      url: Url + url,
      method: method || "GET",
      header,
      data: data || {},
      success: (res) => {
        if (res.statusCode === 401) {
          console.log("未授权，请重新登录");
          toLogin();
          reject({
            message: "未授权，请重新登录",
            data: res.data
          });
          return;
        }
        console.log(Url + url, data, res.data);
        if (noVerify) {
          console.log(Url + url, data, res.data);
          reslove(res.data, res);
        }
        reslove(res.data, res);
      }
    });
  });
}
const request = {};
["options", "get", "post", "put", "head", "delete", "trace", "connect"].forEach((method) => {
  request[method] = (api, data, opt) => baseRequest(api, method, data, opt || {});
});
exports.request = request;
