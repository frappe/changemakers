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
			@change="(v) => emit('change', v.target.value)"
			@input="(v) => emit('update:modelValue', v.target.value)"
			@blur="onBlur"
			type="datetime-local"
		/>
	</div>

	<!-- Just to handle the attrs, maybe move to a separate component? -->
	<div v-bind="$attrs" v-else-if="props.type === 'geolocation'">
		<!-- automatically set the geolocation -->
	</div>

	<div v-else-if="props.type === 'attach'">
		<!-- render file attach -->
		<span class="mb-2 block text-left text-sm leading-4 text-gray-700">
			{{ props.label }}
		</span>

		<div
			class="space-x-2"
			v-if="props.modelValue && typeof props.modelValue === 'string'"
		>
			<a :href="props.modelValue" class="text-blue-600"
				>Open {{ props.modelValue }}</a
			>
			<Button @click="handleAttachmentRemove" appearance="danger"
				>Remove</Button
			>
		</div>

		<input
			v-else
			type="file"
			accept="application/pdf"
			:value="modelValue"
			@change="handleFileSelect"
		/>
	</div>

	<Input
		v-else
		:readonly="props.readOnly"
		:type="props.type"
		:value="modelValue"
		:label="props.label"
		:options="props.options"
		@input="(v) => emit('update:modelValue', v)"
		@change="(v) => emit('change', v)"
		@blur="onBlur"
		v-bind="$attrs"
	/>

	<ErrorMessage
		v-if="validation?.meta?.touched"
		:message="validation?.errorMessage"
	/>
</template>

<script lang="ts" setup>
import { ref, computed, onMounted, inject } from "vue"
import { sessionInjectionKey } from "@/typing/InjectionKeys"
import write_blob from "capacitor-blob-writer"
import { Geolocation } from "@capacitor/geolocation"
import { Filesystem, Directory } from "@capacitor/filesystem"
import { FileOpener, FileOpenerPlugin } from "@capacitor-community/file-opener"

import {
	Autocomplete,
	ErrorMessage,
	createResource,
	FileUploader,
	Button,
	toast,
} from "frappe-ui"
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

import { CapacitorHttp } from "@capacitor/core"

const emit = defineEmits(["input", "change", "update:modelValue"])
const session = inject(sessionInjectionKey)

let doctypeList = ref([])

const doctypeOptions = computed(() => {
	if (props.doctype && doctypeList.value.data) {
		return doctypeList.value.data
	}

	return []
})

function onBlur() {
	props.validation.setTouched(true)
}

function handleGeoLocationFetchError(e) {
	console.error(e)
	// alert("Error getting device location!")
}

function getFormattedGeolocation(geoCoordinates: {
	latitude: number
	longitude: number
}): string {
	return `{"type":"FeatureCollection","features":[{"type":"Feature","properties":{},"geometry":{"type":"Point","coordinates":[${geoCoordinates.latitude},${geoCoordinates.longitude}]}}]}`
}

const handleFile = (file) => {
	console.log(file)
}

onMounted(() => {
	if (props.type === "link" && props.doctype) {
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

	if (props.type === "geolocation") {
		Geolocation.getCurrentPosition()
			.then((position) => {
				emit("update:modelValue", getFormattedGeolocation(position.coords))
			})
			.catch(handleGeoLocationFetchError)
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
