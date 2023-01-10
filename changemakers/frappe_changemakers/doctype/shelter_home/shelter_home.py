# Copyright (c) 2022, hussain@frappe.io and contributors
# For license information, please see license.txt

import frappe

from frappe.model.document import Document


class ShelterHome(Document):
	def validate(self):
		self.validate_pin_code()
		self.validate_establishment_year()

	def validate_pin_code(self):
		if not self.pin_code:
			return

		if not self.pin_code.isnumeric():
			frappe.throw("Pin Code should contain only numeric values")

		if len(str(self.pin_code)) != 6:
			frappe.throw("Pin Code should be a numeric value with exactly 6 digits")

	def validate_establishment_year(self):
		if (
			self.establishment_year
			and self.establishment_year > 0
			and len(str(self.establishment_year)) != 4
		):
			frappe.throw("Invalid Value for Establishment Year")
