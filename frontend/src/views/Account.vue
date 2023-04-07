<template>
	<ion-page>
		<ion-header>
			<ion-toolbar>
				<ion-title>{{ t("headers.my_account", "My Account") }}</ion-title>
			</ion-toolbar>
		</ion-header>
		<ion-content :fullscreen="true">
			<div v-if="session.user" class="m-6 flex flex-col">
				<Card :title="t('labels.preferences', 'Preferences')" class="mb-4">
					<div class="p-3">
						<pre>{{ session }}</pre>
						<p>{{ session.user.name }}</p>
					</div>

					<div class="flex-col items-start justify-start">
						<Input
							:label="t('preferences.language')"
							type="select"
							:options="availableLanguages"
							v-model="locale"
						/>
					</div>
				</Card>
				<Button appearance="white" @click="logout">{{
					t("auth.logout")
				}}</Button>
			</div>
		</ion-content>
	</ion-page>
</template>

<script lang="ts" setup>
import { inject } from "vue"
import { useI18n } from "vue-i18n"

import { sessionInjectionKey } from "@/typing/InjectionKeys"

import {
	IonPage,
	IonHeader,
	IonToolbar,
	IonTitle,
	IonContent,
} from "@ionic/vue"
import { useRouter } from "vue-router"

const session = inject(sessionInjectionKey)
const router = useRouter()
const { t, locale } = useI18n()

const availableLanguages = [
	{ value: "en", label: "English" },
	{ value: "hi", label: "हिंदी" },
]

const logout = async () => {
	await session.logout("https://apf-changemakers-staging.frappe.cloud")
	router.push({ name: "Login" })
}
</script>
