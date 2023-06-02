<template>
	<ion-page>
		<ion-content :fullscreen="true">
			<div class="flex w-full flex-row items-center py-4">
				<Button
					icon-left="chevron-left"
					appearance="minimal"
					@click="router.back()"
				>
				</Button>
				<h2 class="p-0 text-2xl font-semibold text-gray-900">
					New Entitlement
				</h2>
			</div>

			<FormView doctype="Entitlement Request" />
		</ion-content>
	</ion-page>
</template>

<script lang="ts" setup>
import { useRouter } from "vue-router"
import { IonPage, IonContent } from "@ionic/vue"
import FormView from "@/components/FormView.vue"

const router = useRouter()
</script>
