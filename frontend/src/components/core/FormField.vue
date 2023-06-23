<template>
	<div v-if="props.type === 'link'">
		<span class="mb-2 block text-sm leading-4 text-gray-700">
			{{ props.label }}
		</span>
		<Autocomplete
			:value="modelValue"
			:placeholder="`Select ${props.doctype}`"
			:options="doctypeOptions"
			v-bind="$attrs"
			@change="(v) => emit('update:modelValue', v.value)"
		/>
	</div>

	<div v-else-if="props.type === 'datetime'">
		<span class="mb-2 block text-left text-sm leading-4 text-gray-700">
			{{ props.label }}
		</span>
		<input
			:value="modelValue"
			class="form-select block w-full"
			v-bind="$attrs"
			@change="(v) => emit('change', formatDateTime(v.target.value))"
			@input="(v) => emit('update:modelValue', formatDateTime(v.target.value))"
			@blur="onBlur"
			type="datetime-local"
		/>
	</div>

	<!-- Just to handle the attrs, maybe move to a separate component? -->
	<div v-bind="$attrs" v-else-if="props.type === 'geolocation'">
		<div v-if="props.modelValue">
			<span class="mb-2 block text-left text-sm leading-4 text-gray-700">
				{{ props.label }}
			</span>
			<a
				:href="`https://www.google.com/maps/search/?api=1&query=${coordinates.latitude}%2C${coordinates.longitude}`"
			>
				<div>
					<div
						class="flex w-fit items-center gap-2 rounded-lg bg-black py-2 px-5 text-white"
					>
						<FeatherIcon name="map" stroke-width="1.5" class="h-4 w-4" />
						<span class="text-sm">Open in Google Maps</span>
					</div>
				</div>
			</a>
		</div>
	</div>

	<div v-else-if="props.type === 'attach'">
		<!-- render file attach -->
		<span class="mb-2 block text-left text-sm leading-4 text-gray-700">
			{{ props.label }}
		</span>

		<div
			class="flex space-x-2"
			v-if="props.modelValue && typeof props.modelValue === 'string'"
		>
			<a :href="props.modelValue" class="text-blue-600">
				<div
					class="flex w-fit items-center gap-2 rounded-lg bg-black py-2 px-5 text-white"
				>
					<FeatherIcon name="download" class="h-4 w-4" />
					<span class="text-lg">Download Attachment</span>
				</div>
			</a>
			<Button
				class="rounded-lg text-lg"
				@click="handleAttachmentRemove"
				appearance="danger"
				>Remove</Button
			>
		</div>

		<input
			v-else
			class="text-lg text-gray-800 file:mr-2 file:rounded-lg file:border-0 file:py-2 file:px-5 file:text-base file:font-medium file:text-gray-800"
			type="file"
			accept="application/pdf"
			:value="modelValue"
			@change="handleFileSelect"
		/>
	</div>
	<div v-else-if="props.type === 'section-break'">
		<h2 class="pt-2 text-lg font-semibold">{{ props.label }}</h2>
	</div>
	<div v-else-if="props.type === 'textarea'">
		<span class="mb-2 block text-left text-sm leading-4 text-gray-700">
			{{ props.label }}
		</span>
		<textarea
			:value="modelValue"
			class="form-textarea block h-20 w-full"
			v-bind="$attrs"
			@input="(v) => emit('update:modelValue', v.target.value)"
			@change="(v) => emit('change', v.target.value)"
			@blur="onBlur"
		></textarea>
	</div>
	<div v-else-if="props.type === 'table'">
		<span class="mb-2 block text-left text-sm leading-4 text-gray-700">
			{{ props.label }}
		</span>
		<Button
			class="mb-3 rounded-lg text-lg"
			icon-left="plus"
			@click="handleChildAdd($event)"
			>Add Row
		</Button>
		<div class="rounded-xl border border-gray-300">
			<div>
				<div
					v-for="(row, index) in props.modelValue"
					:key="index"
					:class="[
						'px-4',
						'py-2',
						'flex',
						'justify-between',
						'text-lg',
						'items-center',
						'border-b',
						index === props.modelValue.length - 1
							? 'border-transparent pb-3'
							: 'border-gray-300',
						index === 0 ? 'pt-3' : '',
					]"
				>
					<div class="flex gap-3">
						<div>{{ row.idx }}.</div>
						<div class="flex flex-col">
							<div class="font-medium">
								{{ row.service_type }}
							</div>
							<div class="text-base">
								{{ row.comment }}
							</div>
						</div>
					</div>
					<div class="flex gap-2">
						<Button
							class="rounded-lg border border-gray-300 text-lg text-gray-600 drop-shadow-md"
							@click="handleRowEdit($event, row)"
							appearance="default"
							icon-left="edit"
							>Edit</Button
						>
						<Button
							icon="trash"
							appearance="danger"
							class="rounded-lg border border-gray-300 text-lg text-gray-600 drop-shadow-md"
							@click="handleRowDelete($event, row)"
						/>
					</div>
				</div>
			</div>
		</div>
	</div>
	<Input
		v-else
		:type="props.type"
		:value="modelValue"
		:label="props.label"
		:options="props.options"
		@input="(v) => emit('update:modelValue', v)"
		@change="(v) => emit('change', v)"
		@blur="onBlur"
		v-bind="$attrs"
	/>
	<!-- <pre>{{ childTableFields.data }}</pre> -->
	<!-- <pre>{{ selectedRow }}</pre> -->
	<!-- <pre>{{ props.modelValue }}</pre> -->

	<div v-if="props.type === 'table' && toggleChildDetail">
		<div
			class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 px-4"
		>
			<div class="z-10 w-full rounded-xl bg-white px-4 pt-2 pb-4">
				<div v-for="field in childTableFields.data">
					<Input
						:type="field.type"
						v-model="selectedRow[field.model]"
						:value="selectedRow[field.model]"
						:label="field.label"
						:options="field.options"
						@input="
							(v) => {
								selectedRow[field.model] = v
							}
						"
						@blur="onBlur"
						v-bind="$attrs"
						class="pt-3"
					/>
				</div>
				<Button
					class="mt-3 w-full rounded-lg text-lg"
					@click="updateChild"
					appearance="primary"
					>Save</Button
				>
			</div>
		</div>
	</div>
	<ErrorMessage
		v-if="validation?.meta?.touched"
		:message="validation?.errorMessage"
	/>
</template>

<script lang="ts" setup>
import { ref, computed, onMounted, inject, shallowRef } from "vue"
import { sessionInjectionKey } from "@/typing/InjectionKeys"
import FormField from "@/components/core/FormField.vue"
import {
	Autocomplete,
	ErrorMessage,
	createResource,
	Button,
	FeatherIcon,
} from "frappe-ui"
import { SchemaFormWithValidation } from "@/utils/form"

const props = defineProps({
	type: String,
	modelValue: [String, Number, Boolean, Object, Array],
	config: Object,
	validation: {
		type: Object,
		default: () => ({}),
	},
	doctype: String,
	label: String,
	options: Array,
	readOnly: Boolean,
	formDocType: String,
})

const emit = defineEmits(["input", "change", "update:modelValue"])
const session = inject(sessionInjectionKey)

let currentUser = ref()
let doctypeList = ref([])
let toggleChildDetail = ref(false)
let childTableMeta = ref({ data: { docs: [] } })
let selectedRow = ref({})
let childTableFields = ref({})
let newRow = ref({})

const doctypeOptions = computed(() => {
	if (props.doctype && doctypeList.value.data) {
		return doctypeList.value.data
	}

	return []
})

function formatDateTime(value) {
	const [date, time] = value.split(" ")
	const [day, month, year] = date.split("-")
	const [hours, minutes] = time.split(":")
	const formattedValue = `${day}-${month}-${year} ${hours}:${minutes}`
	return formattedValue
}

function onBlur() {
	props.validation.setTouched(true)
}

function handleGeoLocationFetchError() {
	// console.error(e)
	alert("Error getting device location!")
}

function getFormattedGeolocation(geoCoordinates: {
	latitude: number
	longitude: number
}): string {
	return `{"type":"FeatureCollection","features":[{"type":"Feature","properties":{},"geometry":{"type":"Point","coordinates":[${geoCoordinates.latitude},${geoCoordinates.longitude}]}}]}`
}

function extractCoordinatesFromString(featureString) {
	// feature string: {"type":"FeatureCollection","features":[{"type":"Feature","properties":{},"geometry":{"type":"Point","coordinates":[${geoCoordinates.latitude},${geoCoordinates.longitude}]}}]}
	const feature = JSON.parse(featureString)
	const coordinates = feature.features[0].geometry.coordinates
	return {
		latitude: coordinates[0],
		longitude: coordinates[1],
	}
}

const coordinates = computed(() => {
	if (!props.modelValue && props.type === "geolocation") {
		return {
			latitude: 0,
			longitude: 0,
		}
	}

	return extractCoordinatesFromString(props.modelValue)
})

const handleFile = (file) => {
	console.log(file)
}

const handleRowEdit = (e, row) => {
	e.preventDefault()
	selectedRow.value = row
	toggleChildDetail.value = !toggleChildDetail.value
	console.log(row)
}

const handleChildAdd = (e) => {
	e.preventDefault()
	selectedRow.value = newRow.value
	toggleChildDetail.value = !toggleChildDetail.value
}

function addChild() {
	props.modelValue.push(newRow.value)
	newRow.value = {}
	toggleChildDetail.value = false
}

const updateChild = (e) => {
	e.preventDefault()
	if (!selectedRow.value.name) {
		addChild()
	}
	toggleChildDetail.value = false
}

const handleRowDelete = (e, row) => {
	e.preventDefault()
	const index = props.modelValue.indexOf(row)
	if (index > -1) {
		props.modelValue.splice(index, 1)
	}
}

onMounted(() => {
	if (props.type === "link" && props.doctype) {
		if (props.doctype === "User") {
			currentUser.value = session.user
			emit("update:modelValue", currentUser.value)
		}
		doctypeList.value = createResource({
			url: "changemakers.api.get_doctype_options",
			params: {
				doctype: props.doctype,
			},
			pageLength: 100,
			transform: (data) => {
				const titleField = data.title_field
				return data.docs.map((doc) => ({
					label: doc[titleField],
					value: doc.name,
				}))
			},
		})
		doctypeList.value.reload()
	}

	if (props.readOnly) {
	}

	if (props.type === "datetime") {
		const currentDate = new Date()
		emit("update:modelValue", currentDate.toISOString().slice(0, 16))
	}

	if (props.type === "geolocation" && !props.modelValue) {
		//fetch geolocation
		navigator.geolocation.getCurrentPosition((position) => {
			emit("update:modelValue", getFormattedGeolocation(position.coords))
		}, handleGeoLocationFetchError)
	}

	if (props.type === "table") {
		interface DocField {
			label: string
			fieldname: string
			idx: number
			fieldtype: string
			reqd?: boolean
			default: string
			options: string
			read_only?: boolean
		}

		childTableMeta = createResource({
			params: {
				doctype: props.doctype,
			},
			url: "frappe.desk.form.load.getdoctype",
			auto: true,
		})

		childTableFields = createResource({
			url: "changemakers.api.get_form_fields",
			params: {
				doctype: props.doctype,
			},
			auto: true,
			transform(fields: Array<DocField>) {
				const FIELDTYPE_TYPE_MAP = {
					Data: "text",
					Int: "number",
					Check: "checkbox",
					Link: "link",
					Select: "select",
					Datetime: "datetime",
					Geolocation: "geolocation",
					Attach: "attach",
					"Small Text": "textarea",
					"Section Break": "section-break",
					Table: "table",
					Text: "textarea",
				}
				return fields.map((field) => ({
					formDocType: props.doctype,
					label: field.label,
					model: field.fieldname,
					component: shallowRef(FormField),
					required: Boolean(field.reqd),
					default: field.default,
					type: FIELDTYPE_TYPE_MAP[field.fieldtype],
					doctype: field.options,
					readOnly: Boolean(field.read_only),
					options:
						(field.fieldtype != "Link" &&
							field.options &&
							field.options.split("\n")) ||
						[],
				}))
			},
		})
	}
})

const handleFileSelect = async (e) => {
	emit("update:modelValue", e.target.files[0])
}

const handleAttachmentRemove = (e) => {
	e.preventDefault()
	emit("update:modelValue", null)
}
</script>
