<template>
	<ion-page>
		<ion-content :fullscreen="true">
			<div
				class="flex w-full flex-row items-center justify-between bg-white p-4"
			>
				<div class="flex flex-row items-center">
					<Button
						icon-left="chevron-left"
						appearance="minimal"
						@click="router.back()"
					>
					</Button>
					<h2 class="p-0 text-2xl font-semibold text-gray-900">Rescues</h2>
				</div>
				<RouterLink v-if="rescues.data" :to="{ name: 'NewRescueForm' }" v-slot="{ navigate }">
					<Button @click="navigate" appearance="primary" icon-left="plus">New</Button>
				</RouterLink>
			</div>

			<div class="m-4 flex flex-row items-center space-x-1" v-if="rescues.data">
				<Input
					type="text"
					placeholder="Search by beneficiary name"
					icon-left="search"
					class="w-full rounded-full bg-white py-1 focus:bg-white"
					v-model="searchQuery"
				/>

				<Button
					appearance="white"
					icon="filter"
					class="rounded-full p-3 h-full"
				></Button>
			</div>
			
			<div class="m-4">
				<div v-if="rescues.data"> 
					<ul>
						<li
							v-for="rescue in filteredRescue"
							class="border-b-[1px] bg-white first-of-type:first:rounded-t-xl last-of-type:last:rounded-b-xl"
							:key="rescue.name"
						>
							<router-link
								custom
								:to="{ name: 'RescueForm', params: { id: rescue.name } }"
								v-slot="{ href, navigate }"
							>
								<a
									class="flex flex-row items-center justify-between px-3 py-[14px]"
									:href="href"
									@click="navigate"
								>
									<div
										class="flex flex-row items-center justify-start gap-[14px]"
									>
										<FrappeIcons.RescueIcon class="text-gray-500" />
										<div class="flex flex-col">
											<h3 class="text-lg font-semibold text-gray-700">
												{{ rescue.first_name }} {{ rescue.last_name }},
												{{ rescue.age }}, {{ rescue.gender }}
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
				<div v-else class="flex h-full flex-col items-center justify-center gap-y-1.5">
					<h3 class="font-medium">No rescue data yet</h3>
					<RouterLink :to="{ name: 'NewRescueForm' }" v-slot="{ navigate }" class="w-full flex justify-center">
						<Button @click="navigate" appearance="primary" icon-left="plus" class="w-1/2 h-10">Add Rescue Data</Button>
					</RouterLink>
				</div>
			</div>
		</ion-content>
	</ion-page>
</template>

<script lang="ts" setup>
import { inject, ref, computed} from "vue"
import { createListResource, FeatherIcon } from "frappe-ui"
import { IonPage, IonContent } from "@ionic/vue"
import { FrappeIcons } from "@/components/icons"
import { useRouter } from "vue-router"

// Type imports
import { ListResource } from "@/typing/resource"
import { dayjsInjectionKey } from "@/typing/InjectionKeys"
import { Rescue } from "@/../types/FrappeChangemakers/Rescue"
import { string } from "yup"

interface RescueWithBeneficiaryDetails extends Rescue {
	first_name: string
	last_name: string
}

const dayjs = inject(dayjsInjectionKey)
const router = useRouter()

// searchQuery.value contains the input value of the search bar
const searchQuery = ref('');

// filterRescue function will filter the rescues list, and return the rescue list where the Beneficiary name contains the 'searchQuery' element.
const filteredRescue = computed(()=> {
	return rescues.data.filter(rescue => `${rescue.first_name} ${rescue.last_name}`.toLowerCase().includes(searchQuery.value.toLowerCase()))
})

const rescues: ListResource<RescueWithBeneficiaryDetails> = createListResource({
	doctype: "Rescue",
	fields: [
		"name",
		"rescued_at",
		"beneficiary.first_name as first_name",
		"beneficiary.last_name as last_name",
		"age",
		"gender",
	],
	cache: "RescueList",
	orderBy: "-rescued_at",
})

rescues.reload()
</script>
