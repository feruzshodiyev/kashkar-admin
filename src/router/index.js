import Vue from "vue";
import VueRouter from "vue-router";
import mainNav from "./navigation";
import Main from "@/views/Main";
import store from "@/store";
import Auth from "@/views/Auth";

Vue.use(VueRouter);

const mainNavigation = [];

mainNav.forEach(item => {
  if (item.isSubmenu) {
    item.children.forEach(subItem => {
      mainNavigation.push(subItem);
    });
  } else {
    mainNavigation.push(item);
  }
});

const routes = [
  {
    path: "/",
    redirect: "/app"
  },
  {
    name: "Main",
    path: "/app",
    component: Main,
    beforeEnter: (to, from, next) => {
      if (store.state.accessToken) {
        if (to.path === "/app") {
          return next({ path: "/app/orders"});
        }
        next();
      } else {
        next("/auth");
      }
    },
    children: mainNavigation
  },
  {
    name: "Auth",
    path: "/auth",
    component: Auth,
    beforeEnter: (to, from, next) => {
      if (store.state.accessToken) {
        next({ path: "/" });
      } else {
        next();
      }
    }
  },
  // otherwise redirect to home
  { path: "*", redirect: "/" }
];

const router = new VueRouter({
  mode: "history",
  routes
});
export default router;
