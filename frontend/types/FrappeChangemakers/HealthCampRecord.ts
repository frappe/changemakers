
export interface HealthCampRecord{
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
	/**	Camp Date : Date	*/
	camp_date: string
	/**	Camp Time : Time	*/
	camp_time: string
	/**	Number Of Males : Int	*/
	number_of_males?: number
	/**	Number Of Children : Int	*/
	number_of_children?: number
	/**	Total Patients Screened : Int	*/
	total_patients_screened?: number
	/**	Number Of Females : Int	*/
	number_of_females?: number
	/**	Number Of Others : Int	*/
	number_of_others?: number
	/**	Camp Location : Select	*/
	camp_location: "Govt Aided Shelter Home" | "Private Shelter Home" | "Hotspot" | "Others"
	/**	Please Specify Camp Location : Data	*/
	specified_camp_location?: string
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
	/**	Total Medicines Dispensed : Int	*/
	total_medicines_dispensed?: number
	/**	Total Referrals Done : Int	*/
	total_referrals_done?: number
	/**	Total Diagnostics Done : Int	*/
	total_diagnostics_done?: number
}