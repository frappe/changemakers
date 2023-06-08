<template>
	<div class="mb-5 space-y-4 px-4 py-3">
		<h2 class="text-base text-gray-600">
			{{ props.previewMode ? "Image Attachments" : "Attach Images" }}
		</h2>
		<!-- Capture Button + Preview of captured images -->
		<div
			class="grid w-full grid-cols-5 items-center justify-between object-center"
		>
			<a
				target="_blank"
				v-for="image in images"
				:key="image.filename"
				:href="image.url"
			>
				<img
					class="h-16 w-16 rounded-lg object-cover shadow-md"
					:src="image.url"
				/>
			</a>

			<button
				@click="takePicture"
				v-if="images.length < 5 && !props.previewMode"
				class="flex h-16 w-16 items-center justify-center rounded-lg shadow-md"
			>
				<PhCameraPlus size="24" color="#74808B" />
			</button>
		</div>
		<div
			v-if="images?.length == 0 && props.previewMode"
			class="flex justify-center align-middle text-sm text-gray-600"
		>
			No Attachments
		</div>
		<Button
			v-if="!props.previewMode"
			@click="handleComplete"
			appearance="primary"
			>{{ images.length > 0 ? "Next" : "Skip" }}</Button
		>
	</div>
</template>

<script lang="ts" setup>
import { Filesystem, Directory } from "@capacitor/filesystem"
import { Camera, CameraResultType, CameraSource } from "@capacitor/camera"
import { computed, reactive, ref, unref, onMounted, inject } from "vue"
import { nanoid } from "nanoid"
import { PhCameraPlus } from "@phosphor-icons/vue"
import {
	useFileUploaderResource,
	FileAttachmentUploader,
} from "@/composables/index"
import { createResource } from "frappe-ui"
import { sessionInjectionKey } from "@/typing/InjectionKeys"

const session = inject(sessionInjectionKey)

const imageSource = ref()
const images = reactive([])

const props = defineProps({
	previewMode: {
		type: Boolean,
		default: false,
	},
	doctype: {
		type: String,
		required: true,
	},
	id: {
		type: String,
		required: false,
	},
})

let attachedImages = createResource({
	url: "changemakers.api.get_attached_images",
	params: {
		doctype: props.doctype,
		name: props.id,
	},
	onSuccess(d) {
		images.push(...d)
	},
})

onMounted(() => {
	if (props.id) {
		attachedImages.fetch()
	}
})

const emit = defineEmits(["complete"])

const takePicture = async () => {
	const image = await Camera.getPhoto({
		allowEditing: false,
		resultType: CameraResultType.Base64,
		source: CameraSource.Prompt,
	})

	// Can be set to the src of an image now
	imageSource.value = "data:image/png;base64, " + image.base64String

	// save the file
	const filename = `${props.doctype}-photo-${nanoid()}.jpeg`

	try {
		const savedPhotoFile = await Filesystem.writeFile({
			path: filename,
			data: image.base64String,
			directory: Directory.Data,
		})

		const imageData = await getBase64ImageFromFileSystem(savedPhotoFile.uri)
		images.push({
			filename: filename,
			data: `data:image/jpeg;base64,${imageData}`,
			uploaded: false,
			base64String: imageData,
		})
	} catch (e) {
		alert("Error saving or loading image file")
		console.error(e)
	}
}

// TODO: Rename to a generic utility
const getBase64ImageFromFileSystem = async (uri) => {
	const file = await Filesystem.readFile({ path: uri })
	return file.data
}

const handleComplete = () => {
	emit("complete", { images: unref(images) })
}

// TODO
// How the UX should look like? (robust, fault-tolerate)

// 1. Let them attach the photos (max 5) first
// 2. Store in file storage
// 3. Use K-V store to store those as array
//      * with key "<doctype>:new:attachments"
//      * mark every photo un-uploaded
// 4. Show Form View
// 5. On create, save the form to backend
// 6. Get the "name" of the newly created doctype
// 7. Upload the photos one by one
//      * mark them as uploaded after
</script>
