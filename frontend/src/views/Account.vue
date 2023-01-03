<template>
	<ion-page>
		<ion-header>
			<ion-toolbar>
				<ion-title>My Account</ion-title>
			</ion-toolbar>
		</ion-header>
		<ion-content :fullscreen="true">
			<div v-if="user.data" class="flex flex-col items-center">
				<h2 class="text-gray-900 font-bold text-4xl">
					{{ user.data.first_name }}
				</h2>

				<Button @click="session.logout.submit()">Log Out</Button>
			</div>
		</ion-content>
	</ion-page>
</template>

<script lang="ts" setup>
import { inject } from "vue"
import { UserResource } from "@/data/user"

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
const user: UserResource = inject(userResourceInjectionKey)
</script>
