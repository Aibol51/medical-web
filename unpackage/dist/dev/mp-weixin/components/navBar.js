"use strict";
const common_vendor = require("../common/vendor.js");
const utils_cache = require("../utils/cache.js");
const config_cache = require("../config/cache.js");
const _sfc_main = {
  __name: "navBar",
  props: {
    activeIndex: {
      type: Number,
      default: 0
    }
  },
  emits: ["update:activeIndex"],
  setup(__props, { emit: __emit }) {
    const {
      t,
      locale
    } = common_vendor.useI18n();
    const props = __props;
    const emit = __emit;
    const navList = [
      {
        icon: "/static/navBar/home.png",
        path: "/pages/home/index",
        activeIcon: "/static/navBar/activeHome.png",
        auth: false
      },
      {
        icon: "/static/navBar/booking.png",
        path: "/pages/appointment/index",
        activeIcon: "/static/navBar/activeBooking.png",
        auth: true
      },
      {
        icon: "/static/navBar/user.png",
        path: "/pages/user/index",
        activeIcon: "/static/navBar/activeUser.png",
        auth: true
      }
    ];
    const handleClick = (index) => {
      emit("update:activeIndex", index);
      if (props.activeIndex === index)
        return;
      if (navList[index].auth) {
        if (!utils_cache.Cache.has(config_cache.LOGIN_STATUS, false)) {
          common_vendor.index.showToast({
            title: t("login.prompt"),
            icon: "none",
            duration: 1e3
          });
          setTimeout(function() {
            common_vendor.index.navigateTo({
              url: "/pages/login/index",
              animationType: "none"
            });
          }, 1e3);
          return;
        }
      }
      common_vendor.index.navigateTo({
        url: navList[index].path,
        animationType: "none"
      });
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(navList, (item, index, i0) => {
          return {
            a: __props.activeIndex === index ? item.activeIcon : item.icon,
            b: index,
            c: common_vendor.o(($event) => handleClick(index), index)
          };
        })
      };
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-3075e18a"], ["__file", "C:/Users/Aibol/Desktop/work/host/components/navBar.vue"]]);
wx.createComponent(Component);
