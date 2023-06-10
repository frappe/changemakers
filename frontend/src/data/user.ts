import router from "@/router"
import { createResource } from "frappe-ui"

export interface UserResource {
	data: undefined | { first_name: string; full_name: string, user_image: string }
	reload: () => void,
    reset: () => void
}

export const userResource: UserResource = createResource({
	url: "changemakers.api.get_current_user_info",
	onError(error) {
		if (error && error.exc_type === "AuthenticationError") {
			router.push({ name: "LoginPage" })
		}
	},
})
