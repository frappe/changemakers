
export interface Rescue{
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
	/**	Rescue By : Link - User	*/
	rescue_by: string
	/**	Rescue Date and Time : Datetime	*/
	rescued_at: string
	/**	Beneficiary : Link - Beneficiary	*/
	beneficiary: string
	/**	Gender : Link - Gender	*/
	gender?: string
	/**	Age : Int	*/
	age?: number
	/**	Contact Number : Data	*/
	contact_number?: string
	/**	Condition : Select	*/
	condition?: "Basic Illness" | "Serious Illness" | "Other"
	/**	Please Specify Condition : Data	*/
	specified_condition?: string
	/**	Rescue Location : Geolocation	*/
	rescue_location: any
	/**	State : Link - State	*/
	state?: string
	/**	Zone/Block : Link - Zone	*/
	zone?: string
	/**	Hotspot Name/Habitation : Link - Habitation	*/
	habitation?: string
	/**	City/District : Link - District	*/
	district?: string
	/**	Ward/GP : Link - Ward	*/
	ward?: string
	/**	Was Referred to Hospital? : Select	*/
	was_referred_to_hospital?: "Yes" | "No" | "Not Willing To Go"
	/**	Hospital : Small Text	*/
	hospital?: string
	/**	Was Referred to Shelter Home? : Select	*/
	was_referred_to_shelter_home?: "Yes" | "No" | "Not Willing To God"
	/**	Shelter Home : Link - Shelter Home	*/
	shelter_home?: string
	/**	Police Station : Small Text	*/
	police_station?: string
	/**	Police Memo : Attach	*/
	police_memo?: string
	/**	Other Remarks : Long Text	*/
	other_remarks?: string
	/**	Amended From : Link - Rescue	*/
	amended_from?: string
}