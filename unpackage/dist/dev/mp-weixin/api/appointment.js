"use strict";
const utils_request = require("../utils/request.js");
function appointmentDetails(data) {
  return utils_request.request.post("/mms-api/appointment", data);
}
function createAppointment(data) {
  return utils_request.request.post("/mms-api/appointment/create", data);
}
function cancelAppointment(data) {
  return utils_request.request.post("/mms-api/appointment/delete", data);
}
function getAppointmentList(data) {
  return utils_request.request.post("/mms-api/appointment/list", data);
}
exports.appointmentDetails = appointmentDetails;
exports.cancelAppointment = cancelAppointment;
exports.createAppointment = createAppointment;
exports.getAppointmentList = getAppointmentList;
