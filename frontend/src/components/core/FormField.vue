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

	<ErrorMessage
		v-if="validation.meta.touched"
		:message="validation.errorMessage"
	/>
</template>

<script lang="ts" setup>
import { ref, computed, onMounted } from "vue"
import { Autocomplete, ErrorMessage, createResource } from "frappe-ui"
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
})

const emit = defineEmits(["input", "change", "update:modelValue"])

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

function handleGeoLocationFetchError() {
	alert("Please enable location access to proceed")
}

function getFormattedGeolocation(geoCoordinates: {
	latitude: number
	longitude: number
}): string {
	return `{"type":"FeatureCollection","features":[{"type":"Feature","properties":{},"geometry":{"type":"Point","coordinates":[${geoCoordinates.latitude},${geoCoordinates.longitude}]}}]}`
}

onMounted(() => {
	if (props.type === "link" && props.doctype) {
		doctypeList.value = createResource({
			url: "changemakers.api.get_doctype_options",
			params: {
				doctype: props.doctype,
			},
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

	if (props.type === "geolocation") {
		// fetch geolocation
		navigator.geolocation.getCurrentPosition((position) => {
			emit("update:modelValue", getFormattedGeolocation(position.coords))
		}, handleGeoLocationFetchError)
	}
})
</script>
