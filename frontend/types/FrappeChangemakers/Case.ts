import { CaseFollowup } from './CaseFollowup'

export interface Case{
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
	/**	Organisation : Link - Organisation	*/
	organisation: string
	/**	Assigned To : Link - User	*/
	assigned_to: string
	/**	Title : Data	*/
	title: string
	/**	Description : Small Text	*/
	description?: string
	/**	Type : Select	*/
	type: "Shelter" | "Medical" | "Food" | "Entitlement" | "Identified a Family" | "Legal" | "Other"
	/**	Status : Select	*/
	status: "New" | "In Follow Up" | "Spam" | "Untraced" | "Closed"
	/**	Priority : Select	*/
	priority: "Urgent" | "High" | "Medium" | "Low"
	/**	Amended From : Link - Case	*/
	amended_from?: string
	/**	Is the beneficiary in shelter home? : Check	*/
	is_beneficiary_in_shelter_home?: 0 | 1
	/**	State : Link - State	*/
	state: string
	/**	Zone/Block : Link - Zone	*/
	zone: string
	/**	Shelter Home : Link - Shelter Home	*/
	shelter_home?: string
	/**	City/District : Link - District	*/
	district: string
	/**	Ward/GP : Link - Ward	*/
	ward: string
	/**	Hotspot Name/Habitation : Link - Habitation	*/
	habitation: string
	/**	Is Beneficiary Traced? : Check	*/
	is_beneficiary_traced?: 0 | 1
	/**	Beneficiary : Link - Beneficiary	*/
	beneficiary?: string
	/**	Gender : Link - Gender	*/
	gender?: string
	/**	Age : Int	*/
	age?: number
	/**	Contact Number : Data	*/
	contact_number?: string
	/**	Medical Update : Select	*/
	medical_update?: "Hospitalised" | "Treatment Done" | "Referred To Other Organisation"
	/**	Food Update : Select	*/
	food_update?: "Resolved and reported" | "Food escalation"
	/**	Entitlement Update : Select	*/
	entitlement?: "In Process" | "Resolved"
	/**	Legal Update : Select	*/
	legal_update?: "Complaint registered" | "Referred to agency"
	/**	Shelter Update : Select	*/
	shelter_update?: "Not Willing To Come" | "Admitted"
	/**	Admitted To Shelter : Link - Shelter Home	*/
	admitted_to_shelter?: string
	/**	Other Update : Small Text	*/
	other_update?: string
	/**	Family Meeting Outcome : Select	*/
	family_meeting_outcome?: "Meeting went well and the Beneficiary returned to home" | "Meeting went well but the Beneficiary didn’t go home" | "Family members did not come" | "Beneficiary didn’t go for the meeting" | "Mismatch"
	/**	Followups : Table - Case Followup	*/
	followups?: CaseFollowup[]
}