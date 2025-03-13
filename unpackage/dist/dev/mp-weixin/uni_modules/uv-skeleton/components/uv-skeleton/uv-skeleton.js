"use strict";
const uni_modules_uvUiTools_libs_mixin_mpMixin = require("../../../uv-ui-tools/libs/mixin/mpMixin.js");
const uni_modules_uvUiTools_libs_mixin_mixin = require("../../../uv-ui-tools/libs/mixin/mixin.js");
const uni_modules_uvSkeleton_components_uvSkeleton_props = require("./props.js");
const common_vendor = require("../../../../common/vendor.js");
const _sfc_main = {
  name: "uv-skeleton",
  mixins: [uni_modules_uvUiTools_libs_mixin_mpMixin.mpMixin, uni_modules_uvUiTools_libs_mixin_mixin.mixin, uni_modules_uvSkeleton_components_uvSkeleton_props.props],
  data() {
    return {
      width: 0
    };
  },
  watch: {
    loading() {
      this.getComponentWidth();
    }
  },
  computed: {
    rowsArray() {
      if (/%$/.test(this.rowsHeight)) {
        this.$uv.error("rowsHeight参数不支持百分比单位");
      }
      const rows = [];
      for (let i = 0; i < this.rows; i++) {
        let item = {}, rowWidth = this.$uv.test.array(this.rowsWidth) ? this.rowsWidth[i] || (i === this.row - 1 ? "70%" : "100%") : i === this.rows - 1 ? "70%" : this.rowsWidth, rowHeight = this.$uv.test.array(this.rowsHeight) ? this.rowsHeight[i] || "18px" : this.rowsHeight, rowLeft = this.$uv.test.array(this.rowsLeft) ? this.rowsLeft[i] || 0 : this.rowsLeft;
        item.marginTop = !this.title && i === 0 ? 0 : this.title && i === 0 ? "20px" : "12px";
        if (/%$/.test(rowWidth)) {
          item.width = this.$uv.addUnit(this.width * parseInt(rowWidth) / 100);
        } else {
          item.width = this.$uv.addUnit(rowWidth);
        }
        item.height = this.$uv.addUnit(rowHeight);
        item.marginLeft = this.$uv.addUnit(rowLeft);
        rows.push(item);
      }
      return rows;
    },
    uTitleWidth() {
      let tWidth = 0;
      if (/%$/.test(this.titleWidth)) {
        tWidth = this.$uv.addUnit(this.width * parseInt(this.titleWidth) / 100);
      } else {
        tWidth = this.$uv.addUnit(this.titleWidth);
      }
      return this.$uv.addUnit(tWidth);
    }
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      this.getComponentWidth();
    },
    async setNvueAnimation() {
    },
    // 获取组件的宽度
    async getComponentWidth() {
      await this.$uv.sleep(20);
      this.$uvGetRect(".uv-skeleton__wrapper__content").then((size) => {
        this.width = size.width;
      });
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: _ctx.loading
  }, _ctx.loading ? common_vendor.e({
    b: _ctx.avatar
  }, _ctx.avatar ? {
    c: common_vendor.n(`uv-skeleton__wrapper__avatar--${_ctx.avatarShape}`),
    d: common_vendor.n(_ctx.animate && "animate"),
    e: _ctx.$uv.addUnit(_ctx.avatarSize),
    f: _ctx.$uv.addUnit(_ctx.avatarSize)
  } : {}, {
    g: _ctx.title
  }, _ctx.title ? {
    h: $options.uTitleWidth,
    i: _ctx.$uv.addUnit(_ctx.titleHeight),
    j: common_vendor.n(_ctx.animate && "animate")
  } : {}, {
    k: common_vendor.f($options.rowsArray, (item, index, i0) => {
      return {
        a: index,
        b: item.width,
        c: item.height,
        d: item.marginTop,
        e: item.marginLeft
      };
    }),
    l: common_vendor.n(_ctx.animate && "animate")
  }) : {});
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-0b5f3d7f"], ["__file", "C:/Users/Aibol/Desktop/work/host/uni_modules/uv-skeleton/components/uv-skeleton/uv-skeleton.vue"]]);
wx.createComponent(Component);
