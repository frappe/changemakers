<template>
	<ion-page>
		<ion-content :fullscreen="true">
			<div
				class="flex flex-row items-center w-full p-4 bg-white justify-between"
			>
				<h2 class="text-gray-900 font-semibold text-xl p-0">Rescues</h2>
				<RouterLink :to="{ name: 'NewRescueForm' }" v-slot="{ navigate }">
					<Button @click="navigate" appearance="primary">New</Button>
				</RouterLink>
			</div>

			<div class="m-4">
				<ul v-if="rescues.data">
					<li v-for="rescue in rescues.data" :key="rescue.name">
						<router-link
							custom
							:to="{ name: 'RescueForm', params: { id: rescue.name } }"
							v-slot="{ href, navigate }"
						>
							<a
								class="bg-white px-3 py-[14px] first-of-type:rounded-t-xl last-of-type:rounded-b-xl flex flex-row justify-between items-center"
								:href="href"
								@click="navigate"
							>
								<div
									class="flex flex-row items-center justify-start gap-[14px]"
								>
									<FrappeIcons.RescueIcon class="text-gray-500" />
									<div class="flex flex-col">
										<h3 class="text-gray-700 text-lg font-semibold">
											{{ rescue.first_name }} {{ rescue.last_name }}
										</h3>
										<time
											class="text-base text-gray-600"
											:datetime="rescue.rescued_at"
											>{{
												dayjs(rescue.rescued_at).format("HH:mmA, DD-MM-YYYY")
											}}</time
										>
									</div>
								</div>

								<div>
									<FeatherIcon class="h-[18px] w-[18px]" name="chevron-right" />
								</div>
							</a>
						</router-link>
					</li>
				</ul>
			</div>
		</ion-content>
	</ion-page>
</template>

<script lang="ts" setup>
import { inject } from "vue"
import { createListResource, FeatherIcon } from "frappe-ui"
import { IonPage, IonContent } from "@ionic/vue"
import { FrappeIcons } from "@/components/icons"

// Type imports
import { ListResource } from "@/typing/resource"
import { sessionInjectionKey, dayjsInjectionKey } from "@/typing/InjectionKeys"
import { Rescue } from "@/../types/FrappeChangemakers/Rescue"

interface RescueWithBeneficiaryDetails extends Rescue {
	first_name: string
	last_name: string
}

const session = inject(sessionInjectionKey)
const dayjs = inject(dayjsInjectionKey)

const rescues: ListResource<RescueWithBeneficiaryDetails> = createListResource({
	doctype: "Rescue",
	fields: [
		"name",
		"rescued_at",
		"beneficiary.first_name as first_name",
		"beneficiary.last_name as last_name",
	],
	cache: "RescueList",
})

rescues.reload()
</script>
