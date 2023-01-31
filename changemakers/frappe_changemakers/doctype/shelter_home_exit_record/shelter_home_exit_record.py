# Copyright (c) 2022, hussain@frappe.io and contributors
# For license information, please see license.txt

import frappe
from frappe.model.document import Document


class ShelterHomeExitRecord(Document):
	def before_insert(self):
		self.validate_duplicate_exit()

	def validate_duplicate_exit(self):
		"""throws if an exit for the admission already exists"""
		exit_exists = frappe.db.exists(
			"Shelter Home Exit Record", {"admission_record": self.admission_record}
		)

		if exit_exists:
			frappe.throw("An exit has already been created for the given admission")
