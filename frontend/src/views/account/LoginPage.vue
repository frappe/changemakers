<template>
	<ion-page>
		<ion-content :fullscreen="true">
			<div class="m-4 flex h-full flex-col justify-center">
				<Card title="Login to Changemakers">
					<Input v-model="baseURL" type="text" />
					<Button
						:loading="isAuthenticating"
						@click="loginClick"
						appearance="primary"
						>{{ t("auth.login") + " with Frappe OAuth" }}</Button
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

const { t } = useI18n()
const session = inject(sessionInjectionKey)
const router = useRouter()

const baseURL = ref("")
const isAuthenticating = ref(false)

async function loginClick(e) {
	isAuthenticating.value = true
	const CLIENT_ID = "f592ecba60"
	try {
		session.setInstanceDetails(
			"https://apf-changemakers-staging.frappe.cloud",
			CLIENT_ID
		)
		await session.authenticateWithFrappeOAuth()
		router.push({ name: "MyAccountPage" })
	} catch {
		console.log(
			"Something went wrong while authenticating through Frappe OAuth..."
		)
	} finally {
		isAuthenticating.value = false
	}
}
</script>
