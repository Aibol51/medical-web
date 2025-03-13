"use strict";
const common_vendor = require("../../common/vendor.js");
const api_appointment = require("../../api/appointment.js");
const utils_cache = require("../../utils/cache.js");
const config_cache = require("../../config/cache.js");
if (!Array) {
  const _easycom_uv_icon2 = common_vendor.resolveComponent("uv-icon");
  const _easycom_uv_navbar2 = common_vendor.resolveComponent("uv-navbar");
  const _easycom_uv_button2 = common_vendor.resolveComponent("uv-button");
  const _easycom_uv_empty2 = common_vendor.resolveComponent("uv-empty");
  const _easycom_uv_steps_item2 = common_vendor.resolveComponent("uv-steps-item");
  const _easycom_uv_steps2 = common_vendor.resolveComponent("uv-steps");
  const _easycom_uv_input2 = common_vendor.resolveComponent("uv-input");
  const _easycom_uv_form_item2 = common_vendor.resolveComponent("uv-form-item");
  const _easycom_uv_form2 = common_vendor.resolveComponent("uv-form");
  const _easycom_uv_action_sheet2 = common_vendor.resolveComponent("uv-action-sheet");
  const _easycom_uv_datetime_picker2 = common_vendor.resolveComponent("uv-datetime-picker");
  const _easycom_uv_popup2 = common_vendor.resolveComponent("uv-popup");
  (_easycom_uv_icon2 + _easycom_uv_navbar2 + _easycom_uv_button2 + _easycom_uv_empty2 + _easycom_uv_steps_item2 + _easycom_uv_steps2 + _easycom_uv_input2 + _easycom_uv_form_item2 + _easycom_uv_form2 + _easycom_uv_action_sheet2 + _easycom_uv_datetime_picker2 + _easycom_uv_popup2)();
}
const _easycom_uv_icon = () => "../../uni_modules/uv-icon/components/uv-icon/uv-icon.js";
const _easycom_uv_navbar = () => "../../uni_modules/uv-navbar/components/uv-navbar/uv-navbar.js";
const _easycom_uv_button = () => "../../uni_modules/uv-button/components/uv-button/uv-button.js";
const _easycom_uv_empty = () => "../../uni_modules/uv-empty/components/uv-empty/uv-empty.js";
const _easycom_uv_steps_item = () => "../../uni_modules/uv-steps/components/uv-steps-item/uv-steps-item.js";
const _easycom_uv_steps = () => "../../uni_modules/uv-steps/components/uv-steps/uv-steps.js";
const _easycom_uv_input = () => "../../uni_modules/uv-input/components/uv-input/uv-input.js";
const _easycom_uv_form_item = () => "../../uni_modules/uv-form/components/uv-form-item/uv-form-item.js";
const _easycom_uv_form = () => "../../uni_modules/uv-form/components/uv-form/uv-form.js";
const _easycom_uv_action_sheet = () => "../../uni_modules/uv-action-sheet/components/uv-action-sheet/uv-action-sheet.js";
const _easycom_uv_datetime_picker = () => "../../uni_modules/uv-datetime-picker/components/uv-datetime-picker/uv-datetime-picker.js";
const _easycom_uv_popup = () => "../../uni_modules/uv-popup/components/uv-popup/uv-popup.js";
if (!Math) {
  (_easycom_uv_icon + _easycom_uv_navbar + _easycom_uv_button + _easycom_uv_empty + _easycom_uv_steps_item + _easycom_uv_steps + _easycom_uv_input + _easycom_uv_form_item + _easycom_uv_form + _easycom_uv_action_sheet + _easycom_uv_datetime_picker + _easycom_uv_popup + navBar)();
}
const navBar = () => "../../components/navBar.js";
const _sfc_main = {
  __name: "index",
  setup(__props) {
    const {
      t,
      locale
    } = common_vendor.useI18n();
    const isWeChatMiniProgram = common_vendor.ref(false);
    common_vendor.onMounted(() => {
      isWeChatMiniProgram.value = true;
    });
    const popupRefs = common_vendor.ref();
    const openPopup = () => {
      popupRefs.value.open();
    };
    const closePopup = () => {
      popupRefs.value.close();
    };
    const detailRefs = common_vendor.ref();
    const detailData = common_vendor.ref();
    const openDetail = (item) => {
      const data = {
        id: item.id
      };
      api_appointment.appointmentDetails(data).then((res) => {
        if (res.code === 0) {
          detailData.value = res.data;
          console.log("details", detailData.value);
          detailRefs.value.open();
        }
      }).catch((err) => {
        console.error(err);
      });
    };
    const deleteAppointment = (id) => {
      console.log(id);
      const data = {
        ids: [id]
      };
      api_appointment.cancelAppointment(data).then((res) => {
        if (res.code === 0) {
          common_vendor.index.showToast({
            title: t("appointment.appointmentCancelled"),
            icon: "none",
            duration: 2e3
          });
          detailRefs.value.close();
          getAppointmentData();
        }
      }).catch((err) => {
        console.error(err);
      });
    };
    const now = Date.now();
    const oneMonthLater = (/* @__PURE__ */ new Date()).setMonth((/* @__PURE__ */ new Date()).getMonth() + 1);
    const bookingDate = common_vendor.ref();
    const model1 = common_vendor.reactive({
      userInfo: {
        name: "",
        mobile: "",
        sex: "",
        sexValue: 0,
        idCard: "",
        age: null,
        appointmentTime: null,
        symptoms: "",
        remarks: ""
      }
    });
    const appointmentList = common_vendor.ref([]);
    const stepsList = [
      {
        title: t("appointment.pending"),
        value: 1,
        error: false
      },
      {
        title: t("appointment.confirmed"),
        value: 2,
        error: true
      },
      {
        title: t("appointment.completed"),
        value: 3,
        error: true
      },
      {
        title: t("appointment.expired"),
        value: 4,
        error: false
      }
      // {
      // 	title: t('appointment.expired'),
      // 	value: 5,
      // 	error: false
      // },
    ];
    const rules = {
      "userInfo.name": {
        type: "string",
        required: true,
        message: t("appointment.fillName"),
        trigger: ["blur", "change"]
      },
      "userInfo.mobile": {
        type: "number",
        required: true,
        min: 8,
        max: 15,
        message: t("appointment.correctPhone"),
        trigger: ["blur", "change"]
      },
      "userInfo.sex": {
        type: "string",
        max: 1,
        required: true,
        message: t("appointment.selectGenderOption"),
        trigger: ["blur", "change"]
      },
      "userInfo.age": {
        type: "number",
        required: true,
        message: t("appointment.fillAge"),
        trigger: ["blur", "change"]
      },
      "userInfo.appointmentTime": {
        type: "string",
        required: true,
        message: t("appointment.selectDateTimeOption"),
        trigger: ["blur", "change"]
      }
    };
    const actions = [
      {
        name: t("appointment.male"),
        value: 1
      },
      {
        name: t("appointment.female"),
        value: 2
      }
    ];
    const form = common_vendor.ref(null);
    const sexSelectRefs = common_vendor.ref(null);
    const datetimePicker = common_vendor.ref(null);
    const timePicker = common_vendor.ref(null);
    const userId = common_vendor.ref("");
    if (utils_cache.Cache.has(config_cache.LOGIN_STATUS, false)) {
      common_vendor.index.getStorage({
        key: "USER_INFO",
        success: function(res) {
          userId.value = res.data.userId;
          console.log(userId.value);
        },
        fail: function(err) {
          console.error("获取 USER_INFO 失败:", err);
        }
      });
    }
    const submit = () => {
      form.value.validate().then((res) => {
        common_vendor.index.showToast({
          icon: "success",
          title: t("appointment.validationPassed")
        });
        const data = {
          patientName: model1.userInfo.name,
          phoneNumber: model1.userInfo.mobile,
          idCard: model1.userInfo.idCard,
          gender: model1.userInfo.sexValue,
          age: Number(model1.userInfo.age),
          appointmentTime: bookingDate.value,
          symptoms: model1.userInfo.symptoms,
          remarks: model1.userInfo.remarks,
          userId: userId.value,
          id: "1"
        };
        api_appointment.createAppointment(data).then((res2) => {
          if (res2.code === 0) {
            console.log(res2);
            common_vendor.index.showToast({
              title: t("appointment.success"),
              icon: "none",
              duration: 2e3
            });
            closePopup();
            getAppointmentData();
          }
        }).catch((err) => {
          console.error(err);
        });
      }).catch((errors) => {
        common_vendor.index.showToast({
          icon: "error",
          title: t("appointment.validationFailed")
        });
      });
    };
    const changePopup = (e) => {
      if (!e.show) {
        form.value.resetFields();
        form.value.clearValidate();
      }
    };
    const showSexSelect = () => {
      sexSelectRefs.value.open();
      hideKeyboard();
    };
    const sexSelect = (e) => {
      model1.userInfo.sex = e.name;
      model1.userInfo.sexValue = e.value;
      console.log(model1.userInfo.sex);
      form.value.validateField("userInfo.sex", (err) => {
      });
    };
    const hideKeyboard = () => {
      common_vendor.index.hideKeyboard();
    };
    const showDataPicker = () => {
      datetimePicker.value.open();
    };
    const showTimePicker = () => {
      timePicker.value.open();
    };
    const confirmDate = (e) => {
      console.log(e);
      bookingDate.value = e.value;
      showTimePicker();
    };
    const confirmTime = (e) => {
      console.log(e);
      const dateTimestamp = bookingDate.value;
      const timeString = e.value;
      if (!dateTimestamp || !timeString) {
        console.error("日期或时间数据不完整");
        return;
      }
      const date = new Date(dateTimestamp);
      const year = date.getFullYear();
      const month = date.getMonth();
      const day = date.getDate();
      const localDate = new Date(year, month, day);
      const [hours, minutes] = timeString.split(":").map(Number);
      localDate.setHours(hours, minutes);
      bookingDate.value = localDate.getTime();
      model1.userInfo.appointmentTime = localDate.toLocaleString();
      console.log("合并后的时间戳:", bookingDate.value);
      console.log("合并后的时间:", model1.userInfo.appointmentTime);
    };
    const filter = (type, options) => {
      if (type === "minute") {
        return options.filter((minute) => [0, 10, 20, 30, 40, 50].includes(Number(minute)));
      }
      return options;
    };
    const getAppointmentData = () => {
      const data = {
        page: 1,
        pageSize: 50
      };
      api_appointment.getAppointmentList(data).then((res) => {
        if (res.code === 0) {
          appointmentList.value = res.data.data;
          console.log(res.data.data);
        }
      }).catch((err) => {
        console.error(err);
      });
    };
    function formatToDate(timestamp) {
      const date = new Date(timestamp);
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");
      return `${year}-${month}-${day}`;
    }
    function formatToTime(timestamp) {
      const date = new Date(timestamp);
      const hours = String(date.getHours()).padStart(2, "0");
      const minutes = String(date.getMinutes()).padStart(2, "0");
      return `${hours}:${minutes}`;
    }
    function getStatusFromStepsList(status) {
      const step = stepsList.find((s) => s.value === status);
      return step ? step.title : "未知状态";
    }
    function getStatusClass(status) {
      return `status-${status}`;
    }
    common_vendor.onShow(() => {
      getAppointmentData();
    });
    return (_ctx, _cache) => {
      var _a, _b;
      return common_vendor.e({
        a: !isWeChatMiniProgram.value
      }, !isWeChatMiniProgram.value ? {
        b: common_vendor.o(($event) => openPopup()),
        c: common_vendor.p({
          name: "calendar",
          size: "28"
        })
      } : {}, {
        d: common_vendor.o(($event) => isWeChatMiniProgram.value && openPopup()),
        e: common_vendor.p({
          title: common_vendor.unref(t)("appointment.booking"),
          placeholder: true,
          leftIcon: isWeChatMiniProgram.value ? "calendar" : ""
        }),
        f: ((_a = appointmentList.value) == null ? void 0 : _a.length) === 0 || appointmentList.value === null
      }, ((_b = appointmentList.value) == null ? void 0 : _b.length) === 0 || appointmentList.value === null ? {
        g: common_vendor.o(($event) => openPopup()),
        h: common_vendor.p({
          type: "success",
          size: "large",
          text: common_vendor.unref(t)("appointment.bookNow")
        }),
        i: common_vendor.p({
          mode: "history",
          textSize: "18",
          text: common_vendor.unref(t)("appointment.noRecord"),
          width: "200",
          height: "200"
        })
      } : {}, {
        j: common_vendor.f(appointmentList.value, (item, index, i0) => {
          return {
            a: "4c62b072-4-" + i0,
            b: common_vendor.t(formatToDate(item.appointmentTime)),
            c: "4c62b072-5-" + i0,
            d: common_vendor.t(formatToTime(item.appointmentTime)),
            e: common_vendor.f(stepsList, (data, stepIndex, i1) => {
              return {
                a: stepIndex,
                b: "4c62b072-7-" + i0 + "-" + i1 + "," + ("4c62b072-6-" + i0),
                c: common_vendor.p({
                  id: "bookingItems",
                  customStyle: "text-align: center;",
                  title: data.title
                })
              };
            }),
            f: "4c62b072-6-" + i0,
            g: common_vendor.p({
              current: item.status - 1
            }),
            h: common_vendor.o(($event) => openDetail(item))
          };
        }),
        k: common_vendor.p({
          name: "calendar"
        }),
        l: common_vendor.p({
          name: "clock"
        }),
        m: common_vendor.o(($event) => model1.userInfo.name = $event),
        n: common_vendor.p({
          border: "none",
          modelValue: model1.userInfo.name
        }),
        o: common_vendor.p({
          label: common_vendor.unref(t)("appointment.name"),
          prop: "userInfo.name",
          ["border-bottom"]: true,
          required: true
        }),
        p: common_vendor.o(($event) => model1.userInfo.mobile = $event),
        q: common_vendor.p({
          border: "none",
          type: "number",
          maxlength: 15,
          modelValue: model1.userInfo.mobile
        }),
        r: common_vendor.p({
          label: common_vendor.unref(t)("appointment.phone"),
          prop: "userInfo.mobile",
          ["border-bottom"]: true,
          required: true
        }),
        s: common_vendor.o(($event) => model1.userInfo.sex = $event),
        t: common_vendor.p({
          disabled: true,
          ["disabled-color"]: "#ffffff",
          placeholder: common_vendor.unref(t)("appointment.selectGender"),
          border: "none",
          modelValue: model1.userInfo.sex
        }),
        v: common_vendor.p({
          name: "arrow-right"
        }),
        w: common_vendor.o(showSexSelect),
        x: common_vendor.p({
          label: common_vendor.unref(t)("appointment.gender"),
          prop: "userInfo.sex",
          ["border-bottom"]: true,
          required: true
        }),
        y: common_vendor.o(($event) => model1.userInfo.idCard = $event),
        z: common_vendor.p({
          border: "none",
          maxlength: 20,
          type: "number",
          modelValue: model1.userInfo.idCard
        }),
        A: common_vendor.p({
          label: common_vendor.unref(t)("appointment.idCard"),
          prop: "userInfo.idCard",
          ["border-bottom"]: true
        }),
        B: common_vendor.o(($event) => model1.userInfo.age = $event),
        C: common_vendor.p({
          border: "none",
          maxlength: 3,
          type: "number",
          modelValue: model1.userInfo.age
        }),
        D: common_vendor.p({
          label: common_vendor.unref(t)("appointment.age"),
          prop: "userInfo.age",
          ["border-bottom"]: true,
          required: true
        }),
        E: common_vendor.o(($event) => model1.userInfo.appointmentTime = $event),
        F: common_vendor.p({
          disabled: true,
          ["disabled-color"]: "#ffffff",
          placeholder: common_vendor.unref(t)("appointment.selectDateTime"),
          border: "none",
          modelValue: model1.userInfo.appointmentTime
        }),
        G: common_vendor.p({
          name: "arrow-right"
        }),
        H: common_vendor.o(showDataPicker),
        I: common_vendor.p({
          label: common_vendor.unref(t)("appointment.dateTime"),
          prop: "userInfo.appointmentTime",
          ["border-bottom"]: true,
          required: true
        }),
        J: common_vendor.o(($event) => model1.userInfo.symptoms = $event),
        K: common_vendor.p({
          border: "none",
          modelValue: model1.userInfo.symptoms
        }),
        L: common_vendor.p({
          label: common_vendor.unref(t)("appointment.symptoms"),
          prop: "userInfo.symptoms",
          ["border-bottom"]: true
        }),
        M: common_vendor.o(($event) => model1.userInfo.remarks = $event),
        N: common_vendor.p({
          border: "none",
          modelValue: model1.userInfo.remarks
        }),
        O: common_vendor.p({
          label: common_vendor.unref(t)("appointment.remarks"),
          prop: "userInfo.remarks",
          ["border-bottom"]: true
        }),
        P: common_vendor.o(submit),
        Q: common_vendor.p({
          type: "primary",
          text: common_vendor.unref(t)("appointment.submit"),
          ["custom-style"]: "margin-top: 10px"
        }),
        R: common_vendor.sr(form, "4c62b072-9,4c62b072-8", {
          "k": "form"
        }),
        S: common_vendor.p({
          ["label-position"]: "left",
          model: model1,
          rules,
          labelPosition: "top",
          labelWidth: "250rpx"
        }),
        T: common_vendor.sr(sexSelectRefs, "4c62b072-29,4c62b072-8", {
          "k": "sexSelectRefs"
        }),
        U: common_vendor.o(sexSelect),
        V: common_vendor.p({
          actions,
          title: common_vendor.unref(t)("appointment.selectGender")
        }),
        W: common_vendor.sr(datetimePicker, "4c62b072-30,4c62b072-8", {
          "k": "datetimePicker"
        }),
        X: common_vendor.o(confirmDate),
        Y: common_vendor.p({
          mode: "date",
          minDate: common_vendor.unref(now),
          maxDate: common_vendor.unref(oneMonthLater),
          cancelText: common_vendor.unref(t)("uni.showModal.cancel"),
          confirmText: common_vendor.unref(t)("uni.showModal.confirm")
        }),
        Z: common_vendor.sr(timePicker, "4c62b072-31,4c62b072-8", {
          "k": "timePicker"
        }),
        aa: common_vendor.o(confirmTime),
        ab: common_vendor.p({
          mode: "time",
          minHour: 9,
          maxHour: 20,
          filter,
          cancelText: common_vendor.unref(t)("uni.showModal.cancel"),
          confirmText: common_vendor.unref(t)("uni.showModal.confirm")
        }),
        ac: common_vendor.sr(popupRefs, "4c62b072-8", {
          "k": "popupRefs"
        }),
        ad: common_vendor.o(changePopup),
        ae: common_vendor.p({
          mode: "bottom",
          ["close-on-click-overlay"]: false,
          closeable: true,
          round: 20
        }),
        af: detailData.value != null
      }, detailData.value != null ? common_vendor.e({
        ag: common_vendor.t(common_vendor.unref(t)("appointment.appointmentDetails")),
        ah: common_vendor.t(common_vendor.unref(t)("appointment.name")),
        ai: common_vendor.t(detailData.value.patientName),
        aj: common_vendor.t(common_vendor.unref(t)("appointment.phone")),
        ak: common_vendor.t(detailData.value.phoneNumber),
        al: common_vendor.t(common_vendor.unref(t)("appointment.gender")),
        am: common_vendor.t(detailData.value.gender === 1 ? common_vendor.unref(t)("appointment.male") : common_vendor.unref(t)("appointment.female")),
        an: common_vendor.t(common_vendor.unref(t)("appointment.age")),
        ao: common_vendor.t(detailData.value.age),
        ap: common_vendor.t(common_vendor.unref(t)("appointment.year")),
        aq: common_vendor.t(common_vendor.unref(t)("appointment.dateTime")),
        ar: common_vendor.t(formatToDate(detailData.value.appointmentTime)),
        as: common_vendor.t(formatToTime(detailData.value.appointmentTime)),
        at: common_vendor.t(common_vendor.unref(t)("appointment.symptoms")),
        av: common_vendor.t(detailData.value.symptoms || common_vendor.unref(t)("appointment.noData")),
        aw: common_vendor.t(common_vendor.unref(t)("appointment.remarks")),
        ax: common_vendor.t(detailData.value.remarks || common_vendor.unref(t)("appointment.noData")),
        ay: common_vendor.t(common_vendor.unref(t)("appointment.status")),
        az: common_vendor.t(getStatusFromStepsList(detailData.value.status)),
        aA: common_vendor.n(getStatusClass(detailData.value.status)),
        aB: [1, 2].includes(detailData.value.status)
      }, [1, 2].includes(detailData.value.status) ? {
        aC: common_vendor.t(common_vendor.unref(t)("appointment.cancelAppointment")),
        aD: common_vendor.o(($event) => deleteAppointment(detailData.value.id))
      } : {}) : {}, {
        aE: common_vendor.sr(detailRefs, "4c62b072-32", {
          "k": "detailRefs"
        }),
        aF: common_vendor.p({
          mode: "bottom",
          ["close-on-click-overlay"]: false,
          closeable: true,
          round: 20
        }),
        aG: common_vendor.p({
          activeIndex: 1
        })
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "C:/Users/Aibol/Desktop/work/host/pages/appointment/index.vue"]]);
wx.createPage(MiniProgramPage);
