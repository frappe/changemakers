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
			@change="(v) => emit('update:modelValue', v)"
		/>
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
})
</script>
