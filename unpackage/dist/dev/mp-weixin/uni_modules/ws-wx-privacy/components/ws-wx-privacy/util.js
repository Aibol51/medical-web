"use strict";
function getContext() {
  const pages = getCurrentPages();
  return pages[pages.length - 1];
}
function getComponent(context, selector) {
  let component = null;
  component = context.selectComponent && context.selectComponent(selector) && context.selectComponent(selector).$vm;
  return component;
}
exports.getComponent = getComponent;
exports.getContext = getContext;
