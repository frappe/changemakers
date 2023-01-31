
export interface CaseFollowup{
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
	/**	Service Type : Select	*/
	service_type: "Shelter" | "Medical" | "Food" | "Entitlement" | "Legal" | "Other"
	/**	Comment : Text	*/
	comment: string
}