import { computed, reactive } from "vue"
import { createResource } from "frappe-ui"
import { userResource } from "./user"
import router from "@/router"

export function sessionUser() {
	const cookies = new URLSearchParams(document.cookie.split("; ").join("&"))
	let _sessionUser = cookies.get("user_id")
	if (_sessionUser === "Guest") {
		_sessionUser = null
	}
	return _sessionUser
}

export interface Session {
	login: { loading: boolean; submit: () => void; reset: () => void }
	logout: { loading: boolean; submit: () => void; reset: () => void }
	user: null | string
	isLoggedIn: boolean
}

export const session: Session = reactive({
	login: createResource({
		url: "login",
		makeParams({ email, password }) {
			return {
				usr: email,
				pwd: password,
			}
		},
		onSuccess(data) {
			userResource.reload()
			session.user = sessionUser()
			session.login.reset()
			router.replace(data.default_route || "/tabs/dashboard")
		},
	}),
	logout: createResource({
		url: "logout",
		onSuccess() {
			userResource.reset()
			session.user = sessionUser()
			router.replace({ name: "Login" })
		},
	}),
	user: sessionUser(),
	isLoggedIn: computed(() => !!session.user),
})
