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
