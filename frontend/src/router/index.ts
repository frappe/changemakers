import { createRouter, createWebHistory } from "@ionic/vue-router"
import { RouteRecordRaw } from "vue-router"
import Home from "../views/Home.vue"
import accountRoutes from "./account"
import rescueRoutes from "./rescue"
import beneficiaryRoutes from "./beneficiary"
import entitlementRoutes from "./entitlement"
import awarenessCampRoutes from "./awarenessCamp"

const routes: Array<RouteRecordRaw> = [
	{
		name: "Home",
		path: "/",
		redirect: "/tabs/dashboard",
	},
	{
		path: "/tabs/",
		component: Home,
		children: [
			{
				path: "",
				redirect: "/tabs/dashboard",
			},
			{
				path: "dashboard",
				component: () => import("@/views/Dashboard.vue"),
			},
			{
				name: "MyAccountPage",
				path: "Account",
				component: () => import("@/views/Account.vue"),
			},
		],
	},
	...accountRoutes,
	...rescueRoutes,
	...beneficiaryRoutes,
	...entitlementRoutes,
	...awarenessCampRoutes,
]

const router = createRouter({
	history: createWebHistory("/c/"),
	routes,
})


export default router
