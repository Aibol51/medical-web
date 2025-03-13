"use strict";
const utils_request = require("../utils/request.js");
function reportList(data) {
  return utils_request.request.post("/mms-api/medical_record/list", data, { noAuth: true });
}
exports.reportList = reportList;
