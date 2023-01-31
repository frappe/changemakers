<template>
	<ion-page>
		<ion-header class="bg-white">
			<div class="flex flex-row items-center p-4">
				<ion-title class="p-0 text-xl font-semibold text-gray-900">
					Rescue: {{ props.id }}
				</ion-title>
			</div>
		</ion-header>
		<ion-content :fullscreen="true"> </ion-content>
	</ion-page>
</template>

<script lang="ts" setup>
import { IonPage, IonContent, IonHeader, IonTitle } from "@ionic/vue"

const props = defineProps({
	id: String,
})
</script>
