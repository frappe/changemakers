
export interface EntitlementRequest{
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
	/**	Beneficiary : Link - Beneficiary	*/
	beneficiary: string
	/**	Age : Int	*/
	beneficiary_age?: number
	/**	Gender : Link - Gender	*/
	beneficiary_gender?: string
	/**	POC Phone Number : Data	*/
	poc_phone?: string
	/**	Entitlement Type : Link - Entitlement Type	*/
	entitlement_type: string
	/**	Status : Select	*/
	status?: "Documentation Pending" | "In Process" | "Completed" | "Rejected"
	/**	Serviced On : Datetime	*/
	serviced_on: string
}