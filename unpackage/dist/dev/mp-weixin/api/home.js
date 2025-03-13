"use strict";
const utils_request = require("../utils/request.js");
function swiperList(data) {
  return utils_request.request.post("/mms-api/swiper/list", data, { noAuth: true });
}
function newsList(data) {
  return utils_request.request.post("/mms-api/news/list", data, { noAuth: true });
}
function getNews(data) {
  return utils_request.request.post("/mms-api/news", data, { noAuth: true });
}
exports.getNews = getNews;
exports.newsList = newsList;
exports.swiperList = swiperList;
