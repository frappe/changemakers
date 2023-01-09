export interface DocumentResource<DocumentType> {
	doctype: string
	name: string
	auto: boolean
	doc: undefined | DocumentType
	reload: () => void
}

export interface ListResource<DocumentType> {
	doctype: string
	name: string
	auto: boolean
	data: undefined | Array<DocumentType>
	reload: () => void
}
