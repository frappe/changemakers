import { createRouter, createWebHistory } from "@ionic/vue-router"
import { RouteRecordRaw } from "vue-router"
import Home from "../views/Home.vue"
import { session } from "@/data/session"
import accountRoutes from "./account"
import { userResource } from "@/data/user"

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
				path: "Account",
				component: () => import("@/views/Account.vue"),
			},
		],
	},
	...accountRoutes,
]

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes,
})

router.beforeEach(async (to, from, next) => {
	let isLoggedIn = session.isLoggedIn
	try {
		await userResource.promise
	} catch (error) {
		isLoggedIn = false
	}

	if (to.name === "Login" && isLoggedIn) {
		next({ name: "Home" })
	} else if (to.name !== "Login" && !isLoggedIn) {
		next({ name: "Login" })
	} else {
		next()
	}
})

export default router
