<template>
	<ion-page>
		<ion-header class="bg-white">
			<div class="flex flex-row items-center p-4">
				<!-- <ion-title class="text-gray-900 font-semibold text-xl p-0"></ion-title> -->
			</div>
		</ion-header>
		<ion-content :fullscreen="true">
			<div class="m-4">
                <pre>
                    {{  props }}
                </pre>
            </div>
		</ion-content>
	</ion-page>
</template>

<script lang="ts" setup>
import { IonPage, IonContent, IonHeader, IonTitle } from "@ionic/vue"

const props = defineProps({
	id: String,
})
</script>
