import { computed, reactive } from "vue"
import { Preferences } from "@capacitor/preferences"
import { OAuth2Client } from "@byteowls/capacitor-oauth2"

const SESSION_OBJECT_KEY = "userSession"

export interface User {
	userID: string
}

// export interface Session {
// 	user: User | null
// 	isLoggedIn: boolean
// 	authenticateWithFrappeOAuth: (baseURL: string, clientID: string) => void
// 	initializeSessionFromPreferences: () => void
// 	saveSessionToPreferences: (any, User) => void
// }

export const session = reactive({
	user: null,
	isLoggedIn: false,
	auth: null,
	authResponse: null,
	async authenticateWithFrappeOAuth(baseURL, clientID) {
		const oauth2Options = {
			appId: clientID,
			scope: "all",
			authorizationBaseUrl: `${baseURL}/api/method/frappe.integrations.oauth2.authorize`,
			responseType: "code",
			redirectUrl: "io.frappe.changemakers://oauth/auth",
			accessTokenEndpoint: `${baseURL}/api/method/frappe.integrations.oauth2.get_token`,
		}
		OAuth2Client.authenticate(oauth2Options)
			.then(async (response) => {
				console.log("Successfully authenticated with response: ", response)

				this.authResponse = response
				this.auth = {
					accessToken: response["access_token"],
					refreshToken: response["refresh_token"],
				}
				await this.fetchAndSetUserInfo(baseURL)
				await this.saveSessionToPreferences()

				this.isLoggedIn = true
			})
			.catch((e) => {
				this.isLoggedIn = false
				console.error(e)
			})
	},
	async initializeSessionFromPreferences() {
		const result = await Preferences.get({ key: SESSION_OBJECT_KEY })

		if (!result) {
			return false
		}

		const sessionObject = JSON.parse(result.value)
		this.user = sessionObject.user
		this.auth = sessionObject.auth
	},
	async saveSessionToPreferences() {
		const sessionObject = JSON.stringify({
			auth: this.auth,
			user: this.user,
		})
		await Preferences.set({ key: SESSION_OBJECT_KEY, value: sessionObject })
	},
	async logout(baseURL) {
		// Clear session storage
		await Preferences.remove({ key: SESSION_OBJECT_KEY })
		// Revoke Auth Token
		OAuth2Client.logout({
			logoutUrl: `${baseURL}/api/method/frappe.integrations.oauth2.revoke_token`,
		})

		// Clean session state
		this.user = null
		this.auth = null
		this.isLoggedIn = false
	},
	async fetchAndSetUserInfo(baseURL) {
		if (!this.auth) {
			return
		}

		const response = await fetch(
			`${baseURL}/api/method/frappe.integrations.oauth2.openid_profile`,
			{
				headers: {
					Authorization: `Bearer ${this.auth.accessToken}`,
				},
			}
		)
		this.user = await response.json()
	},
})

export const isLoggedIn = computed(() => {
	return session.auth && session.user
})
