<template>
	<Input
		:type="props.type"
		:value="modelValue"
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
import { ErrorMessage } from "frappe-ui"

const props = defineProps({
	type: String,
	modelValue: [String, Number, Boolean, Object, Array],
	config: Object,
	validation: {
		type: Object,
		default: () => ({}),
	},
})

const emit = defineEmits(["input", "change", "update:modelValue"])

function onBlur() {
	props.validation.setTouched(true)
}
</script>
