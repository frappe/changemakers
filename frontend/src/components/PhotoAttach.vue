<template>
	<Card title="Attach Photos">
		<div>
			<img v-if="imageSource" :src="imageSource" />
		</div>

		<Button @click="showPicture" appearance="white">Show Picture</Button>
	</Card>
</template>

<script lang="ts" setup>
import { Filesystem, Directory, Encoding } from "@capacitor/filesystem"
import { Camera, CameraResultType, CameraSource } from "@capacitor/camera"
import { ref } from "vue"
import { nanoid } from "nanoid"
import { Capacitor } from "@capacitor/core"

const imageSource = ref()

const takePicture = async () => {
	const image = await Camera.getPhoto({
		allowEditing: false,
		resultType: CameraResultType.Base64,
		source: CameraSource.Camera,
	})

	// Can be set to the src of an image now
	imageSource.value = "data:image/png;base64, " + image.base64String

	// save the file
	const filename = `rescue-photo-${nanoid()}.jpeg`

	try {
		const savedPhotoFile = await Filesystem.writeFile({
			path: filename,
			data: image.base64String,
			directory: Directory.Data,
		})

		console.log("file name: ", filename)
		console.log("photoUri", savedPhotoFile.uri)
	} catch (e) {
		console.log("Error saving image file")
		console.log(e)
	}
}

const showPicture = async () => {
	const fileURI =
		"file:///data/user/0/io.frappe.changemakers/files/rescue-photo-t2vHhBZndhDDVdQZjC-Yo.jpeg"

	const file = await Filesystem.readFile({ path: fileURI })

	imageSource.value = "data:image/png;base64, " + file.data
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
