
export interface MedicalCaseSheet{
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
	/**	Vitals Taken? : Check	*/
	vitals_taken?: 0 | 1
	/**	Chief Complaint : Small Text	*/
	chief_complaint?: string
	/**	Past Medical History : Small Text	*/
	past_medical_history?: string
	/**	Social History : Small Text	*/
	social_history?: string
	/**	History Of Present Illness : Small Text	*/
	history_of_present_illness?: string
	/**	Medication History : Small Text	*/
	medication_history?: string
	/**	Allergies : Small Text	*/
	allergies?: string
}