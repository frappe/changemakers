
export interface AwarenessCampRecord{
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
	/**	Date of Camp : Date	*/
	date_of_camp: string
	/**	Camp Type : Select	*/
	camp_type: "Legal" | "Personal Hygiene" | "Entitlements" | "Outreach" | "Others"
	/**	Specify Other Camp Type : Data	*/
	specified_camp_type?: string
	/**	Number of Attendees : Int	*/
	num_attendees: number
	/**	Time of Camp : Time	*/
	time_of_camp: string
	/**	Camp Location : Select	*/
	camp_location: "Shelter home" | "Hotspot" | "NGO's" | "Colleges" | "Schools" | "Corporate Offices" | "Apartment Complex" | "Others"
	/**	Specify Other Camp Location : Data	*/
	specified_camp_location?: string
	/**	Agenda : Small Text	*/
	agenda?: string
	/**	Key Action Points : Small Text	*/
	action_points?: string
	/**	State : Link - State	*/
	state: string
	/**	Zone : Link - Zone	*/
	zone: string
	/**	Habitation : Link - Habitation	*/
	habitation: string
	/**	District : Link - District	*/
	district: string
	/**	Ward : Link - Ward	*/
	ward: string
	/**	Coordinates : Data	*/
	coordinates?: string
	/**	Geolocation : Geolocation	*/
	geolocation?: any
}