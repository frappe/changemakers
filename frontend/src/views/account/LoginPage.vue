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
							:options="Object.keys(instanceMappings)"
						/>

						<Input
							v-if="selectedOrg"
							v-model="selectedInstance"
							label="Instance/Project"
							type="select"
							:options="instanceOptions"
						/>

						<Button
							class="mt-2"
							v-if="baseURL"
							:loading="isAuthenticating"
							@click="loginClick"
							appearance="primary"
							>{{ t("auth.login") + " with Frappe OAuth" }}</Button
						>
					</div>
				</Card>
			</div>
		</ion-content>
	</ion-page>
</template>

<script lang="ts" setup>
import { inject, ref, watch, computed } from "vue"
import { useI18n } from "vue-i18n"
import { sessionInjectionKey } from "@/typing/InjectionKeys"
import { IonPage, IonContent } from "@ionic/vue"
import { useRouter } from "vue-router"
import instanceMappings from "@/data/instanceMappings"

const { t } = useI18n()
const session = inject(sessionInjectionKey)
const router = useRouter()

const isAuthenticating = ref(false)

// Hardcoded for now, can be set onMount to respective 1sts
const selectedOrg = ref("Azim Premji Foundation")
const selectedInstance = ref("Bangalore")

const instanceOptions = computed(() => {
	if (!selectedOrg.value) {
		return []
	}
	return Object.keys(instanceMappings[selectedOrg.value]).sort()
})

const baseURL = computed(() => {
	if (!selectedInstance.value) {
		return null
	}

	return instanceMappings[selectedOrg.value][selectedInstance.value].url
})

const clientID = computed(() => {
	if (!selectedInstance.value) {
		return null
	}

	return instanceMappings[selectedOrg.value][selectedInstance.value].clientID
})

watch(selectedOrg, (newValue) => {
	if (newValue) {
		// Select the first instance by default
		selectedInstance.value = Object.keys(instanceMappings[newValue]).sort()[0]
	}
})

async function loginClick(e) {
	isAuthenticating.value = true
	try {
		session.setInstanceDetails(baseURL.value, clientID.value)
		await session.authenticateWithFrappeOAuth()
		router.push({ name: "Home" })
	} catch {
		alert("Something went wrong!")
		console.error(
			"Something went wrong while authenticating through Frappe OAuth..."
		)
	} finally {
		isAuthenticating.value = false
	}
}
</script>
