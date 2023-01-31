<template>
	<ion-page>
		<ion-header>
			<ion-toolbar>
				<ion-title>My Account</ion-title>
			</ion-toolbar>
		</ion-header>
		<ion-content :fullscreen="true">
			<div v-if="user.data" class="m-6 flex flex-col">
				<Card :title="t('label.preferences', 'Preferences')" class="mb-4">
					<div class="flex-col items-start justify-start">
						<Input
							:label="t('preferences.language')"
							type="select"
							:options="availableLanguages"
							v-model="locale"
						/>
					</div>
				</Card>
				<Button appearance="white" @click="session.logout.submit()">{{
					t("auth.logout")
				}}</Button>
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
