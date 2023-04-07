<template>
	<ion-page>
		<ion-content :fullscreen="true">
			<div class="m-4 flex h-full flex-col justify-center">
				<Card title="Login to Changemakers">
					<Button
						:loading="isAuthenticating"
						@click="loginClick"
						appearance="primary"
						>{{ t("auth.login") + " with OAuth" }}</Button
					>
				</Card>
			</div>
		</ion-content>
	</ion-page>
</template>

<script lang="ts" setup>
import { inject, ref } from "vue"
import { useI18n } from "vue-i18n"
import { sessionInjectionKey } from "@/typing/InjectionKeys"
import { IonPage, IonContent } from "@ionic/vue"
import { useRouter } from "vue-router"
import { useIonRouter } from "@ionic/vue"

const { t } = useI18n()
const session = inject(sessionInjectionKey)
const router = useIonRouter()

const isAuthenticating = ref(false)

async function loginClick(e) {
	isAuthenticating.value = true
	const BASE_URL = "https://apf-changemakers-staging.frappe.cloud"
	const CLIENT_ID = "f592ecba60"
	try {
		console.log("awaiting oauth call")
		await session.authenticateWithFrappeOAuth(BASE_URL, CLIENT_ID)
		console.log("oauth call complete")

		isAuthenticating.value = false

		// Change to homepage later
		console.log("pushing accounts route...")
		router.push("/tabs/Account")
	} catch {
		console.log(
			"Something went wrong while authenticating through Frappe OAuth..."
		)
	}
}
</script>
