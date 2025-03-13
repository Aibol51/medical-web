"use strict";
const utils_request = require("../utils/request.js");
function loginMobile(data) {
  return utils_request.request.post("/mms-api/member/login_by_mobile", data, {
    noAuth: true
  });
}
function registerMobile(data) {
  return utils_request.request.post("/mms-api/member/register_by_sms", data, {
    noAuth: true
  });
}
function getCaptcha() {
  return utils_request.request.get("/mms-api/captcha", {
    noAuth: true
  });
}
function getSmsCaptcha(data) {
  return utils_request.request.post("/mms-api/captcha/sms", data, {
    noAuth: true
  });
}
function getLogout() {
  return utils_request.request.get("/mms-api/member/logout");
}
function getMemberById(data) {
  return utils_request.request.post("/mms-api/member/getMemberInfo", data);
}
function resetPasswordBySms(data) {
  return utils_request.request.post("/mms-api/member/reset_password_by_sms", data);
}
function modifyProfile(data) {
  return utils_request.request.post("/mms-api/member/profile", data);
}
exports.getCaptcha = getCaptcha;
exports.getLogout = getLogout;
exports.getMemberById = getMemberById;
exports.getSmsCaptcha = getSmsCaptcha;
exports.loginMobile = loginMobile;
exports.modifyProfile = modifyProfile;
exports.registerMobile = registerMobile;
exports.resetPasswordBySms = resetPasswordBySms;
