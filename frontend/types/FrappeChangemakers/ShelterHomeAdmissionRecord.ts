
export interface ShelterHomeAdmissionRecord{
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
	/**	Shelter Home : Link - Shelter Home	*/
	shelter_home: string
	/**	Beneficiary : Link - Beneficiary	*/
	beneficiary: string
}