<template>
	<ion-page>
		<ion-header>
			<ion-toolbar>
				<ion-title>{{ t("headers.my_account", "My Account") }}</ion-title>
			</ion-toolbar>
		</ion-header>
		<ion-content :fullscreen="true">
			<div class="flex h-full flex-col justify-between">
				<div v-if="user.data" class="m-6 flex flex-col">
					<Card class="mb-4 rounded-xl">
						<div class="flex items-center justify-center py-5">
							<Avatar
								size="xl"
								class="h-[100px] w-[100px]"
								:imageURL="user.data.user_image"
								:label="user.data.full_name"
							/>
						</div>
						<div class="flex-col items-start justify-start">
							<Input
								class="rounded-lg"
								:label="t('preferences.language')"
								type="select"
								:options="availableLanguages"
								v-model="locale"
							/>
						</div>
					</Card>
					<Button
						class="rounded-xl py-2 font-semibold"
						appearance="danger"
						@click="session.logout.submit()"
						>{{ t("auth.logout") }}</Button
					>
				</div>
				<footer
					class="flex flex-col items-center justify-center p-4 text-center text-sm text-gray-500"
				>
					<span>Frappe Changemakers</span>
					<span>v{{ appVersion.data }}</span>
				</footer>
			</div>
		</ion-content>
	</ion-page>
</template>

<script lang="ts" setup>
import { inject } from "vue"
import { useI18n } from "vue-i18n"
import { Avatar, createResource } from "frappe-ui"

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

const appVersion = createResource({
	url: "changemakers.api.get_app_version",
	auto: true,
})

const { t, locale } = useI18n()

const availableLanguages = [
	{ value: "en", label: "English" },
	{ value: "hi", label: "हिंदी" },
]
</script>
