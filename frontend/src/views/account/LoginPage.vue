<template>
	<ion-page>
		<ion-content :fullscreen="true">
			<div class="m-4 flex h-full flex-col justify-center">
				<Card>
					<h1 class="pb-5 text-center text-2xl font-bold text-gray-800">
						Login to Changemakers
					</h1>
					<form class="flex flex-col space-y-3" @submit.prevent="submit">
						<Input
							class="rounded-xl py-2"
							required
							name="email"
							type="text"
							placeholder="johndoe@mail.com"
							:label="t('auth.email')"
						/>
						<Input
							class="rounded-xl py-2"
							required
							name="password"
							type="password"
							placeholder="••••••"
							:label="t('auth.password')"
						/>
						<Button
							class="rounded-xl py-2"
							:loading="session.login.loading"
							appearance="primary"
							>{{ t("auth.login") }}</Button
						>
					</form>
				</Card>
			</div>
		</ion-content>
	</ion-page>
</template>

<script lang="ts" setup>
import { inject } from "vue"
import { useI18n } from "vue-i18n"

import { IonPage, IonContent } from "@ionic/vue"

import { sessionInjectionKey } from "@/typing/InjectionKeys"

const { t } = useI18n()
const session = inject(sessionInjectionKey)

function submit(e) {
	let formData = new FormData(e.target)
	console.log(formData)
	session.login.submit({
		email: formData.get("email").toString(),
		password: formData.get("password").toString(),
	})
}
</script>
