<template>
	<ion-page>
		<ion-content :fullscreen="true">
			<div class="m-4 flex h-full flex-col justify-center">
				<Card title="Login to Changemakers">
					<div class="space-y-2">
						<Input
							v-model="selectedOrg"
							label="Organisation"
							type="select"
							:options="Object.keys(orgInstanceMap)"
						/>

						<Input
							v-if="selectedOrg"
							v-model="selectedInstance"
							label="Instance/Project"
							type="select"
							:options="instanceOptions"
						/>

						<Button
							v-if="baseURL"
							:loading="isAuthenticating"
							@click="loginClick"
							appearance="primary"
							>{{ t("auth.login") + " with Frappe OAuth" }}</Button
						>
					</div>
					>
				</Card>
			</div>
		</ion-content>
	</ion-page>
</template>

<script lang="ts" setup>
import { inject, ref, watch } from "vue"
import { useI18n } from "vue-i18n"
import { sessionInjectionKey } from "@/typing/InjectionKeys"
import { IonPage, IonContent } from "@ionic/vue"
import { useRouter } from "vue-router"
import { computed } from "vue"

const { t } = useI18n()
const session = inject(sessionInjectionKey)
const router = useRouter()

const isAuthenticating = ref(false)

const orgInstanceMap = {
	"Azim Premji Foundation": {
		Chennai: {
			url: "https://apf-changemakers-staging.frappe.cloud",
			clientID: "f592ecba60",
		},
		Bangalore: {
			url: "https://apf-changemakers-staging.frappe.cloud",
			clientID: "f592ecba60",
		},
	},
	Frappe: {
		Staging: {
			url: "https://apf-changemakers-staging.frappe.cloud",
			clientID: "f592ecba60",
		},
		Dev: {
			url: "https://apf-changemakers-staging.frappe.cloud",
			clientID: "f592ecba60",
		},
	},
}

const selectedOrg = ref("Azim Premji Foundation")
const selectedInstance = ref("Chennai")

const instanceOptions = computed(() => {
	if (!selectedOrg.value) {
		return []
	}
	return Object.keys(orgInstanceMap[selectedOrg.value]).sort()
})

const baseURL = computed(() => {
	if (!selectedInstance.value) {
		return null
	}

	return orgInstanceMap[selectedOrg.value][selectedInstance.value].url
})

watch(selectedOrg, (newValue) => {
	if (newValue) {
		// Select the first instance by default
		selectedInstance.value = Object.keys(orgInstanceMap[newValue]).sort()[0]
	}
})

async function loginClick(e) {
	isAuthenticating.value = true
	const CLIENT_ID = "f592ecba60"
	try {
		session.setInstanceDetails(baseURL.value, CLIENT_ID)
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
