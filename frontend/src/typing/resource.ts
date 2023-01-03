export interface DocumentResource<DocumentType> {
    doctype: string,
    name: string,
    auto: boolean,
    doc: undefined | DocumentType,
    reload: () => void
}