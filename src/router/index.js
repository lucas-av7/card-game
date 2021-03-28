import Vue from "vue";
import VueRouter from "vue-router";
import Home from "@/views/Home.vue";
import NewDeck from "@/views/NewDeck.vue";
import ViewDeck from "@/views/ViewDeck.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/new-deck",
    name: "NewDeck",
    component: NewDeck,
  },
  {
    path: "/view-deck/:id",
    name: "ViewDeck",
    component: ViewDeck,
    props: true,
  },
  {
    path: "/edit-deck/:id",
    name: "EditDeck",
    component: NewDeck,
    props: true,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
