import { ShelterIncomeSource } from './ShelterIncomeSource'

export interface ShelterHome{
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
	/**	Type : Link - Shelter Home Type	*/
	type?: string
	/**	State : Link - State	*/
	state: string
	/**	Ward : Link - Ward	*/
	ward: string
	/**	District : Link - District	*/
	district: string
	/**	Pin Code : Data	*/
	pin_code?: string
	/**	Zone : Link - Zone	*/
	zone: string
	/**	Full Address : Small Text	*/
	full_address?: string
	/**	POC Name : Data	*/
	poc_name?: string
	/**	NGO/Trust Head : Data	*/
	trust_head?: string
	/**	Website : Data	*/
	website?: string
	/**	POC Phone : Data	*/
	poc_phone?: string
	/**	Email : Data	*/
	email?: string
	/**	Total Capacity : Int	*/
	total_capacity?: number
	/**	Vacant Beds Available : Int	*/
	num_vacant_available?: number
	/**	Organisation Type : Select	*/
	organisation_type?: "Trust" | "Society" | "Others"
	/**	Specified Organisation Type : Data	*/
	specified_organisation_type?: string
	/**	Establishment Year : Int	*/
	establishment_year?: number
	/**	Full Time Staff : Int	*/
	full_time_staff?: number
	/**	Is 80G Available? : Check	*/
	is_80g_available?: 0 | 1
	/**	Ownership Of Property : Select	*/
	ownership_of_property: "Own" | "Others"
	/**	Property Size (in sq. ft) : Int	*/
	property_size?: number
	/**	Specified Ownership : Data	*/
	specified_ownership?: string
	/**	Sources Of Income : Table MultiSelect - Shelter Income Source	*/
	sources_of_income?: ShelterIncomeSource[]
	/**	Conducts Medical Camps? : Check	*/
	conducts_medical_camps?: 0 | 1
	/**	Does Entitlements? : Check	*/
	does_entitlements?: 0 | 1
	/**	Conducts Regular Vocational Training Workshops : Check	*/
	conducts_regular_vocational_training_workshops?: 0 | 1
	/**	Image : Attach Image	*/
	image?: string
}