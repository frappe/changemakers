import { RouteRecordRaw } from "vue-router"
import LoginPage from "@/views/account/LoginPage.vue"

const routes: Array<RouteRecordRaw> = [
	{
		name: "Login",
		path: "/account/login",
        component: LoginPage
	},
]

export default routes
