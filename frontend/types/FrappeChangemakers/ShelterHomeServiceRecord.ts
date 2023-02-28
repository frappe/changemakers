
export interface ShelterHomeServiceRecord{
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
	/**	Date Of Service : Date	*/
	date_of_service: string
	/**	Beneficiary : Link - Beneficiary	*/
	beneficiary: string
	/**	Service Type : Select	*/
	service_type: "Food (Breakfast)" | "Food (Lunch)" | "Food (Dinner)" | "Medical Checkup" | "Transport To Hospital" | "Family Reintegration"
	/**	Amended From : Link - Shelter Home Service Record	*/
	amended_from?: string
}