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
				<h2 class="flex flex-col p-0 text-2xl font-semibold text-gray-800">
					<span> Awareness Camp Record </span>
					<span class="ml-1 font-mono text-sm font-medium text-gray-700"
						>#{{ props.id }}</span
					>
				</h2>
			</div>

			<FormView
				doctype="Awareness Camp Record"
				:id="props.id"
				submit-button-label="Save"
			/>
		</ion-content>
	</ion-page>
</template>

<script lang="ts" setup>
import { useRouter } from "vue-router"
import { IonPage, IonContent } from "@ionic/vue"
import FormView from "@/components/FormView.vue"

const router = useRouter()

const props = defineProps({
	id: {
		type: String,
		required: true,
	},
})
</script>
