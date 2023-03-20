"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  __name: "index",
  setup(__props) {
    let { title1 } = common_vendor.reactive({ title1: "hello world" });
    title1 += "12345";
    const title = common_vendor.ref("hello");
    common_vendor.onMounted(() => {
      console.log(title.value);
      console.log(title1);
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.t(common_vendor.unref(title1)),
        b: common_vendor.t(title.value),
        c: common_vendor.o((...args) => _ctx.jumpTo && _ctx.jumpTo(...args))
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "/Users/rightm/Desktop/HBuilder/uni-app-vue3/my-vue3-project/src/pages/index/index.vue"]]);
wx.createPage(MiniProgramPage);
