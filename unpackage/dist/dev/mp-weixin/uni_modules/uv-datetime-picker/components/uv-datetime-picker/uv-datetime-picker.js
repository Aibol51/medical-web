"use strict";
const uni_modules_uvUiTools_libs_mixin_mpMixin = require("../../../uv-ui-tools/libs/mixin/mpMixin.js");
const uni_modules_uvUiTools_libs_mixin_mixin = require("../../../uv-ui-tools/libs/mixin/mixin.js");
const uni_modules_uvDatetimePicker_components_uvDatetimePicker_props = require("./props.js");
const uni_modules_uvUiTools_libs_util_dayjs = require("../../../uv-ui-tools/libs/util/dayjs.js");
const common_vendor = require("../../../../common/vendor.js");
function times(n, iteratee) {
  let index = -1;
  const result = Array(n < 0 ? 0 : n);
  while (++index < n) {
    result[index] = iteratee(index);
  }
  return result;
}
const _sfc_main = {
  name: "uv-datetime-picker",
  emits: ["close", "cancel", "confirm", "input", "change", "update:modelValue"],
  mixins: [uni_modules_uvUiTools_libs_mixin_mpMixin.mpMixin, uni_modules_uvUiTools_libs_mixin_mixin.mixin, uni_modules_uvDatetimePicker_components_uvDatetimePicker_props.props],
  data() {
    return {
      columns: [],
      innerDefaultIndex: [],
      innerFormatter: (type, value) => value
    };
  },
  watch: {
    propsChange() {
      this.$uv.sleep(100).then((res) => {
        this.init();
      });
    }
  },
  computed: {
    // 如果以下这些变量发生了变化，意味着需要重新初始化各列的值
    propsChange() {
      const propsValue = this.value || this.modelValue;
      return [this.mode, this.maxDate, this.minDate, this.minHour, this.maxHour, this.minMinute, this.maxMinute, this.filter, propsValue];
    }
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      this.getValue();
      this.updateColumnValue(this.innerValue);
    },
    getValue() {
      const propsValue = this.value || this.modelValue;
      this.innerValue = this.correctValue(propsValue);
    },
    // 在微信小程序中，不支持将函数当做props参数，故只能通过ref形式调用
    setFormatter(e) {
      this.innerFormatter = e;
    },
    open() {
      this.$refs.picker.open();
      setTimeout(() => {
        this.getValue();
        this.updateColumnValue(this.innerValue);
      }, 10);
    },
    close() {
      this.$emit("close");
    },
    // 点击工具栏的取消按钮
    cancel() {
      this.$emit("cancel");
    },
    // 点击工具栏的确定按钮
    confirm() {
      this.$emit("confirm", {
        value: this.innerValue,
        mode: this.mode
      });
      if (!this.clearDate) {
        this.$emit("input", this.innerValue);
        this.$emit("update:modelValue", this.innerValue);
      }
    },
    //用正则截取输出值,当出现多组数字时,抛出错误
    intercept(e, type) {
      let judge = e.match(/\d+/g);
      if (judge.length > 1) {
        this.$uv.error("请勿在过滤或格式化函数时添加数字");
        return 0;
      } else if (type && judge[0].length == 4) {
        return judge[0];
      } else if (judge[0].length > 2) {
        this.$uv.error("请勿在过滤或格式化函数时添加数字");
        return 0;
      } else {
        return judge[0];
      }
    },
    // 列发生变化时触发
    change(e) {
      const { indexs, values } = e;
      let selectValue = "";
      if (this.mode === "time") {
        selectValue = `${this.intercept(values[0][indexs[0]])}:${this.intercept(values[1][indexs[1]])}`;
      } else if (this.mode === "year") {
        const year = parseInt(this.intercept(values[0][indexs[0]], "year"));
        selectValue = Number(new Date(year, 0));
      } else {
        const year = parseInt(this.intercept(values[0][indexs[0]], "year"));
        const month = parseInt(this.intercept(values[1][indexs[1]]));
        let date = parseInt(values[2] ? this.intercept(values[2][indexs[2]]) : 1);
        let hour = 0, minute = 0;
        const maxDate = uni_modules_uvUiTools_libs_util_dayjs.dayjs(`${year}-${month}`).daysInMonth();
        if (this.mode === "year-month") {
          date = 1;
        }
        date = Math.min(maxDate, date);
        if (this.mode === "datetime") {
          hour = parseInt(this.intercept(values[3][indexs[3]]));
          minute = parseInt(this.intercept(values[4][indexs[4]]));
        }
        selectValue = Number(new Date(year, month - 1, date, hour, minute));
      }
      selectValue = this.correctValue(selectValue);
      this.innerValue = selectValue;
      this.updateColumnValue(selectValue);
      this.$emit("change", {
        value: selectValue,
        mode: this.mode
      });
    },
    // 更新各列的值，进行补0、格式化等操作
    updateColumnValue(value) {
      this.innerValue = value;
      this.updateColumns();
      this.updateIndexs(value);
    },
    // 更新索引
    updateIndexs(value) {
      let values = [];
      const formatter = this.formatter || this.innerFormatter;
      if (this.mode === "time") {
        const timeArr = value.split(":");
        values = [formatter("hour", timeArr[0]), formatter("minute", timeArr[1])];
      } else {
        values = [
          formatter("year", `${uni_modules_uvUiTools_libs_util_dayjs.dayjs(value).year()}`),
          // 月份补0
          formatter("month", this.$uv.padZero(uni_modules_uvUiTools_libs_util_dayjs.dayjs(value).month() + 1))
        ];
        if (this.mode === "date") {
          values.push(formatter("day", this.$uv.padZero(uni_modules_uvUiTools_libs_util_dayjs.dayjs(value).date())));
        }
        if (this.mode === "datetime") {
          values.push(formatter("day", this.$uv.padZero(uni_modules_uvUiTools_libs_util_dayjs.dayjs(value).date())), formatter("hour", this.$uv.padZero(uni_modules_uvUiTools_libs_util_dayjs.dayjs(value).hour())), formatter("minute", this.$uv.padZero(uni_modules_uvUiTools_libs_util_dayjs.dayjs(value).minute())));
        }
      }
      const indexs = this.columns.map((column, index) => {
        return Math.max(0, column.findIndex((item) => item === values[index]));
      });
      this.$nextTick(() => {
        this.$uv.sleep(100).then((res) => {
          this.$refs.picker.setIndexs(indexs, true);
        });
      });
    },
    // 更新各列的值
    updateColumns() {
      const formatter = this.formatter || this.innerFormatter;
      const results = this.getOriginColumns().map((column) => column.values.map((value) => formatter(column.type, value)));
      this.columns = results;
    },
    getOriginColumns() {
      const results = this.getRanges().map(({ type, range }) => {
        let values = times(range[1] - range[0] + 1, (index) => {
          let value = range[0] + index;
          value = type === "year" ? `${value}` : this.$uv.padZero(value);
          return value;
        });
        if (this.filter) {
          values = this.filter(type, values);
        }
        return { type, values };
      });
      return results;
    },
    // 通过最大值和最小值生成数组
    generateArray(start, end) {
      return Array.from(new Array(end + 1).keys()).slice(start);
    },
    // 得出合法的时间
    correctValue(value) {
      const isDateMode = this.mode !== "time";
      if (isDateMode && !this.$uv.test.date(value)) {
        value = this.minDate;
      } else if (!isDateMode && !value) {
        value = `${this.$uv.padZero(this.minHour)}:${this.$uv.padZero(this.minMinute)}`;
      }
      if (!isDateMode) {
        if (String(value).indexOf(":") === -1)
          return this.$uv.error("时间错误，请传递如12:24的格式");
        let [hour, minute] = value.split(":");
        hour = this.$uv.padZero(this.$uv.range(this.minHour, this.maxHour, Number(hour)));
        minute = this.$uv.padZero(this.$uv.range(this.minMinute, this.maxMinute, Number(minute)));
        return `${hour}:${minute}`;
      } else {
        value = uni_modules_uvUiTools_libs_util_dayjs.dayjs(value).isBefore(uni_modules_uvUiTools_libs_util_dayjs.dayjs(this.minDate)) ? this.minDate : value;
        value = uni_modules_uvUiTools_libs_util_dayjs.dayjs(value).isAfter(uni_modules_uvUiTools_libs_util_dayjs.dayjs(this.maxDate)) ? this.maxDate : value;
        return value;
      }
    },
    // 获取每列的最大和最小值
    getRanges() {
      if (this.mode === "time") {
        return [{
          type: "hour",
          range: [this.minHour, this.maxHour]
        }, {
          type: "minute",
          range: [this.minMinute, this.maxMinute]
        }];
      }
      const { maxYear, maxDate, maxMonth, maxHour, maxMinute } = this.getBoundary("max", this.innerValue);
      const { minYear, minDate, minMonth, minHour, minMinute } = this.getBoundary("min", this.innerValue);
      const result = [{
        type: "year",
        range: [minYear, maxYear]
      }, {
        type: "month",
        range: [minMonth, maxMonth]
      }, {
        type: "day",
        range: [minDate, maxDate]
      }, {
        type: "hour",
        range: [minHour, maxHour]
      }, {
        type: "minute",
        range: [minMinute, maxMinute]
      }];
      if (this.mode === "date")
        result.splice(3, 2);
      if (this.mode === "year-month")
        result.splice(2, 3);
      if (this.mode === "year")
        result.splice(1, 4);
      return result;
    },
    // 根据minDate、maxDate、minHour、maxHour等边界值，判断各列的开始和结束边界值
    getBoundary(type, innerValue) {
      const value = new Date(innerValue);
      const boundary = new Date(this[`${type}Date`]);
      const year = uni_modules_uvUiTools_libs_util_dayjs.dayjs(boundary).year();
      let month = 1;
      let date = 1;
      let hour = 0;
      let minute = 0;
      if (type === "max") {
        month = 12;
        date = uni_modules_uvUiTools_libs_util_dayjs.dayjs(value).daysInMonth();
        hour = 23;
        minute = 59;
      }
      if (uni_modules_uvUiTools_libs_util_dayjs.dayjs(value).year() === year) {
        month = uni_modules_uvUiTools_libs_util_dayjs.dayjs(boundary).month() + 1;
        if (uni_modules_uvUiTools_libs_util_dayjs.dayjs(value).month() + 1 === month) {
          date = uni_modules_uvUiTools_libs_util_dayjs.dayjs(boundary).date();
          if (uni_modules_uvUiTools_libs_util_dayjs.dayjs(value).date() === date) {
            hour = uni_modules_uvUiTools_libs_util_dayjs.dayjs(boundary).hour();
            if (uni_modules_uvUiTools_libs_util_dayjs.dayjs(value).hour() === hour) {
              minute = uni_modules_uvUiTools_libs_util_dayjs.dayjs(boundary).minute();
            }
          }
        }
      }
      return {
        [`${type}Year`]: year,
        [`${type}Month`]: month,
        [`${type}Date`]: date,
        [`${type}Hour`]: hour,
        [`${type}Minute`]: minute
      };
    }
  }
};
if (!Array) {
  const _easycom_uv_picker2 = common_vendor.resolveComponent("uv-picker");
  _easycom_uv_picker2();
}
const _easycom_uv_picker = () => "../../../uv-picker/components/uv-picker/uv-picker.js";
if (!Math) {
  _easycom_uv_picker();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.sr("picker", "1751ff96-0"),
    b: common_vendor.o($options.close),
    c: common_vendor.o($options.cancel),
    d: common_vendor.o($options.confirm),
    e: common_vendor.o($options.change),
    f: common_vendor.p({
      closeOnClickOverlay: _ctx.closeOnClickOverlay,
      closeOnClickConfirm: _ctx.closeOnClickConfirm,
      columns: $data.columns,
      title: _ctx.title,
      itemHeight: _ctx.itemHeight,
      showToolbar: _ctx.showToolbar,
      visibleItemCount: _ctx.visibleItemCount,
      defaultIndex: $data.innerDefaultIndex,
      cancelText: _ctx.cancelText,
      confirmText: _ctx.confirmText,
      cancelColor: _ctx.cancelColor,
      confirmColor: _ctx.confirmColor,
      round: _ctx.round
    })
  };
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "C:/Users/Aibol/Desktop/work/host/uni_modules/uv-datetime-picker/components/uv-datetime-picker/uv-datetime-picker.vue"]]);
wx.createComponent(Component);
