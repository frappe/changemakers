<template>
	<ion-page>
		<ion-content :fullscreen="true">
			<div class="m-4 flex h-full flex-col justify-center">
				<Card title="Login to Changemakers">
					<Button @click="loginClick" appearance="primary">{{
						t("auth.login") + " with OAuth"
					}}</Button>
				</Card>
			</div>
		</ion-content>
	</ion-page>
</template>

<script lang="ts" setup>
import { useI18n } from "vue-i18n"

// Auth: will be refactored out to a separate lib (TODO)
import { Preferences } from "@capacitor/preferences"
import { OAuth2Client } from "@byteowls/capacitor-oauth2"

import { IonPage, IonContent } from "@ionic/vue"

const { t } = useI18n()

async function loginClick(e) {
	const BASE_URL = "https://apf-changemakers-staging.frappe.cloud"
	const oauth2Options = {
		appId: "f592ecba60",
		scope: "all",
		authorizationBaseUrl: `${BASE_URL}/api/method/frappe.integrations.oauth2.authorize`,
		responseType: "code",
		redirectUrl: "io.frappe.changemakers://oauth/auth",
		accessTokenEndpoint: `${BASE_URL}/api/method/frappe.integrations.oauth2.get_token`,
	}
	OAuth2Client.authenticate(oauth2Options)
		.then(async (response) => {
			console.log("Successfully authenticated with response: ", response)

			// 1: Store in phone storage, access as well as refresh token
			// 2: Fetch and set user information
			await Preferences.set({
				key: "oauth_access_token",
				value: response["access_token"],
			})

			await Preferences.set({
				key: "oauth_refresh_token",
				value: response["refresh_token"],
			})
		})
		.catch((e) => {
			console.error(e)
		})
}
</script>
