// Copyright (c) 2023, hussain@frappe.io and contributors
// For license information, please see license.txt
/* eslint-disable */

frappe.query_reports["My Cases"] = {
	filters: [
		{
			fieldname: "status",
			fieldtype: "Select",
			label: "Status",
			mandatory: 0,
			options: "All\nNew\nClosed\nSpam\nUntraced\nIn Follow Up",
			wildcard_filter: 0,
		},
	],
};
