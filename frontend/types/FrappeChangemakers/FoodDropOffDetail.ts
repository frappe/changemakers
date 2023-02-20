
export interface FoodDropOffDetail{
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
	/**	Number Of Packets : Int	*/
	number_of_packets?: number
	/**	Drop Off Time : Time	*/
	drop_off_time?: string
	/**	Drop Off Location : Data	*/
	drop_off_location?: string
	/**	Drop Off GeoLocation : Geolocation	*/
	drop_off_geolocation?: any
}