<template>
	<div v-if="!formFields.loading && formFields.data" class="relative bg-white">
		<SchemaFormWithValidation
			@submit="handleCreateNew"
			class="mb-9 space-y-2 p-4"
			:schema="formFields.data"
		>
			<template #afterForm>
				<ErrorMessage :message="DocTypeList.insert.error" />
				<Button
					class="mt-5"
					appearance="primary"
					:loading="DocTypeList.insert.loading"
					>Create</Button
				>
			</template>
		</SchemaFormWithValidation>
	</div>
</template>

<script lang="ts" setup>
import * as yup from "yup"
import { ref, shallowRef } from "vue"
import { useRouter } from "vue-router"
import { useSchemaForm } from "formvuelate"
import { SchemaFormWithValidation } from "@/utils/form"
import FormField from "@/components/core/FormField.vue"
import { createResource, createListResource } from "frappe-ui"

const props = defineProps({
	doctype: {
		type: String,
		required: true,
	},
})

interface DocField {
	label: string
	fieldname: string
	idx: number
	fieldtype: string
	reqd?: boolean
	default: string
	options: string
}

const formModel = ref({})
useSchemaForm(formModel)

const router = useRouter()

const formFields = createResource({
	url: "changemakers.api.get_form_fields",
	cache: `${props.doctype}-FormFields`,
	params: {
		doctype: props.doctype,
	},
	transform(fields: Array<DocField>) {
		// TODO: this has to be dynamic as well somehow
		// Maybe each form can pass extra validations

		// const FIELDNAME_VALIDATION_MAP = {
		// 	age: yup.number().lessThan(200).positive().notRequired(),
		// }

		const FIELDTYPE_TYPE_MAP = {
			Data: "text",
			Int: "number",
			Check: "checkbox",
			Link: "link",
			Select: "select",
			Datetime: "datetime",
			Geolocation: "geolocation",
		}

		return fields.map((field) => ({
			label: field.label,
			model: field.fieldname,
			component: shallowRef(FormField),
			required: Boolean(field.reqd),
			default: field.default,
			type: FIELDTYPE_TYPE_MAP[field.fieldtype],
			doctype: field.options,
			options:
				(field.fieldtype != "Link" &&
					field.options &&
					field.options.split("\n")) ||
				[],
		}))
	},
})

const DocTypeList = createListResource({
	doctype: props.doctype,
	insert: {
		onSuccess() {
			router.back()
		},
	},
})

function handleCreateNew() {
	DocTypeList.insert.submit(formModel.value)
}

formFields.reload()
</script>
