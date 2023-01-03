<template>
	<ion-page>
		<ion-header>
			<ion-toolbar>
				<ion-title>Login to Changemakers</ion-title>
			</ion-toolbar>
		</ion-header>
		<ion-content :fullscreen="true">
			<form class="flex flex-col m-4 space-y-3" @submit.prevent="submit">
				<Input
					required
					name="email"
					type="text"
					placeholder="dilpreet@mail.com"
					label="User ID"
				/>
				<Input
					required
					name="password"
					type="password"
					placeholder="••••••"
					label="Password"
				/>
				<Button :loading="session.login.loading" appearance="primary"
					>Login</Button
				>
			</form>
		</ion-content>
	</ion-page>
</template>

<script lang="ts" setup>
import { inject } from "vue"

import {
	IonPage,
	IonHeader,
	IonToolbar,
	IonTitle,
	IonContent,
} from "@ionic/vue"
import { sessionInjectionKey } from "@/typing/InjectionKeys"

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
