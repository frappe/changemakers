
export interface HospitalisationRecord{
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
	/**	Hospital : Link - Healthcare Provider	*/
	hospital?: string
	/**	Admitted At : Datetime	*/
	admitted_at: string
	/**	Beneficiary : Link - Beneficiary	*/
	beneficiary: string
	/**	Discharged At : Datetime	*/
	discharged_at?: string
	/**	Patient ID : Data - From the Hospital	*/
	patient_id?: string
	/**	Illness Description : Small Text	*/
	illness_description?: string
	/**	Admitted Under Doctor : Data	*/
	under_doctor?: string
	/**	Discharge / Medical Summary : Small Text	*/
	discharge_summary?: string
	/**	Bill Amount : Currency	*/
	bill_amount?: number
}