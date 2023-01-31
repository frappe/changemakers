# Copyright (c) 2022, hussain@frappe.io and contributors
# For license information, please see license.txt

import frappe
from frappe.model.document import Document


class Rescue(Document):
	def validate(self):
		self.validate_remarks_length()

	def validate_remarks_length(self):
		if self.other_remarks and len(self.other_remarks) > 300:
			frappe.throw("Other remarks cannot be more than 300 characters long.")
