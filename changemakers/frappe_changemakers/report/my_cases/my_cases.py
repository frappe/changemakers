# Copyright (c) 2023, hussain@frappe.io and contributors
# For license information, please see license.txt

import frappe


def execute(filters=None):
	columns = [
		{
			"fieldname": "case_id",
			"fieldtype": "Link",
			"label": "Case ID",
			"options": "Case",
			"width": 100,
		},
		{"fieldname": "title", "fieldtype": "Data", "label": "Title", "width": 300},
		{
			"fieldname": "status",
			"fieldtype": "Data",
			"label": "Status",
			"width": 150,
		},
	]
	data = get_user_cases()
	return columns, data


def get_user_cases():
	return frappe.get_list(
		"Case",
		filters={"owner": frappe.session.user},
		fields=["title", "name as case_id", "status"],
	)
