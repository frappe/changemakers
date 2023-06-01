<template>
	<ion-page>
		<ion-content :fullscreen="true">
			<div class="m-4 flex h-full flex-col justify-center">
				<Card class="rounded-xl">
					<div class="mb-4 flex justify-center align-middle">
						<img
							v-if="selectedOrg === 'Azim Premji Foundation'"
							class="h-12 w-fit"
							src="../../components/logos/apflogo.png"
							alt="Azim Premji Foundation Logo"
						/>
						<img
							v-else
							class="h-12 w-fit p-2"
							src="../../components/logos/frappe.png"
							alt="Frappe Logo"
						/>
					</div>
					<h1 class="pb-5 text-center text-2xl font-bold text-gray-700">
						Login to Changemakers
					</h1>
					<div class="space-y-1">
						<Input
							class="rounded-xl py-2"
							v-model="selectedOrg"
							label="Organisation"
							type="select"
							:options="Object.keys(instanceMappings)"
						/>

						<Input
							class="mb-4 rounded-xl py-2"
							v-if="selectedOrg"
							v-model="selectedInstance"
							label="Instance/Project"
							type="select"
							:options="instanceOptions"
						/>

						<Button
							class="w-full rounded-xl py-2 font-semibold"
							v-if="baseURL"
							:loading="isAuthenticating"
							@click="loginClick"
							appearance="primary"
							>{{ t("auth.login") + " with Frappe" }}</Button
						>
					</div>
				</Card>
			</div>
		</ion-content>
	</ion-page>
</template>

<script lang="ts" setup>
import { useI18n } from "vue-i18n"
import { useRouter } from "vue-router"
import { IonPage, IonContent } from "@ionic/vue"
import { inject, ref, watch, computed } from "vue"

import instanceMappings from "@/data/instanceMappings"
import { sessionInjectionKey } from "@/typing/InjectionKeys"

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
