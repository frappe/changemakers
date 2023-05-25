<template>
	<div class="relative bg-white">
		<PhotoAttach
			:previewMode="isExistingDoc || isImageAttachStepComplete"
			:doctype="props.doctype"
			:id="props.id"
			@complete="handleImageAttachComplete"
		/>

		<template
			v-if="(isExistingDoc || isImageAttachStepComplete) && formIsReady"
		>
			<SchemaFormWithValidation
				@submit="handleFormSubmit"
				class="mb-9 space-y-2 p-4"
				:schema="formFields.data"
			>
				<template #afterForm>
					<ErrorMessage
						:message="
							document?.get?.error ||
							document?.setValue?.error ||
							DocTypeList.insert.error
						"
					/>
					<Button
						class="mt-5"
						appearance="primary"
						:loading="DocTypeList.insert.loading || document?.setValue.loading"
					>
						{{ props.submitButtonLabel }}
					</Button>
				</template>
			</SchemaFormWithValidation>
		</template>

		<!-- Loading Indicator -->
		<div
			v-else-if="
				!((isExistingDoc || isImageAttachStepComplete) && formIsReady) &&
				isExistingDoc
			"
			class="flex h-64 items-center justify-center"
		>
			<LoadingIndicator class="w-8 text-blue-500" />
		</div>
	</div>
</template>

<script lang="ts" setup>
import { computed, onMounted, ref, shallowRef } from "vue"
import { useRouter } from "vue-router"
import { useSchemaForm } from "formvuelate"
import { SchemaFormWithValidation } from "@/utils/form"
import FormField from "@/components/core/FormField.vue"
import {
	createResource,
	createListResource,
	createDocumentResource,
	ErrorMessage,
	LoadingIndicator,
	toast,
} from "frappe-ui"
import { useFileUploaderResource } from "@/composables/index"
import PhotoAttach from "@/components/PhotoAttach.vue"

const props = defineProps({
	doctype: {
		type: String,
		required: true,
	},
	id: {
		type: String,
		required: false,
	},
	submitButtonLabel: {
		type: String,
		required: false,
		default: "Create",
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

const document = createDocumentResource({
	doctype: props.doctype,
	name: props.id,
	fields: "*",
})

let formModel = ref({})
let attachedImages = []
const isExistingDoc = computed(() => {
	if (props.id) {
		return true
	}
	return false
})

const isImageAttachStepComplete = ref(false)

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
		onSuccess(d) {
			console.log(d)
			uploadAllImages(d.doctype, d.name)
			router.back()
		},
		onError() {
			console.log("Error creating a new rescue")
		},
	},
})

const uploadImage = async (doctype, name, fileName, base64ImageString) => {
	const imageUploader = useFileUploaderResource({
		content: base64ImageString,
		documentType: doctype,
		documentName: name,
		fileName,
	})
	imageUploader.submit()
}

async function uploadAllImages(documentType, documentName) {
	for (const image of attachedImages) {
		if (!image.uploaded) {
			await uploadImage(
				documentType,
				documentName,
				image.filename,
				image.base64String
			)
			image.uploaded = true
		}
		console.log(image.uploaded)
	}
}

function handleCreateNew() {
	DocTypeList.insert.submit(formModel.value)
}

function handleUpdate() {
	if (document) {
		document.setValue.submit(formModel.value)

		// Maybe show an alert
		router.back()
	}
}

function handleFormSubmit() {
	if (!props.id) {
		handleCreateNew()
	} else {
		handleUpdate()
	}
}

onMounted(async () => {
	if (props.id) {
		await document.get.promise
		await formFields.promise
		formModel.value = document.doc
	}
})

const formIsReady = computed(() => {
	if (!props.id) {
		return !formFields.loading && formFields.data
	}

	return document && !document.get.loading && document.doc
})

formFields.reload()

const handleImageAttachComplete = ({ images }) => {
	attachedImages = images // TODO: Maybe save to preferences for retry
	isImageAttachStepComplete.value = true
	console.log(`${images.length} images attached.`)
}
</script>
