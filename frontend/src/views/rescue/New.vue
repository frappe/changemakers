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
					class="p-4 mb-9"
					@submit="handleCreateNew"
					:schema="formFields.data"
				>
					<template #afterForm="{ validation }">
						<div
							class="bg-white p-2 w-full fixed bottom-0 flex flex-row justify-end items-center"
						>
							<Button
								class="mr-5"
								appearance="primary"
								:loading="validation.isSubmitting"
								>Create</Button
							>
						</div>
					</template>
				</SchemaFormWithValidation>
			</div>
		</ion-content>
	</ion-page>
</template>

<script lang="ts" setup>
import { ref, shallowRef } from "vue"
import { createResource } from "frappe-ui"
import { useSchemaForm } from "formvuelate"
import { SchemaFormWithValidation } from "@/utils/form"
import * as yup from "yup"
import FormField from "@/components/core/FormField.vue"
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

const formFields = createResource({
	url: "changemakers.api.get_form_fields",
	cache: "RescueFormFields",
	params: {
		doctype: "Rescue",
	},
	transform(fields: Array<DocField>) {
		const FIELDNAME_VALIDATION_MAP = {
			age: yup.number().lessThan(200).positive(),
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

function handleCreateNew() {
	console.log(formModel)
}

formFields.reload()
</script>
