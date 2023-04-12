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
					<div class="flex flex-col items-center justify-center space-y-1 p-3">
						<!-- TODO: Switch to an avatar component that renders the initials if no picture if found -->
						<img :src="session.user.picture" class="h-20 w-20 object-cover" />
						<h3 class="text-2xl font-semibold">{{ session.user.name }}</h3>
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
	await session.logout()
	router.push({ name: "Login" })
}
</script>
