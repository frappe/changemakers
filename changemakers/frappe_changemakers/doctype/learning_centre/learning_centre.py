# Copyright (c) 2022, hussain@frappe.io and contributors
# For license information, please see license.txt

import frappe
from frappe.model.document import Document


class LearningCentre(Document):
	def validate(self):
		self.validate_pin_code()

	def validate_pin_code(self):
		if not self.pin_code:
			return

		if not self.pin_code.isnumeric():
			frappe.throw("Pin Code should contain only numeric values")

		if len(str(self.pin_code)) != 6:
			frappe.throw("Pin Code should be a numeric value with exactly 6 digits")
