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
import {
	useFileUploaderResource,
	FileAttachmentUploader,
} from "@/composables/index"
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
	read_only?: boolean
}

const document = createDocumentResource({
	doctype: props.doctype,
	name: props.id,
	fields: "*",
})

let formModel = ref({})
let attachedImages = []
let attachedFiles = []

const isExistingDoc = computed(() => {
	return Boolean(props.id)
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
		console.log(fields)
		const FIELDTYPE_TYPE_MAP = {
			Data: "text",
			Int: "number",
			Check: "checkbox",
			Link: "link",
			Select: "select",
			Datetime: "datetime",
			Geolocation: "geolocation",
			Attach: "attach",
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

const DocTypeList = createListResource({
	doctype: props.doctype,
	insert: {
		async onSuccess(d) {
			await uploadAllImages(d.doctype, d.name)

			// upload file attachments
			for (const file of attachedFiles) {
				if (!file.uploaded) {
					await uploadFileAttachment(d.doctype, d.name, file.model, file.value)
					file.uploaded = true
				}
			}

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

async function uploadFileAttachment(doctype, docname, fieldname, file) {
	// e.target.files[0]
	try {
		const fileAttachmentUploader = new FileAttachmentUploader(file)
		fileAttachmentUploader.upload(doctype, docname, fieldname, (fileDoc) => {
			console.log(
				"File URL : " +
					fileDoc.file_url +
					"\n Name: " +
					fileDoc.attached_to_name
			)
			DocTypeList.setValue.submit({
				name: fileDoc.attached_to_name,
				[fieldname]: fileDoc.file_url,
				onSuccess: () => {
					console.log("DocType field updated.")
				},
			})
		})
		console.log(fileAttachmentUploader.loading)
		return fileAttachmentUploader.promise
	} catch (e) {
		console.error("unable to read file from system")
	}
}

function handleCreateNew() {
	// remove attachments from the form model
	// so that they don't get submitted
	const fileAttachmentFieldNames = attachedFiles.map((file) => file.model)

	formModel.value = Object.fromEntries(
		Object.entries(formModel.value).filter(
			([key, value]) => !fileAttachmentFieldNames.includes(key)
		)
	)

	DocTypeList.insert.submit(formModel.value)
}

async function handleUpdate() {
	if (document) {
		// upload file attachments
		for (const file of attachedFiles) {
			if (!file.uploaded) {
				await uploadFileAttachment(
					props.doctype,
					props.id,
					file.model,
					file.value
				)
				file.uploaded = true
			}
		}

		const fileAttachmentFieldNames = attachedFiles.map((file) => file.model)
		formModel.value = Object.fromEntries(
			Object.entries(formModel.value).filter(
				([key, value]) => !(fileAttachmentFieldNames.includes(key) && value)
			)
		)

		await document.setValue.submit(formModel.value)

		await document.get.promise
		formModel.value = document.doc

		router.back()
	}
}

function handleFormSubmit() {
	// Get the file attachment fields from this form
	// and upload them
	const fileAttachmentFieldNames = formFields.data
		.filter((field) => field.type === "attach")
		.map((field) => field.model)

	const fileAttachmentFields = fileAttachmentFieldNames.map((fieldName) => {
		const field = formModel.value[fieldName]
		return {
			model: fieldName,
			value: field,
			uploaded: false,
		}
	})

	// append fileAttachmentFields to attachedFiles
	attachedFiles = fileAttachmentFields

	if (!props.id) {
		handleCreateNew()
	} else {
		console.log("UPDATE: form submitted")
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
