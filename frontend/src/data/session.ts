import { computed, reactive } from "vue"
import { Preferences } from "@capacitor/preferences"
import { OAuth2Client } from "@byteowls/capacitor-oauth2"

const SESSION_OBJECT_KEY = "userSession"

export interface User {
	name: string
	email: string
	picture?: string
	roles: string[]
	given_name: string
	family_name?: string
}

export interface Session {
	user: User | null
	setInstanceDetails: (baseURL: string, clientID: string) => void
	initializeSessionFromPreferences: () => void
	authenticateWithFrappeOAuth: () => void
	logout: () => void
	refreshAccessToken: () => void
}

export const session = reactive({
	user: null,
	auth: null,
	authResponse: null,
	baseURL: "",
	clientID: "",
	async authenticateWithFrappeOAuth() {
		// clear authentication state
		this.clearSessionState()

		if (!(this.baseURL && this.clientID)) {
			console.error("Please specify baseURL and clientID before authentication")
		}

		const oauth2Options = {
			appId: this.clientID,
			scope: "all",
			authorizationBaseUrl: `${this.baseURL}/api/method/frappe.integrations.oauth2.authorize`,
			responseType: "code",
			redirectUrl: "io.frappe.changemakers://oauth/auth",
			accessTokenEndpoint: `${this.baseURL}/api/method/frappe.integrations.oauth2.get_token`,
		}

		try {
			const response = await OAuth2Client.authenticate(oauth2Options)
			console.log("Successfully authenticated with response: ", response)

			this.authResponse = response
			this.auth = {
				accessToken: response["access_token"],
				refreshToken: response["access_token_response"]["refresh_token"],
			}

			await this.fetchAndSetUserInfo()
			await this.saveSessionToPreferences()
		} catch (e) {
			console.error(e)
		}
	},
	async initializeSessionFromPreferences() {
		const result = await Preferences.get({ key: SESSION_OBJECT_KEY })

		if (!result.value) {
			return false
		}

		const sessionObject = JSON.parse(result.value)
		this.user = sessionObject.user
		this.auth = sessionObject.auth
		this.baseURL = sessionObject.baseURL
		this.clientID = sessionObject.clientID
	},
	async saveSessionToPreferences() {
		const sessionObject = JSON.stringify({
			auth: this.auth,
			user: this.user,
			baseURL: this.baseURL,
			clientID: this.clientID,
		})
		await Preferences.set({ key: SESSION_OBJECT_KEY, value: sessionObject })
	},
	async logout() {
		if (!this.auth) {
			throw Error("Login before you logout")
		}

		await OAuth2Client.logout(
			{
				logoutUrl:
					`${this.baseURL}/api/method/frappe.integrations.oauth2.revoke_token`,
				additionalParameters: {
					token: this.auth.accessToken,
				},
			},
		)

		// Clear session storage
		await Preferences.remove({ key: SESSION_OBJECT_KEY })
		this.clearSessionState()
	},

	async fetchAndSetUserInfo() {
		if (!this.auth) {
			return
		}

		try {
			const response = await fetch(
				`${this.baseURL}/api/method/frappe.integrations.oauth2.openid_profile`,
				{
					method: "GET",
					headers: {
						Authorization: `Bearer ${this.auth.accessToken}`,
					},
				}
			)
			this.user = await response.json()
		} catch (e) {
			console.error("Error fetching user information", e)
		}
	},
	setInstanceDetails(baseURL, clientID) {
		this.clientID = clientID
		this.baseURL = baseURL
	},
	clearSessionState() {
		this.user = null
		this.auth = null
		this.authResponse = null
	},
	async refreshAccessToken() {
		if (!this.auth?.refreshToken) {
			return
		}

		const response = await OAuth2Client.refreshToken({
			accessTokenEndpoint: `${this.baseURL}/api/method/frappe.integrations.oauth2.get_token`,
			appId: this.clientID,
			refreshToken: this.auth.refreshToken,
		})

		this.authResponse = response
		this.auth = {
			accessToken: response["access_token"],
			refreshToken: response["refresh_token"],
		}

		await this.saveSessionToPreferences()

		return response
	},
})

export const isLoggedIn = computed(() => {
	return session.auth && session.user
})
