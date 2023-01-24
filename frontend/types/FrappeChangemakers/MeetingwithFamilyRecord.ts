
export interface MeetingwithFamilyRecord{
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
	/**	Beneficiary : Link - Beneficiary	*/
	beneficiary: string
	/**	Age : Int	*/
	age?: number
	/**	Contact : Data	*/
	contact?: string
	/**	Gender : Link - Gender	*/
	gender?: string
	/**	Meeting Date : Date	*/
	meeting_date: string
	/**	Meeting Outcome : Select	*/
	meeting_outcome?: "Meeting went well and the Beneficiary returned to home" | "Meeting went well but the Beneficiary didn’t go home" | "Family members did not come" | "Beneficiary didn’t go for the meeting" | "Mismatch"
	/**	Meeting Time : Time	*/
	meeting_time: string
	/**	Police Station : Data	*/
	police_station?: string
	/**	Police Memo : Attach	*/
	police_memo?: string
}