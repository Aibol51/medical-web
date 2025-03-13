"use strict";
const utils_request = require("../utils/request.js");
function medicineList(data) {
  return utils_request.request.post("/mms-api/medicine/list", data, { noAuth: true });
}
function getMedicine(data) {
  return utils_request.request.post("/mms-api/medicine", data, { noAuth: true });
}
exports.getMedicine = getMedicine;
exports.medicineList = medicineList;
