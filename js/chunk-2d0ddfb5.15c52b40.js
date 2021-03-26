(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d0ddfb5"],{8469:function(t,s,a){"use strict";a.r(s);var e=function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("main",[t.order.total?a("div",{staticClass:"row justify-content-center mt-sm-4 mt-3 u-fadeIn"},[a("div",{staticClass:"col-lg-8 mb-3"},[a("section",{staticClass:"card mb-3"},[a("a",{staticClass:"card-header px-sm-3 px-2 d-flex align-items-center",class:{"border-0":!t.isOpen},staticStyle:{cursor:"pointer"},attrs:{href:"#"},on:{click:function(s){return s.preventDefault(),t.toggleCarts()}}},[a("h3",{staticClass:"card-title h5 mb-0"},[t._v("購物車明細")]),a("i",{staticClass:"fas fa-chevron-down p-rotate180 ml-auto",class:{active:t.isOpen}})]),a("div",{staticClass:"js-cart u-fz-sm",staticStyle:{display:"none"}},[t._m(0),t._l(t.order.products,(function(s,e){return a("div",{key:e,staticClass:"p-checkout__grid py-2"},[a("div",{staticClass:"p-checkout__grid__title"},[a("div",{staticClass:"p-cart__img",style:{"background-image":"url("+s.product.imageUrl+")"}}),a("h5",{staticClass:"h6"},[t._v(t._s(s.product.title))])]),a("div",{staticClass:"p-checkout__grid__price"},[a("span",[t._v("NT"+t._s(t._f("currency")(s.product.price)))]),a("br"),s.product.price!==s.product.origin_price?a("del",{staticClass:"u-fz-sm text-muted"},[t._v(" NT"+t._s(t._f("currency")(s.product.origin_price))+" ")]):t._e()]),a("div",{staticClass:"p-checkout__grid__qty text-sm-center"},[a("span",{staticClass:"d-sm-none"},[t._v("數量：")]),t._v(t._s(s.qty)+" ")]),a("div",{staticClass:"p-checkout__grid__total"},[t._v(" NT"+t._s(t._f("currency")(s.total))+" ")])])})),a("div",{staticClass:"p-checkout__grid py-1 border-0"},[a("div",{staticClass:"p-checkout__grid__qty text-sm-center"},[t._v(" 小計 ")]),a("div",{staticClass:"p-checkout__grid__total"},[t._v(" NT"+t._s(t._f("currency")(t.cartTotal))+" ")])]),a("div",{staticClass:"p-checkout__grid text-success py-1 border-0",class:{"d-none":t.cartTotal===t.order.total}},[a("div",{staticClass:"p-checkout__grid__qty text-sm-center"},[t._v(" 折扣 ")]),a("div",{staticClass:"p-checkout__grid__total"},[t._v(" -NT"+t._s(t._f("currency")(t.cartTotal-Math.round(t.order.total)))+" ")])]),t._m(1),a("div",{staticClass:"p-checkout__grid py-2 border-0",class:{"text-success":t.cartTotal!==t.order.total}},[a("b",{staticClass:"p-checkout__grid__qty text-sm-center"},[t._v(" 總計 ")]),a("b",{staticClass:"p-checkout__grid__total"},[t._v(" NT"+t._s(t._f("currency")(Math.round(t.order.total)))+" ")])])],2)]),a("section",{staticClass:"card"},[t._m(2),a("table",{staticClass:"table table-borderless mb-0"},[a("tbody",[a("tr",[a("th",{staticClass:" px-sm-3 px-2",attrs:{scope:"row",width:"150"}},[t._v("成立時間")]),a("td",[t._v(t._s(t._f("timestamp")(t.order.create_at)))])]),a("tr",[a("th",{staticClass:" px-sm-3 px-2",attrs:{scope:"row"}},[t._v("收件人姓名")]),a("td",[t._v(t._s(t.order.user.name))])]),a("tr",[a("th",{staticClass:" px-sm-3 px-2",attrs:{scope:"row"}},[t._v("收件人手機號碼")]),a("td",[t._v(t._s(t.order.user.tel))])]),a("tr",[a("th",{staticClass:" px-sm-3 px-2",attrs:{scope:"row"}},[t._v("收件人地址")]),a("td",[t._v(t._s(t.order.user.address))])]),t.order.message?a("tr",[a("th",{staticClass:"px-sm-3 px-2",attrs:{scope:"row"}},[t._v("備註")]),a("td",[t._v(t._s(t.order.message))])]):t._e(),a("tr",[a("th",{staticClass:" px-sm-3 px-2",attrs:{scope:"row"}},[t._v("付款狀態")]),a("td",[t.order.is_paid?a("span",{staticClass:"text-success"},[t._v("已付款")]):t._e(),a("span",{directives:[{name:"esle",rawName:"v-esle"}],staticClass:"text-danger"},[t._v("尚未付款")])])])])]),a("div",{staticClass:"d-flex px-sm-3 px-2 pt-2 pb-3"},[a("router-link",{staticClass:"btn btn-outline-info btn-block text-dark",attrs:{to:"/products"}},[t._v(" 繼續購物 ")]),t.order.is_paid?t._e():a("button",{staticClass:"btn btn-info btn-block mt-0 ml-3",class:{disabled:t.status.payLoading},attrs:{type:"button"},on:{click:function(s){return t.goPay()}}},[t._v("確認付款去 "),t.status.payLoading?a("i",{staticClass:"fas fa-spinner fa-spin ml-1"}):t._e()])],1)]),a("div",{staticClass:"modal fade",attrs:{id:"payModal",tabindex:"-1","aria-labelledby":"payModalLabel","aria-hidden":"true","data-backdrop":"static","data-keyboard":"false"}},[a("div",{staticClass:"modal-dialog modal-dialog-centered"},[a("div",{staticClass:"modal-content"},[a("div",{staticClass:"modal-body text-center"},[a("div",{staticClass:"success-animation"},[a("svg",{staticClass:"checkmark",attrs:{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 52 52"}},[a("circle",{staticClass:"checkmark__circle",attrs:{cx:"26",cy:"26",r:"25",fill:"none"}}),a("path",{staticClass:"checkmark__check",attrs:{fill:"none",d:"M14.1 27.2l7.1 7.2 16.7-16.8"}})])]),a("h5",{staticClass:"h3 font-weight-bold"},[t._v("付款成功！")])])])])])])]):t._e()])},c=[function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("div",{staticClass:"p-checkout__grid py-2 d-none d-sm-grid u-fz-sm"},[a("div",{staticClass:"p-checkout__grid__title"},[t._v("商品資料")]),a("div",{staticClass:"p-checkout__grid__price"},[t._v("單件價格")]),a("div",{staticClass:"p-checkout__grid__qty text-center"},[t._v("數量")]),a("div",{staticClass:"p-checkout__grid__total text-center"},[t._v("小計")])])},function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("div",{staticClass:"p-checkout__grid py-1"},[a("div",{staticClass:"p-checkout__grid__qty text-sm-center"},[t._v(" 運費 ")]),a("div",{staticClass:"p-checkout__grid__total"},[t._v(" NT$0 ")])])},function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("div",{staticClass:"card-header px-sm-3 px-2"},[a("h3",{staticClass:"card-title h5 mb-0"},[t._v("訂單資訊")])])}],r=(a("99af"),a("b0c0"),a("1157")),i=a.n(r),o={name:"CheckoutOrder",data:function(){return{isOpen:!1,status:{payLoading:!1},order:{}}},watch:{"$route.params":{handler:function(){this.getOrder(this.$route.params.id)},deep:!0,immediate:!0}},methods:{getOrder:function(t){var s=this,a="".concat("https://vue-course-api.hexschool.io/","api/").concat("chin","/order/").concat(t);s.$store.commit("ISLOADING",!0),s.$http.get(a).then((function(t){s.$store.commit("ISLOADING",!1),t.data.success&&t.data.order?s.order=t.data.order:(s.$router.push("/products"),s.$store.dispatch("alertModules/updateMessage",{message:"找不到訂單"}))}))},toggleCarts:function(){i()(".js-cart").slideToggle(),this.isOpen=!this.isOpen},goPay:function(){var t=this,s="".concat("https://vue-course-api.hexschool.io/","api/").concat("chin","/pay/").concat(t.order.id);t.status.payLoading=!0,t.$http.post(s).then((function(s){t.status.payLoading=!1,s.data.success?(i()("#payModal").modal("show"),setTimeout((function(){i()("#payModal").modal("hide"),t.$router.push("/products")}),5e3)):t.$store.dispatch("alertModules/updateMessage",s.data)}))}},computed:{cartTotal:function(){var t=0;for(var s in this.order.products)s&&(t+=this.order.products[s].total);return t}},mounted:function(){var t=this;i()(".p-checkout__item").eq(0).addClass("active"),i()(".p-checkout__item").eq(1).addClass("active"),t.$router.beforeEach((function(s,a,e){a.name===t.$route.name?(i()(".p-checkout__item").eq(0).removeClass("active"),i()(".p-checkout__item").eq(1).removeClass("active"),e()):e()}))}},d=o,l=a("2877"),_=Object(l["a"])(d,e,c,!1,null,null,null);s["default"]=_.exports}}]);
//# sourceMappingURL=chunk-2d0ddfb5.15c52b40.js.map