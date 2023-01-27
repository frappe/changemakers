import { FoodDropOffDetail } from './FoodDropOffDetail'

export interface FoodDistributionRecord{
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
	/**	Date of Distribution : Date	*/
	date_of_distribution: string
	/**	Food Type : Select	*/
	food_type?: "Breakfast" | "Lunch" | "Dinner" | "Festive Special Meals"
	/**	Packets Taken For Distribution : Int	*/
	packets_taken_for_distribution?: number
	/**	Transported By : Data - Vehicle/Reg No. Person Name	*/
	transported_by?: string
	/**	Drop Offs : Table - Food Drop Off Detail	*/
	drop_offs?: FoodDropOffDetail[]
	/**	Packets Distributed : Int	*/
	packets_distributed?: number
	/**	Packets Returned : Int	*/
	packets_returned?: number
	/**	Amended From : Link - Food Distribution Record	*/
	amended_from?: string
}