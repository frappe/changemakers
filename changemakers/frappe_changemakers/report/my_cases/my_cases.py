# Copyright (c) 2023, hussain@frappe.io and contributors
# For license information, please see license.txt

from typing import Dict

import frappe


def execute(filters: Dict = None):
	columns = get_columns()

	current_user = frappe.session.user
	user_created_cases = get_cases_created_by_user(current_user)
	assigned_to_user_cases = get_cases_assigned_to_user(current_user)

	# No filter if all cases
	if filters.get("status") == "All":
		filters.pop("status")

	user_cases = set(user_created_cases + assigned_to_user_cases)
	data = frappe.get_all(
		"Case",
		filters={**filters, "name": ("in", user_cases)},
		fields=["title", "name as case_id", "status"],
	)

	report_summary = get_user_cases_summary(user_cases)

	return columns, data, None, None, report_summary


def get_columns():
	return [
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


def get_cases_created_by_user(user):
	return frappe.get_list("Case", filters={"owner": user}, pluck="name")


def get_cases_assigned_to_user(user):
	return frappe.get_all(
		"ToDo",
		filters={"allocated_to": user, "reference_type": "Case"},
		pluck="reference_name",
	)


def get_user_cases_summary(user_cases):
	total_non_spam_case_status = frappe.get_all(
		"Case",
		filters={
			"name": ("in", user_cases),
			"status": ("!=", "Spam"),
		},
		pluck="status",
	)

	closed_case_count = len([c for c in total_non_spam_case_status if c == "Closed"])
	open_case_count = len(total_non_spam_case_status) - closed_case_count

	return [
		{
			"label": "Total Open Cases",
			"datatype": "Int",
			"value": open_case_count,
			"indicator": "gray" if open_case_count < 10 else "red",
		},
		{
			"label": "Total Closed Cases",
			"datatype": "Int",
			"value": closed_case_count,
			"indicator": "green",
		},
	]
