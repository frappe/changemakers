import { RouteRecordRaw } from "vue-router"
import BeneficiaryListPage from "@/views/beneficiary/List.vue"
import BeneficiaryDetailsView from "@/views/beneficiary/Details.vue"
import BeneficiaryFormView from "@/views/beneficiary/Form.vue"

const routes: Array<RouteRecordRaw> = [
	{
		name: "BeneficiaryList",
		path: "/beneficiary",
		component: BeneficiaryListPage,
	},
	{
		name: "NewBeneficiaryForm",
		path: "/beneficiary/new",
		component: BeneficiaryFormView,
	},
	{
		name: "BeneficiaryForm",
		path: "/beneficiary/:id",
		props: true,
		component: BeneficiaryDetailsView,
	},
]

export default routes
