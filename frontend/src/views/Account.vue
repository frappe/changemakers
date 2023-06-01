<template>
	<ion-page>
		<ion-header>
			<ion-toolbar>
				<ion-title class="text-3xl font-semibold">{{
					t("headers.my_account", "My Account")
				}}</ion-title>
			</ion-toolbar>
		</ion-header>
		<ion-content :fullscreen="true">
			<div v-if="session.user" class="m-6 flex flex-col">
				<Card class="mb-4 rounded-2xl">
					<div class="flex flex-col items-center justify-center space-y-3 p-3">
						<img
							v-if="session.user.picture"
							:src="session.user.picture"
							class="h-20 w-20 rounded-full object-cover"
						/>
						<div
							v-else
							class="flex h-20 w-20 items-center justify-center rounded-full bg-blue-400 text-6xl font-medium text-white"
						>
							{{ session.user.given_name.charAt(0)
							}}{{ session.user.family_name.charAt(0) }}
						</div>
						<h3 class="text-2xl font-medium">{{ session.user.name }}</h3>
					</div>

					<div class="flex-col items-start justify-start">
						<Input
							class="rounded-xl py-2"
							:label="t('preferences.language')"
							type="select"
							:options="availableLanguages"
							v-model="locale"
						/>
					</div>
				</Card>
				<Button
					class="rounded-xl py-4 font-medium"
					appearance="danger"
					@click="logout"
					>{{ t("auth.logout") }}</Button
				>
			</div>
			<div></div>
		</ion-content>
	</ion-page>
</template>

<script lang="ts" setup>
import { inject, computed } from "vue"
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
	try {
		await session.logout()
		router.push({ name: "Login" })
	} catch (e) {
		console.error("Error logging you out")
		alert("Error logging your out!")
	}
}
</script>
