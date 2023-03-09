import { RouteRecordRaw } from "vue-router"
import RescueListPage from "@/views/rescue/List.vue"
import RescueFormPage from "@/views/rescue/Form.vue"
import RescueFormView from "@/views/rescue/Form.vue"

const routes: Array<RouteRecordRaw> = [
	{
		name: "RescueList",
		path: "/rescues",
		component: RescueListPage,
	},
	{
		name: "NewRescueForm",
		path: "/rescues/new",
		component: RescueFormView,
	},
	{
		name: "RescueForm",
		path: "/rescues/:id",
		props: true,
		component: RescueFormPage,
	},
]

export default routes
