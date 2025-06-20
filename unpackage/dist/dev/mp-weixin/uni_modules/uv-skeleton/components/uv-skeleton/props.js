"use strict";
var _a, _b;
const common_vendor = require("../../../../common/vendor.js");
const props = {
  props: {
    // 是否展示骨架组件
    loading: {
      type: Boolean,
      default: true
    },
    // 是否开启动画效果
    animate: {
      type: Boolean,
      default: true
    },
    // 段落占位图行数
    rows: {
      type: [String, Number],
      default: 0
    },
    // 段落占位图的宽度
    rowsWidth: {
      type: [String, Number, Array],
      default: "100%"
    },
    // 段落占位图的高度
    rowsHeight: {
      type: [String, Number, Array],
      default: 18
    },
    // 段落占位图的左边距
    rowsLeft: {
      type: [String, Number, Array],
      default: 0
    },
    // 是否展示标题占位图
    title: {
      type: Boolean,
      default: true
    },
    // 段落标题的宽度
    titleWidth: {
      type: [String, Number],
      default: "50%"
    },
    // 段落标题的高度
    titleHeight: {
      type: [String, Number],
      default: 18
    },
    // 是否展示头像占位图
    avatar: {
      type: Boolean,
      default: false
    },
    // 头像占位图大小
    avatarSize: {
      type: [String, Number],
      default: 32
    },
    // 头像占位图的形状，circle-圆形，square-方形
    avatarShape: {
      type: String,
      default: "circle"
    },
    ...(_b = (_a = common_vendor.index.$uv) == null ? void 0 : _a.props) == null ? void 0 : _b.skeleton
  }
};
exports.props = props;
