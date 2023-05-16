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
				<RouterLink
					v-if="showRescues"
					:to="{ name: 'NewRescueForm' }"
					v-slot="{ navigate }"
				>
					<Button @click="navigate" appearance="primary" icon-left="plus"
						>New</Button
					>
				</RouterLink>
			</div>

			<div class="m-4 space-y-3" v-if="showRescues">
				<div class="flex flex-row items-center space-x-1">
					<Input
						type="text"
						placeholder="Search by beneficiary name"
						icon-left="search"
						class="w-full rounded-full bg-white p-1 focus:bg-white"
						@input="(v) => (searchQuery = v)"
						:modelValue="searchQuery"
					/>

					<Button
						appearance="white"
						icon="filter"
						class="h-full rounded-full p-4"
						@click="showFilterDialog = !showFilterDialog"
					></Button>
				</div>

				<div
					v-if="showFilterDialog"
					class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
				>
					<div
						class="max-w-[90%] rounded-lg bg-white px-5 py-4 text-lg font-semibold text-gray-700"
					>
						<div class="flex justify-between">
							<h3 class="text-xl font-semibold">Filter Rescues</h3>
							<Button
								@click="closeFilters"
								icon-left="x"
								appearance="minimal"
								class="w-0"
							></Button>
						</div>

						<div class="mt-4 flex flex-col space-y-2">
							<div class="flex items-center gap-3">
								<label for="filterGender">Gender</label>
								<select
									id="filterGender"
									v-model="filterGender"
									class="rounded-md border border-gray-300 text-lg font-semibold text-gray-700"
								>
									<option
										:key="gender"
										v-for="gender in genderOptions"
										:value="gender"
									>
										{{ gender }}
									</option>
								</select>
							</div>
							<div class="flex flex-col">
								<h3>Age</h3>
								<div class="flex justify-center gap-0">
									<div class="flex items-center justify-start gap-2 px-3">
										<label for="filterMinAge" class="font-medium">Min</label>
										<input
											type="number"
											placeholder="0"
											id="filterMinAge"
											v-model="filterMinAge"
											class="w-1/2 rounded-md border border-gray-300 text-center text-lg font-semibold text-gray-700"
										/>
									</div>
									<div class="flex items-center justify-start gap-3">
										<label for="filterMaxAge" class="font-medium">Max</label>
										<input
											type="number"
											placeholder="100"
											id="filterMaxAge"
											v-model="filterMaxAge"
											class="w-1/2 rounded-md border border-gray-300 text-center text-lg font-semibold text-gray-700"
										/>
									</div>
								</div>
							</div>
						</div>
						<div class="mt-6 flex justify-start gap-3">
							<Button @click="resetFilters" appearance="danger">Reset</Button>
							<Button appearance="primary" @click="applyFilters"
								>Apply Filters</Button
							>
						</div>
					</div>
				</div>

				<div>
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
										<FeatherIcon
											class="h-[18px] w-[18px]"
											name="chevron-right"
										/>
									</div>
								</a>
							</router-link>
						</li>
					</ul>
				</div>
			</div>
			<div
				v-else
				class="flex h-full flex-col items-center justify-center gap-y-1.5"
			>
				<h3 class="font-medium">No rescue data yet</h3>
				<RouterLink
					:to="{ name: 'NewRescueForm' }"
					v-slot="{ navigate }"
					class="flex w-full justify-center"
				>
					<Button
						@click="navigate"
						appearance="primary"
						icon-left="plus"
						class="h-10 w-1/2"
						>Add Rescue Data</Button
					>
				</RouterLink>
			</div>
		</ion-content>
	</ion-page>
</template>

<script lang="ts" setup>
import { inject, ref, computed } from "vue"
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

const showFilterDialog = ref(false)
const filterGender = ref("")
const filterMinAge = ref("")
const filterMaxAge = ref("")
const filterApplied = ref(false)

const genderOptions = [
	"",
	"Male",
	"Female",
	"Transgender",
	"Genderqueer",
	"Non-Conforming",
	"Other",
	"Prefer not to say",
]

const applyFilters = () => {
	filterApplied.value = true
	showFilterDialog.value = false
}

const resetFilters = () => {
	filterGender.value = ""
	filterMinAge.value = ""
	filterMaxAge.value = ""
	filterApplied.value = false
}

const closeFilters = (event) => {
	showFilterDialog.value = false
}

// searchQuery.value contains the input value of the search bar
const searchQuery = ref("")

// filterRescue function will filter the rescues list, and return the rescue list where the Beneficiary name contains the 'searchQuery' element.
const filteredRescue = computed(() => {
	if (!rescues.data) {
		return []
	}
	return rescues.data.filter(
		(rescue) =>
			`${rescue.first_name} ${rescue.last_name}`
				.toLowerCase()
				.includes(searchQuery.value.toLowerCase()) &&
			(rescue.gender == filterGender.value || filterGender.value == "") &&
			(rescue.age >= parseInt(filterMinAge.value) ||
				filterMinAge.value == "") &&
			(rescue.age <= parseInt(filterMaxAge.value) || filterMaxAge.value == "")
	)
})

const showRescues = computed(() => {
	return rescues.data && !rescues.loading
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
