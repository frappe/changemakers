import { RouteRecordRaw } from "vue-router"
import RescueListPage from "@/views/rescue/List.vue"

const routes: Array<RouteRecordRaw> = [
	{
		name: "RescueList",
		path: "/rescue/list",
		component: RescueListPage,
	},
]

export default routes
