
export interface LearningCentre{
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
	/**	Date Of Commencement : Date	*/
	date_of_commencement: string
	/**	Capacity : Int	*/
	capacity: number
	/**	Type : Select	*/
	type: "Micro Learning Centre" | "Tution Centre"
	/**	State : Link - State	*/
	state: string
	/**	Zone/Block : Link - Zone	*/
	zone: string
	/**	Hotspot Name/Habitation : Link - Habitation	*/
	habitation: string
	/**	City/District : Link - District	*/
	district: string
	/**	Ward/GP : Link - Ward	*/
	ward: string
	/**	Pin Code : Data	*/
	pin_code?: string
	/**	Full Address : Small Text	*/
	full_address: string
	/**	Landmark : Data	*/
	landmark?: string
	/**	POC Name : Data	*/
	poc_name: string
	/**	POC Alternate Phone : Data	*/
	poc_alternate_phone?: string
	/**	POC Phone : Data	*/
	poc_phone?: string
}