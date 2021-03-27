import Vue from "vue";
import VueRouter from "vue-router";

import Login from "../views/Login.vue";

// 题库管理
import Subject from "../views/topic/subject";
import Question from "../views/topic/question";
import QuestionType from "../views/topic/questionType";
import Knowledge from "../views/topic/knowledge";

// 系统管理
import Info from "../views/system/info";
import Notice from "../views/system/notice";
import User from "../views/system/user";

// 个人信息
import Personnal from "../views/Personnal";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Login",
    component: Login,
  },
  {
    path: "/home",
    name: "Home",
    component: () => import("../views/Home.vue"),
    children: [
      {
        path: "/home/subject",
        name: "Subject",
        component: Subject,
      },
      {
        path: "/home/question",
        name: "Question",
        component: Question,
      },
      {
        path: "/home/questionType",
        name: "QuestionType",
        component: QuestionType,
      },
      {
        path: "/home/knowledge",
        name: "Knowledge",
        component: Knowledge,
      },
      {
        path: "/home/user",
        name: "User",
        component: User,
      },
      {
        path: "/home/notice",
        name: "Notice",
        component: Notice,
      },
      {
        path: "/home/info",
        name: "Info",
        component: Info,
      },
      {
        path: "/home/personal",
        name: "Personnal",
        component: Personnal,
      },
    ],
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("../views/Login.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

// // 路由守卫
// router.beforeEach((to, from, next) => {
//   const isLogin = sessionStorage.getItem("isLogin") ? true : false;
//   if (to.path == "/login" || to.path == "/register" || to.path == "/index") {
//     next();
//   } else {
//     isLogin ? next() : next("/login");
//   }
// });

export default router;
