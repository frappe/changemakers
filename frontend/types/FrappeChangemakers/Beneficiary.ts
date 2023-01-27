import { IdentityProofType } from './IdentityProofType'

export interface Beneficiary{
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
	/**	First Name : Data	*/
	first_name: string
	/**	Last Name : Data	*/
	last_name?: string
	/**	Phone Number : Data	*/
	phone_number?: string
	/**	Gender : Link - Gender	*/
	gender: string
	/**	Age : Int	*/
	age: number
	/**	Religion : Link - Religion	*/
	religion?: string
	/**	Social Category : Select	*/
	social_category?: "SC" | "ST" | "OBC" | "General" | "Unknown"
	/**	State : Link - State	*/
	state?: string
	/**	Ward/GP : Link - Ward	*/
	ward?: string
	/**	City/District : Link - District	*/
	district?: string
	/**	Hotspot Name/Habitation : Link - Habitation	*/
	habitation?: string
	/**	Zone/Block : Link - Zone	*/
	zone?: string
	/**	Is Identitity Proof Available? : Select	*/
	is_identity_proof_available?: "Yes" | "No" | "Can't Say"
	/**	Identity Proofs : Table - Identity Proof Type	*/
	identity_proofs?: IdentityProofType[]
	/**	Disability Condition : Link - Disability Condition	*/
	disability_condition?: string
	/**	Chronic Illness : Select	*/
	chronic_illness?: "None" | "TB" | "Asthma" | "HIV" | "Cancer" | "Other"
	/**	Please Specify : Data	*/
	other_chronic_illness?: string
	/**	POC Name : Data	*/
	poc_name?: string
	/**	POC Phone : Data	*/
	poc_phone?: string
	/**	Image : Attach Image	*/
	image?: string
	/**	Marital Status : Select	*/
	marital_status?: "Unmarried" | "Married" | "Divorced" | "Separated" | "Widowed" | "Unknown"
	/**	Spouse's Name : Data	*/
	spouses_name?: string
	/**	Father's Name : Data	*/
	fathers_name?: string
	/**	State : Link - State	*/
	native_state?: string
	/**	District : Link - District	*/
	native_district?: string
	/**	Full Address : Small Text - Include block, GP, village or any other identifier info	*/
	native_full_address?: string
	/**	Education Level : Link - Education Level	*/
	education_level?: string
	/**	Is Employeed? : Check	*/
	is_employeed?: 0 | 1
	/**	Employment Type : Select	*/
	employment_type?: "Labor" | "Hospitality" | "Restaurants" | "Housework" | "Begging" | "Other"
	/**	Please Specify : Data	*/
	other_employment_type?: string
}