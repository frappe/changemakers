<template>
	<div class="mb-5 space-y-4 px-4 py-3">
		<h2 class="text-base text-gray-600">
			{{ props.previewMode ? "Image Attachments" : "Attach Images" }}
		</h2>

		<!-- Capture Button + Preview of captured images -->
		<div
			class="grid w-full grid-cols-5 items-center justify-between object-center"
		>
			<div v-for="(image, index) in images" :key="image.filename">
				<!-- remove image button -->
				<div
					v-if="!props.id"
					@click="handleImageRemove(index)"
					class="mb-2 flex h-6 w-6 cursor-pointer items-center justify-center rounded-full bg-white shadow-md"
				>
					<PhX size="16" color="#74808B" />
				</div>

				<a target="_blank" :href="image.url">
					<img
						class="h-16 w-16 rounded-lg object-cover shadow-md"
						:src="image.url"
					/>
				</a>
			</div>

			<label
				v-if="images.length < 5 && !props.previewMode"
				for="file-upload"
				class="mt-8 flex h-16 w-16 cursor-pointer items-center justify-center rounded-lg shadow-md"
			>
				<PhCameraPlus size="24" color="#74808B" />
			</label>
			<input
				ref="imageInput"
				@change="handleImageInputChange"
				class="hidden"
				id="file-upload"
				type="file"
				accept="image/*"
			/>
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
import { reactive, unref, onMounted, ref } from "vue"
import { PhCameraPlus, PhX } from "@phosphor-icons/vue"
import { createResource } from "frappe-ui"

const images = reactive([])
const imageInput = ref(null)

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

const handleImageInputChange = (e) => {
	const files = e.target.files

	// create object url
	const url = URL.createObjectURL(files[0])
	images.push({
		filename: files[0].name,
		url,
		uploaded: false,
		file: files[0],
	})
}

function handleImageRemove(index) {
	images.splice(index, 1)
	imageInput.value.value = ""
}

const handleComplete = () => {
	emit("complete", { images: unref(images) })
}
</script>
