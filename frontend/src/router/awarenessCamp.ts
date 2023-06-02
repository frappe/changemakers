import { RouteRecordRaw } from "vue-router"
import AwarenessCampListPage from "@/views/awareness_camp/List.vue"
import AwarenessCampDetailsView from "@/views/awareness_camp/Details.vue"
import AwarenessCampFormView from "@/views/awareness_camp/Form.vue"

const routes: Array<RouteRecordRaw> = [
	{
		name: "Awareness Camp RecordList",
		path: "/awarenessCamp",
		component: AwarenessCampListPage,
	},
	{
		name: "NewAwareness Camp RecordForm",
		path: "/awarenessCamp/new",
		component: AwarenessCampFormView,
	},
	{
		name: "Awareness Camp RecordForm",
		path: "/awarenessCamp/:id",
		props: true,
		component: AwarenessCampDetailsView,
	},
]

export default routes
