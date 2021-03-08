(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-bc334d4c"],{1799:function(t,a,e){"use strict";var s=function(){var t=this,a=t.$createElement,e=t._self._c||a;return t.pagination?e("nav",{attrs:{"aria-label":"Page navigation mt-5"}},[e("ul",{staticClass:"pagination justify-content-center"},[e("li",{staticClass:"page-item",class:{disabled:!t.pagination.has_pre}},[e("a",{staticClass:"page-link",attrs:{href:"#","aria-label":"Previous"},on:{click:function(a){return a.preventDefault(),t.changePage(t.pagination.current_page-1)}}},[e("span",{attrs:{"aria-hidden":"true"}},[t._v("«")])])]),t._l(t.pagination.total_pages,(function(a,s){return e("li",{key:s,staticClass:"page-item",class:{active:a===t.pagination.current_page}},[a!==t.pagination.current_page?e("a",{staticClass:"page-link",attrs:{href:"#"},on:{click:function(e){return e.preventDefault(),t.changePage(a)}}},[t._v(t._s(a))]):t._e(),a===t.pagination.current_page?e("span",{staticClass:"page-link"},[t._v(" "+t._s(a)+" "),e("span",{staticClass:"sr-only"},[t._v("(current)")])]):t._e()])})),e("li",{staticClass:"page-item",class:{disabled:!t.pagination.has_next}},[e("a",{staticClass:"page-link",attrs:{href:"#","aria-label":"Next"},on:{click:function(a){return a.preventDefault(),t.changePage(t.pagination.current_page+1)}}},[e("span",{attrs:{"aria-hidden":"true"}},[t._v("»")])])])],2)]):t._e()},n=[],o={name:"Pagination",props:{pagination:Object},methods:{changePage:function(t){this.$emit("changePage",t)}}},i=o,l=e("2877"),r=Object(l["a"])(i,s,n,!1,null,null,null);a["a"]=r.exports},"6ff1":function(t,a,e){"use strict";var s=function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",{staticClass:"modal fade",attrs:{id:"delModal",tabindex:"-1",role:"dialog","aria-labelledby":"delModalLabel","aria-hidden":"true"}},[e("div",{staticClass:"modal-dialog",attrs:{role:"document"}},[e("div",{staticClass:"modal-content border-0"},[t._m(0),e("div",{staticClass:"modal-body"},[t._v(" 是否刪除 "),e("strong",{staticClass:"text-danger"},[t._v(t._s(t.data.title))]),t._v(" 商品(刪除後將無法恢復)。 ")]),e("div",{staticClass:"modal-footer"},[e("button",{staticClass:"btn btn-outline-secondary",attrs:{type:"button","data-dismiss":"modal"}},[t._v("取消")]),e("button",{staticClass:"btn btn-danger",class:{disabled:t.status.confirmLoading},attrs:{type:"button"},on:{click:function(a){return t.delData()}}},[t.status.confirmLoading?e("i",{staticClass:"fas fa-spinner fa-spin"}):t._e(),t._v(" 確認刪除 ")])])])])])},n=[function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",{staticClass:"modal-header bg-danger text-white"},[e("h5",{staticClass:"modal-title",attrs:{id:"delModalLabel"}},[e("span",[t._v("刪除產品")])]),e("button",{staticClass:"close text-white",attrs:{type:"button","data-dismiss":"modal","aria-label":"Close"}},[e("span",{attrs:{"aria-hidden":"true"}},[t._v("×")])])])}],o=(e("99af"),e("1157")),i=e.n(o),l={name:"DelModel",props:{data:Object,type:String},data:function(){return{status:{confirmLoading:!1}}},methods:{delData:function(){var t=this,a=this,e="".concat("https://vue-course-api.hexschool.io/","api/").concat("chin","/admin/").concat(a.type,"/").concat(a.data.id);a.status.confirmLoading=!0,a.$http.delete(e).then((function(e){a.status.confirmLoading=!1,i()("#delModal").modal("hide"),e.data.success?a.$emit("delData"):t.$store.dispatch("alertModules/updateMessage",e.data)}))}}},r=l,c=e("2877"),d=Object(c["a"])(r,s,n,!1,null,null,null);a["a"]=d.exports},e532:function(t,a,e){"use strict";e.r(a);var s=function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",{staticClass:"px-3"},[e("div",{staticClass:"text-right my-3"},[e("button",{staticClass:"btn btn-sm btn-primary",attrs:{type:"button"},on:{click:function(a){return t.showCouponModal(!0)}}},[t._v("建立新的優惠券")])]),e("table",{staticClass:"table table-hover"},[t._m(0),e("tbody",t._l(t.data.coupons,(function(a){return e("tr",{key:a.id,on:{click:function(e){return t.showCouponModal(!1,a)}}},[e("td",[t._v(t._s(a.title))]),e("td",[t._v(t._s(a.percent)+" %")]),e("td",[t._v(t._s(a.due_date))]),e("td",{staticClass:"d-none d-sm-table-cell"},[a.is_enabled?e("span",{staticClass:"text-success"},[t._v("啟用")]):t._e(),a.is_enabled?t._e():e("span",{staticClass:"text-danger"},[t._v("未啟用")])]),e("td",{staticClass:"p-0"},[e("a",{staticClass:"d-block text-danger p-3",attrs:{href:"#"},on:{click:function(e){return e.stopPropagation(),t.delCouponModal(a)}}},[e("i",{staticClass:"fas fa-lg fa-minus-circle"}),e("span",{staticClass:"sr-only"},[t._v("刪除")])])])])})),0)]),e("div",{staticClass:"modal fade",attrs:{id:"couponModal",tabindex:"-1","aria-labelledby":"couponModalLabel","aria-hidden":"true"}},[e("div",{staticClass:"modal-dialog"},[e("div",{staticClass:"modal-content border-0"},[e("div",{staticClass:"modal-header bg-primary text-white"},[e("h5",{staticClass:"modal-title",attrs:{id:"couponModalLabel"}},[t._v(" "+t._s(t.isNew?"新增優惠券":"修改優惠券")+" ")]),t._m(1)]),e("ValidationObserver",{scopedSlots:t._u([{key:"default",fn:function(a){var s=a.handleSubmit,n=a.reset;return[e("form",{attrs:{id:"couponForm"},on:{submit:function(a){return a.preventDefault(),s(t.editCoupon)},reset:function(t){return t.preventDefault(),n(t)}}},[e("div",{staticClass:"modal-body"},[e("ValidationProvider",{staticClass:"form-group",attrs:{tag:"div",name:"標題",rules:"required"},scopedSlots:t._u([{key:"default",fn:function(a){var s=a.errors,n=a.classes;return[e("label",{attrs:{for:"title"}},[t._v("標題")]),e("input",{directives:[{name:"model",rawName:"v-model",value:t.newCoupon.title,expression:"newCoupon.title"}],staticClass:"form-control",class:n,attrs:{type:"text",id:"title"},domProps:{value:t.newCoupon.title},on:{input:function(a){a.target.composing||t.$set(t.newCoupon,"title",a.target.value)}}}),e("span",{staticClass:"invalid-feedback"},[t._v(t._s(s[0]))])]}}],null,!0)}),e("ValidationProvider",{staticClass:"form-group",attrs:{tag:"div",name:"優惠碼",rules:"required"},scopedSlots:t._u([{key:"default",fn:function(a){var s=a.errors,n=a.classes;return[e("label",{attrs:{for:"code"}},[t._v("優惠碼")]),e("input",{directives:[{name:"model",rawName:"v-model",value:t.newCoupon.code,expression:"newCoupon.code"}],staticClass:"form-control",class:n,attrs:{type:"text",id:"code"},domProps:{value:t.newCoupon.code},on:{input:function(a){a.target.composing||t.$set(t.newCoupon,"code",a.target.value)}}}),e("span",{staticClass:"invalid-feedback"},[t._v(t._s(s[0]))])]}}],null,!0)}),e("ValidationProvider",{staticClass:"form-group",attrs:{tag:"div",name:"到期日",rules:"required"},scopedSlots:t._u([{key:"default",fn:function(a){var s=a.errors,n=a.classes;return[e("label",{attrs:{for:"due_date"}},[t._v("到期日")]),e("input",{directives:[{name:"model",rawName:"v-model",value:t.newCoupon.due_date,expression:"newCoupon.due_date"}],staticClass:"form-control",class:n,attrs:{type:"date",id:"due_date"},domProps:{value:t.newCoupon.due_date},on:{input:function(a){a.target.composing||t.$set(t.newCoupon,"due_date",a.target.value)}}}),e("span",{staticClass:"invalid-feedback"},[t._v(t._s(s[0]))])]}}],null,!0)}),e("ValidationProvider",{staticClass:"form-group",attrs:{tag:"div",name:"折扣百分比",rules:"required|min:0|max:100"},scopedSlots:t._u([{key:"default",fn:function(a){var s=a.errors,n=a.classes;return[e("label",{attrs:{for:"percent"}},[t._v("折扣百分比")]),e("input",{directives:[{name:"model",rawName:"v-model",value:t.newCoupon.percent,expression:"newCoupon.percent"}],staticClass:"form-control",class:n,attrs:{type:"number",id:"percent",min:"0",max:"100"},domProps:{value:t.newCoupon.percent},on:{input:function(a){a.target.composing||t.$set(t.newCoupon,"percent",a.target.value)}}}),e("span",{staticClass:"invalid-feedback"},[t._v(t._s(s[0]))])]}}],null,!0)}),e("div",{staticClass:"form-group form-check"},[e("input",{directives:[{name:"model",rawName:"v-model",value:t.newCoupon.is_enabled,expression:"newCoupon.is_enabled"}],staticClass:"form-check-input",attrs:{type:"checkbox",id:"is_enabled"},domProps:{checked:Array.isArray(t.newCoupon.is_enabled)?t._i(t.newCoupon.is_enabled,null)>-1:t.newCoupon.is_enabled},on:{change:function(a){var e=t.newCoupon.is_enabled,s=a.target,n=!!s.checked;if(Array.isArray(e)){var o=null,i=t._i(e,o);s.checked?i<0&&t.$set(t.newCoupon,"is_enabled",e.concat([o])):i>-1&&t.$set(t.newCoupon,"is_enabled",e.slice(0,i).concat(e.slice(i+1)))}else t.$set(t.newCoupon,"is_enabled",n)}}}),e("label",{staticClass:"form-check-label",attrs:{for:"is_enabled"}},[t._v("是否啟用")])])],1),e("div",{staticClass:"modal-footer"},[e("button",{staticClass:"btn btn-secondary",attrs:{type:"button","data-dismiss":"modal"}},[t._v("取消")]),e("button",{staticClass:"btn btn-primary",class:{disabled:t.status.confirmLoading},attrs:{type:"submit"}},[t.status.confirmLoading?e("i",{staticClass:"fas fa-spinner fa-spin"}):t._e(),t._v(" 確認 ")])])])]}}])})],1)])]),e("del-modal",{attrs:{data:t.delCoupon,type:"coupon"},on:{delData:t.getCoupons}}),e("pagination",{attrs:{pagination:t.data.pagination},on:{changePage:t.getCoupons}})],1)},n=[function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("thead",[e("tr",[e("th",{attrs:{scope:"col"}},[t._v("名稱")]),e("th",{attrs:{scope:"col",width:"150"}},[t._v("折扣百分比")]),e("th",{attrs:{scope:"col",width:"150"}},[t._v("到期日")]),e("th",{staticClass:"d-none d-sm-table-cell",attrs:{scope:"col",width:"150"}},[t._v("是否啟用")]),e("th",{attrs:{scope:"col",width:"50"}})])])},function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("button",{staticClass:"close text-white",attrs:{type:"button","data-dismiss":"modal","aria-label":"Close"}},[e("span",{attrs:{"aria-hidden":"true"}},[t._v("×")])])}],o=e("5530"),i=(e("99af"),e("1157")),l=e.n(i),r=e("6ff1"),c=e("1799"),d={name:"Coupons",data:function(){return{isNew:!1,status:{confirmLoading:!1},data:{},newCoupon:{},delCoupon:{}}},methods:{getCoupons:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:1,a=this,e="".concat("https://vue-course-api.hexschool.io/","api/").concat("chin","/admin/coupons?page=:").concat(t);a.$store.commit("ISLOADING",!0),a.$http.get(e).then((function(t){a.$store.commit("ISLOADING",!1),t.data.success?a.data=t.data:(a.$router.push("/signin"),a.$store.dispatch("alertModules/updateMessage",t.data))}))},showCouponModal:function(t,a){this.newCoupon=t?{}:Object(o["a"])({},a),this.isNew=t,l()("#couponModal").modal("show")},editCoupon:function(){var t=this,a="".concat("https://vue-course-api.hexschool.io/","api/").concat("chin","/admin/coupon"),e="post",s=1;t.isNew||(a="".concat("https://vue-course-api.hexschool.io/","api/").concat("chin","/admin/coupon/").concat(t.newCoupon.id),e="put",s=t.data.pagination.current_page),t.status.confirmLoading=!0,t.$http[e](a,{data:t.newCoupon}).then((function(a){t.status.confirmLoading=!1,l()("#couponModal").modal("hide"),t.getCoupons(s),a.data.success||t.$store.dispatch("alertModules/updateMessage",a.data)}))},delCouponModal:function(t){this.delCoupon=t,l()("#delModal").modal("show")}},created:function(){this.getCoupons()},mounted:function(){l()("#couponModal").on("hidden.bs.modal",(function(){document.querySelector("#couponForm").reset()}))},components:{DelModal:r["a"],Pagination:c["a"]}},u=d,p=e("2877"),m=Object(p["a"])(u,s,n,!1,null,null,null);a["default"]=m.exports}}]);
//# sourceMappingURL=chunk-bc334d4c.1a9d5aab.js.map