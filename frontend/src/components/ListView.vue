<template>
	<ion-page>
		<ion-content :fullscreen="true">
			<!-- Header -->
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
					<h2 class="p-0 text-2xl font-semibold text-gray-900">
						{{ doctype }}
					</h2>
				</div>
				<RouterLink
					v-if="documents.data"
					:to="{ name: `New${doctype}Form` }"
					v-slot="{ navigate }"
				>
					<Button @click="navigate" appearance="primary" icon-left="plus"
						>New</Button
					>
				</RouterLink>
			</div>
			<pre>{{}}</pre>
			<div class="flex flex-col px-5 pt-4">
				<div class="flex flex-row items-center space-x-2">
					<div class="flex w-full items-center rounded-xl bg-white">
						<Input
							type="text"
							:placeholder="`Search ${doctype}`"
							icon-left="search"
							class="w-full rounded-xl bg-white p-[5px] focus:bg-white"
							@input="(v) => (searchQuery = v)"
							@change="searchDocuments"
							:modelValue="searchQuery"
						/>
						<div>
							<Button
								v-if="searchQuery"
								class="rounded-xl"
								icon="x"
								appearance="minimal"
								@click="clearSearch"
							/>
						</div>
					</div>

					<div class="relative">
						<Button
							appearance="white"
							icon="filter"
							class="h-full w-fit rounded-[12px] px-3 py-3"
							@click="toggleShowFilters"
						></Button>

						<div
							v-if="areFiltersApplied"
							class="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-700"
						></div>
					</div>
				</div>
			</div>
			<!-- If data is visible -->
			<div
				v-if="documentMeta.meta && documents.data && documents.data.length > 0"
				class="flex flex-col p-5"
			>
				<div v-for="(data, index) in documents.data" :key="data.name">
					<router-link
						custom
						:to="{ name: `${doctype}Form`, params: { id: data.name } }"
						v-slot="{ href, navigate }"
					>
						<a
							class="flex w-full flex-row items-center justify-between gap-[14px] border-b-[1px] bg-white px-4 py-3"
							:class="{
								'rounded-t-xl': index === 0,
								'rounded-b-xl': index === documents.data.length - 1,
							}"
							:href="href"
							@click="navigate"
						>
							<div class="flex flex-row items-center justify-start gap-[14px]">
								<FrappeIcons.RescueIcon
									v-if="doctype === 'Rescue'"
									class="text-gray-700"
								/>
								<FrappeIcons.BeneficiaryIcon
									v-else-if="doctype === 'Beneficiary'"
									class="text-gray-700"
								/>
								<FeatherIcon
									v-else-if="doctype === 'Entitlement Request'"
									class="h-5 w-5 text-gray-700"
									name="clipboard"
								/>
								<FrappeIcons.AwarenessCampIcon
									v-else-if="doctype === 'Awareness Camp Record'"
									class="h-6 w-6 text-gray-700"
								/>
								<div class="flex flex-col">
									<h1 class="text-lg font-semibold text-gray-700">
										{{ data[titleFieldName] }}
									</h1>
									<h4 class="space-x-1 divide-x-2 text-base text-gray-600">
										<span
											v-for="fieldname in fieldsToFetch.filter(
												(field) => field !== titleFieldName
											)"
											:key="fieldname"
										>
											{{ data[fieldname] }}
										</span>
									</h4>
								</div>
							</div>
							<div>
								<FeatherIcon
									class="h-[18px] w-[18px] text-gray-700"
									name="chevron-right"
								/>
							</div>
						</a>
					</router-link>
				</div>
			</div>
			<!-- Empty state when no data in search only -->
			<div
				v-if="searchQuery && documents.data && documents.data.length === 0"
				class="flex h-3/4 flex-col items-center justify-center gap-y-1.5"
			>
				<h3 class="font-medium text-gray-800">
					No {{ doctype.toLowerCase() }} found
				</h3>
				<p class="text-sm text-gray-600">
					Hmm... It seems theres no record like that!
				</p>
			</div>

			<!-- If there is no data -->
			<div
				v-else-if="!documents.data || documents.data.length === 0"
				class="flex h-3/4 flex-col items-center justify-center gap-y-1.5"
			>
				<h3 class="font-medium">No {{ doctype.toLowerCase() }} yet</h3>
				<RouterLink
					:to="{ name: `New${doctype}Form` }"
					v-slot="{ navigate }"
					class="flex w-full justify-center"
				>
					<Button
						@click="navigate"
						appearance="primary"
						icon-left="plus"
						class="h-10 w-fit"
						>Add {{ doctype }}</Button
					>
				</RouterLink>
			</div>

			<!-- FILTERS -->
			<div
				v-if="showFilters"
				class="fixed inset-0 z-50 flex items-end justify-center bg-black bg-opacity-50"
			>
				<div class="flex h-fit w-full flex-col rounded-t-xl bg-white p-5">
					<div class="flex justify-between">
						<h2 class="font-semibold text-gray-800">Filters</h2>
						<Button @click="toggleShowFilters" icon="x" appearance="minimal">
						</Button>
					</div>
					<div
						class="px-2 py-1"
						v-for="fieldname in Object.keys(props.filterConfig)"
						:key="fieldname"
					>
						<span class="text-lg font-medium text-gray-800">{{
							fieldname.charAt(0).toUpperCase() +
							fieldname.slice(1).toLowerCase()
						}}</span>

						<div class="flex items-center gap-4">
							<ion-list class="h-[28px] w-1/3 rounded-lg p-0">
								<ion-item class="w-full rounded-md">
									<ion-select
										class="-top-4 m-0 appearance-none rounded-md text-base"
										:aria-label="fieldname"
										interface="action-sheet"
										placeholder="Select"
										:value="
											filterFieldTypeOptionMap[
												props.filterConfig[fieldname]['type']
											][0]
										"
										v-model="untransformedFilters[fieldname].type"
									>
										<ion-select-option
											class="m-0 p-0 text-base"
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
							<div class="h-fit w-full">
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
					</div>
					<div class="flex flex-col gap-2 py-3">
						<Button appearance="primary" @click="applyFilters"
							>Apply Filters</Button
						>
						<Button @click="clearFilters">Clear Filters</Button>
					</div>
				</div>
			</div>
		</ion-content>
	</ion-page>
</template>

<script lang="ts" setup>
import { ref, computed, reactive, watch } from "vue"
import { createResource, FeatherIcon } from "frappe-ui"
import { IonPage, IonContent, IonModal } from "@ionic/vue"
import { useRouter } from "vue-router"
import { IonItem, IonList, IonSelect, IonSelectOption } from "@ionic/vue"
import FormField from "./core/FormField.vue"
import { FrappeIcons } from "./icons"

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
	searchField: {
		type: String,
		default: "name",
	},
})

console.log(props.searchField)

const router = useRouter()
const documentMeta = reactive({ meta: null })
const untransformedFilters = reactive({})
const searchQuery = ref("")
const showFilters = ref(false)

function toggleShowFilters() {
	showFilters.value = !showFilters.value
}

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

const filterFieldTypeOptionMap = {
	number: [">", "<", "="],
	link: ["="],
	select: ["="],
	data: ["like", "="],
}

function applyFilters() {
	fetchDocumentList()
	toggleShowFilters()
	areFiltersApplied.value = true
}

function clearFilters() {
	initializeFilters()
	fetchDocumentList()
	toggleShowFilters()
	areFiltersApplied.value = false
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
	auto: true,
	onSuccess(data) {
		documentMeta.meta = data["docs"][0]
		fetchDocumentList()
	},
})

function fetchDocumentList() {
	documents.submit(getResourceParamsForDocumentsList())
}

const fieldsToFetch = computed(() => {
	if (!documentMeta.meta) {
		return []
	}
	const fields = documentMeta.meta["fields"]
		.filter((docField) => docField.in_list_view)
		.map((docField) => docField.fieldname)

	if (!fields.includes("name")) {
		fields.push("name")
	}
	return fields
})

const titleFieldName = computed(() => {
	return documentMeta.meta?.title_field ?? "name"
})

const imageFieldName = computed(() => {
	if (!documentMeta.meta) {
		return null
	}
	return documentMeta.meta["image_field"]
})

const areFiltersApplied = ref(false)

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
	if (!documentMeta.meta) {
		return null
	}
	const field = documentMeta.meta["fields"].find(
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

function searchDocuments() {
	if (searchQuery.value) {
		documents.submit({
			doctype: props.doctype,
			fields: fieldsToFetch.value,
			filters: [
				[props.doctype, props.searchField, "like", `%${searchQuery.value}%`],
			],
		})
	} else {
		fetchDocumentList()
	}
}

function clearSearch() {
	searchQuery.value = ""
	searchDocuments()
}
</script>
