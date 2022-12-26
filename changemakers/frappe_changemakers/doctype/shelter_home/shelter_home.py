# Copyright (c) 2022, hussain@frappe.io and contributors
# For license information, please see license.txt

import frappe

from frappe.model.document import Document

class ShelterHome(Document):
	def validate(self):
		self.validate_pincode()
	
	def validate_pincode(self):
		if len(str(self.pincode)) != 6:
			frappe.throw("Pincode should be a numeric value with exactly 6 digits")
	
