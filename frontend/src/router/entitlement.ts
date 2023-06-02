import { RouteRecordRaw } from "vue-router"
import EntitlementListPage from "@/views/entitlement/List.vue"
import EntitlementDetailsView from "@/views/entitlement/Details.vue"
import EntitlementFormView from "@/views/entitlement/Form.vue"

const routes: Array<RouteRecordRaw> = [
	{
		name: "Entitlement RequestList",
		path: "/entitlement",
		component: EntitlementListPage,
	},
	{
		name: "NewEntitlement RequestForm",
		path: "/entitlement/new",
		component: EntitlementFormView,
	},
	{
		name: "Entitlement RequestForm",
		path: "/entitlement/:id",
		props: true,
		component: EntitlementDetailsView,
	},
]

export default routes
