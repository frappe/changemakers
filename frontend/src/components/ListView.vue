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
			</div>

			<span v-if="documents.data">
				{{ documents.data.length }} Record Fetched
			</span>

			<span>{{ getOptionForField("condition") }}</span>

			<div
				class="p-2"
				v-for="fieldname in Object.keys(props.filterConfig)"
				:key="fieldname"
			>
				<span>{{ fieldname.toUpperCase() }}</span>

				<ion-list>
					<ion-item>
						<ion-select
							:aria-label="fieldname"
							interface="action-sheet"
							placeholder="Select filter type"
							:value="
								filterFieldTypeOptionMap[
									props.filterConfig[fieldname]['type']
								][0]
							"
							v-model="untransformedFilters[fieldname].type"
						>
							<ion-select-option
								v-for="(option, index) in filterFieldTypeOptionMap[
									props.filterConfig[fieldname]['type']
								]"
								:value="option"
								:key="option"
								:selected="index === 0"
								>{{ option }}</ion-select-option
							>
						</ion-select>
					</ion-item>
				</ion-list>

				<!-- render input field based on the selected type of filter -->
				<div>
					<Input
						type="number"
						placeholder="Value"
						v-model="untransformedFilters[fieldname].value"
						v-if="
							props.filterConfig[fieldname]['type'] === 'number' &&
							untransformedFilters[fieldname].type
						"
					/>

					<FormField
						type="link"
						:placeholder="`Select ${props.filterConfig[fieldname]['doctype']}`"
						v-model="untransformedFilters[fieldname].value"
						:doctype="props.filterConfig[fieldname]['doctype']"
						v-if="
							props.filterConfig[fieldname]['type'] === 'link' &&
							untransformedFilters[fieldname].type
						"
					/>

					<FormField
						type="select"
						:options="getOptionForField(fieldname)"
						:placeholder="`Select ${fieldname}`"
						v-model="untransformedFilters[fieldname].value"
						v-if="
							props.filterConfig[fieldname]['type'] === 'select' &&
							untransformedFilters[fieldname].type
						"
					/>
				</div>
			</div>

			<Button appearance="primary" @click="applyFilters">Apply Filters</Button>
			<Button appearance="minimal" @click="clearFilters">Clear Filters</Button>
			<!-- <pre>{{ titleFieldName }}</pre> -->

			<!-- <RouterLink
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
						@click="filters.showFilterDialog = !filters.showFilterDialog"
					></Button>
				</div>
				<div
					v-if="filters.showFilterDialog"
					class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
				>
					<div
						class="flex w-full max-w-[90%] flex-col gap-3 rounded-lg bg-white px-5 py-4 text-sm font-semibold text-gray-700"
					>
						<div class="mb-2 flex justify-between">
							<h3 class="text-xl font-semibold">Filter Rescues</h3>
							<Button
								@click="filters.showFilterDialog = !filters.showFilterDialog"
								icon-left="x"
								appearance="minimal"
								class="w-0"
							></Button>
						</div>
						<div class="flex flex-col gap-1">
							<Input
								label="Gender"
								v-model="filters.gender"
								type="select"
								:options="genderOptions"
							/>
						</div>
						<div class="flex flex-col gap-1">
							<span>State</span>
							<Autocomplete
								:options="stateOptions"
								v-model="filters.state"
								placeholder="Select State"
							/>
						</div>
						<HotspotFilter @setFilter="handleSetFilter" />

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
			</div> -->
		</ion-content>
	</ion-page>
</template>

<script lang="ts" setup>
import { ref, computed, reactive } from "vue"
import { createResource } from "frappe-ui"
import { IonPage, IonContent } from "@ionic/vue"
import { useRouter } from "vue-router"
import { IonItem, IonList, IonSelect, IonSelectOption } from "@ionic/vue"
import FormField from "./core/FormField.vue"
import { setPlatformHelpers } from "ionicons/dist/types/stencil-public-runtime"

const props = defineProps({
	doctype: {
		type: String,
		required: true,
	},
	filterConfig: {
		type: Object,
		required: false,
	},
	sort: {
		type: Object,
		required: false,
	},
})

const router = useRouter()
const documentMeta = ref(null)
const untransformedFilters = reactive({})

function initializeFilters() {
	if (props.filterConfig) {
		for (const fieldname of Object.keys(props.filterConfig)) {
			untransformedFilters[fieldname] = {
				type: null,
				value: null,
			}
		}
	}
}

initializeFilters()

// For debugging and testing

const filterFieldTypeOptionMap = {
	number: [">", "<", "="],
	link: ["="],
	select: ["="],
	data: ["like", "="],
}

function applyFilters() {
	fetchDocumentList()
}

function clearFilters() {
	initializeFilters()
	fetchDocumentList()
}

// filters.age = [props.doctype,filter_key,operator,filter_value]
// filters.push(["Rescue", "age", ">", 20])

const documents = createResource({
	url: "frappe.desk.reportview.get",
	cache: `${props.doctype}-DocumentList`,
	transform(d) {
		if (d.length === 0) {
			return []
		}

		// convert {"keys": ["k1", "k2"], "values": [["a", "b"]]} to [{"k1": "a", "k2": "b"}]
		const keys = d["keys"]
		const values = d["values"]
		const docs = values.map((value) => {
			const doc = {}
			keys.forEach((key, index) => {
				doc[key] = value[index]
			})
			return doc
		})
		return docs
	},
})

const doctypeMetaResource = createResource({
	params: {
		doctype: props.doctype,
	},
	url: "frappe.desk.form.load.getdoctype",
	cache: `${props.doctype}-Meta`,
	auto: true,
	onSuccess(data) {
		documentMeta.value = data["docs"][0]
		fetchDocumentList()
	},
})

function fetchDocumentList() {
	documents.submit(getResourceParamsForDocumentsList())
}

const fieldsToFetch = computed(() => {
	if (!documentMeta.value) {
		return []
	}
	const fields = documentMeta.value["fields"]
		.filter((docField) => docField.in_list_view)
		.map((docField) => docField.fieldname)

	if (!fields.includes("name")) {
		fields.push("name")
	}
	return fields
})

const titleFieldName = computed(() => {
	if (!documentMeta.value) {
		return null
	}
	return documentMeta.value["title_field"] ?? "name"
})

const imageFieldName = computed(() => {
	if (!documentMeta.value) {
		return null
	}
	return documentMeta.value["image_field"]
})

function getResourceParamsForDocumentsList() {
	// transform untransformedFilters to filters
	const filters = []
	for (const fieldname of Object.keys(untransformedFilters)) {
		const filter = untransformedFilters[fieldname]
		if (filter.type && filter.value) {
			filters.push([props.doctype, fieldname, filter.type, filter.value])
		}
	}
	return {
		doctype: props.doctype,
		fields: fieldsToFetch.value,
		filters,
	}
}

function getOptionForField(fieldname) {
	if (!documentMeta.value) {
		return null
	}
	const field = documentMeta.value["fields"].find(
		(docField) => docField.fieldname === fieldname
	)
	if (!field) {
		return null
	}

	if (field.options) {
		// split options by newline
		return field.options.split("\n")
	}
}
</script>
