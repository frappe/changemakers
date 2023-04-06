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
import { OAuth2Client } from "@byteowls/capacitor-oauth2"

import { IonPage, IonContent } from "@ionic/vue"

const { t } = useI18n()

function loginClick(e) {
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
		.then((response) => {
			// TODO: Store in phone storage, access as well as refresh token
			console.log(
				"Successfully authenticated with token: ",
				response["access_token"]
			)
		})
		.catch((e) => {
			console.error(e)
		})
}
</script>
