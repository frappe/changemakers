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
import { inject } from "vue"
import { useI18n } from "vue-i18n"
import { sessionInjectionKey } from "@/typing/InjectionKeys"
import { IonPage, IonContent } from "@ionic/vue"
import { useRouter } from "vue-router"

const { t } = useI18n()
const session = inject(sessionInjectionKey)
const router = useRouter()

async function loginClick(e) {
	const BASE_URL = "https://apf-changemakers-staging.frappe.cloud"
	const CLIENT_ID = "f592ecba60"
	try {
		await session.authenticateWithFrappeOAuth(BASE_URL, CLIENT_ID)
		router.push({ name: "MyAccountPage" })
	} catch {
		console.log(
			"Something went wrong while authenticating through Frappe OAuth..."
		)
	}
}
</script>
