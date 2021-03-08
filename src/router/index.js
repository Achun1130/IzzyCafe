import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
  {
    path: '*',
    redirect: '/',
  },
  {
    name: '首頁',
    path: '/',
    component: () => import('../views/front/Home.vue'),
  },
  {
    name: '登入',
    path: '/signin',
    component: () => import('../views/front/Signin.vue'),
  },
  {
    path: '/admin',
    component: () => import('../components/Dashboard.vue'),
    children: [
      {
        name: '產品',
        path: 'products_list',
        component: () => import('../views/back/ProductsList.vue'),
        meta: {
          requiresAuth: true,
        },
      },
      {
        name: '訂單',
        path: 'orders',
        component: () => import('../views/back/Orders.vue'),
        meta: {
          requiresAuth: true,
        },
      },
      {
        name: '優惠券',
        path: 'coupons',
        component: () => import('../views/back/Coupons.vue'),
        meta: {
          requiresAuth: true,
        },
      },
    ],
  },
  {
    path: '/products',
    component: () => import('../components/ProductsLayout.vue'),
    children: [
      {
        name: '所有商品',
        path: '',
        component: () => import('../views/front/Products.vue'),
      },
      {
        name: '精選豆單',
        path: 'beans',
        component: () => import('../views/front/Products.vue'),
      },
      {
        name: '甜點品項',
        path: 'snacks',
        component: () => import('../views/front/Products.vue'),
      },
      {
        name: '禮盒專區',
        path: 'gifts',
        component: () => import('../views/front/Products.vue'),
      },
      {
        name: '搜尋',
        path: 'search',
        component: () => import('../views/front/Products.vue'),
      },
      {
        name: '單一商品',
        path: ':id',
        component: () => import('../views/front/ProductSingle.vue'),
      },
    ],
  },
  {
    path: '/checkout',
    component: () => import('../components/CheckoutLayout.vue'),
    children: [
      {
        name: '訂單結帳',
        path: '',
        component: () => import('../views/front/CheckoutCart.vue'),
      },
      {
        name: '填寫資料',
        path: 'info',
        component: () => import('../views/front/CheckoutInfo.vue'),
      },
      {
        name: '訂單確認',
        path: 'order/:id',
        component: () => import('../views/front/CheckoutOrder.vue'),
      },
    ],
  },
  {
    name: '門市資訊',
    path: '/location',
    component: () => import('../views/front/Location.vue'),
  },
];

const router = new VueRouter({
  routes,
  linkExactActiveClass: 'active',
  scrollBehavior() {
    return { x: 0, y: 0 };
  },
});

export default router;
