<template>
	<ion-page>
		<ion-header class="bg-white">
			<div class="flex flex-row items-center p-4">
				<ion-title class="text-gray-900 font-semibold text-xl p-0">
					New Rescue
				</ion-title>
			</div>
		</ion-header>
		<ion-content :fullscreen="true">
			<div
				v-if="!formFields.loading && formFields.data"
				class="bg-white relative"
			>
				<SchemaFormWithValidation
					@submit="handleCreateNew"
					class="p-4 mb-9 space-y-2"
					:schema="formFields.data"
				>
					<template>
						<Button
							class="mt-5"
							appearance="primary"
							:loading="RescueList.insert.loading"
							>Create</Button
						>
					</template>
				</SchemaFormWithValidation>
			</div>
		</ion-content>
	</ion-page>
</template>

<script lang="ts" setup>
import * as yup from "yup"
import { ref, shallowRef } from "vue"
import { useRouter } from "vue-router"
import { useSchemaForm } from "formvuelate"
import { SchemaFormWithValidation } from "@/utils/form"
import FormField from "@/components/core/FormField.vue"
import { createResource, createListResource } from "frappe-ui"
import { IonPage, IonContent, IonHeader, IonTitle } from "@ionic/vue"

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
	cache: "RescueFormFields",
	params: {
		doctype: "Rescue",
	},
	transform(fields: Array<DocField>) {
		const FIELDNAME_VALIDATION_MAP = {
			age: yup.number().lessThan(200).positive().notRequired(),
		}

		const FIELDTYPE_TYPE_MAP = {
			Data: "text",
			Int: "number",
			Check: "checkbox",
		}

		return fields.map((field) => ({
			label: field.label,
			model: field.fieldname,
			component: shallowRef(FormField),
			required: Boolean(field.reqd),
			default: field.default,
			type: FIELDTYPE_TYPE_MAP[field.fieldtype],
			validations: FIELDNAME_VALIDATION_MAP[field.fieldname],
		}))
	},
})

const RescueList = createListResource({
	doctype: "Rescue",
	insert: {
		onSuccess() {
			router.back()
		},
	},
})

function handleCreateNew() {
	RescueList.insert.submit(formModel.value)
}

formFields.reload()
</script>
