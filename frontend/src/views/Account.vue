<template>
	<ion-page>
		<ion-header>
			<ion-toolbar>
				<ion-title>My Account</ion-title>
			</ion-toolbar>
		</ion-header>
		<ion-content :fullscreen="true">
			<div v-if="user.data" class="flex flex-col m-6">
				<h2 class="text-gray-900 font-bold text-4xl">
					{{ user.data.first_name }}
				</h2>

				<div class="items-start flex-col justify-start">
					<Input
						class="mb-2"
						:label="t('preferences.language')"
						type="select"
						:options="availableLanguages"
						v-model="locale"
					/>
				</div>
				<Button appearance="white" @click="session.logout.submit()">{{ t("auth.logout") }}</Button>
			</div>
		</ion-content>
	</ion-page>
</template>

<script lang="ts" setup>
import { inject } from "vue"
import { useI18n } from "vue-i18n"

import {
	sessionInjectionKey,
	userResourceInjectionKey,
} from "@/typing/InjectionKeys"

import {
	IonPage,
	IonHeader,
	IonToolbar,
	IonTitle,
	IonContent,
} from "@ionic/vue"

const session = inject(sessionInjectionKey)
const user = inject(userResourceInjectionKey)

const { t, locale } = useI18n()

const availableLanguages = [
	{ value: "en", label: "English" },
	{ value: "hi", label: "हिंदी" },
]
</script>
