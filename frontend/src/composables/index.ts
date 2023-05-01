import { createResource } from "frappe-ui"

type UploadOptions = {
	// base64 string
	content: string
	fileName: string
	documentType?: string
	documentName?: string
	fieldName?: string
}

export function useFileUploaderResource(options: UploadOptions) {
	return createResource({
		url: "changemakers.api.upload_base64_file",
		params: {
			content: options.content,
			dt: options.documentType,
			dn: options.documentName,
			filename: options.fileName,
			fieldname: options.fieldName,
		},
	})
}

function getFileReader(): FileReader {
	const fileReader = new FileReader()
	const zoneOriginalInstance = (fileReader as any)[
		"__zone_symbol__originalInstance"
	]
	return zoneOriginalInstance || fileReader
}

export class FileAttachmentUploader {
	// File Object
	fileObj: File

	// base64 file contents
	fileContents: string

	// File Name
	fileName: string

	constructor(fileObj) {
		this.fileObj = fileObj
		this.fileName = fileObj.name
	}

	public upload(
		documentType: string,
		documentName: string,
		fieldName?: string,
		successHandler?: () => void
	) {
		const reader = getFileReader()
		const uploader = createResource({
			url: "changemakers.api.upload_base64_file",
			onSuccess: successHandler,
		})

		reader.onload = () => {
			console.log("Loaded successfully ✅")
			this.fileContents = reader.result.toString().split(",")[1]

			uploader.submit({
				content: this.fileContents,
				dt: documentType,
				dn: documentName,
				filename: this.fileName,
				fieldname: fieldName,
			})
		}
		reader.readAsDataURL(this.fileObj)

		return uploader
	}
}
