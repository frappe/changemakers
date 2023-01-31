# Copyright (c) 2022, hussain@frappe.io and contributors
# For license information, please see license.txt

# import frappe
from frappe.model.document import Document


class HealthCampRecord(Document):
	def validate(self):
		self.set_total_patients_screened()

	def set_total_patients_screened(self):
		self.total_patients_screened = (
			(self.number_of_males or 0)
			+ (self.number_of_females or 0)
			+ (self.number_of_children or 0)
			+ (self.number_of_others or 0)
		)
