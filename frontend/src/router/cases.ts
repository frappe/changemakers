import { RouteRecordRaw } from "vue-router"
import CaseListPage from "@/views/cases/List.vue"
import CaseDetailsView from "@/views/cases/Details.vue"
import CaseFormView from "@/views/cases/Form.vue"

const routes: Array<RouteRecordRaw> = [
	{
		name: "CaseList",
		path: "/case",
		component: CaseListPage,
	},
	{
		name: "NewCaseForm",
		path: "/case/new",
		component: CaseFormView,
	},
	{
		name: "CaseForm",
		path: "/case/:id",
		props: true,
		component: CaseDetailsView,
	},
]

export default routes
