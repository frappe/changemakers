
export interface ChangemakersSettings{
	creation: string
	name: string
	modified: string
	owner: string
	modified_by: string
	docstatus: 0 | 1 | 2
	parent?: string
	parentfield?: string
	parenttype?: string
	idx?: number
	/**	State/District Imported : Check	*/
	statedistrict_imported?: 0 | 1
}