# Copyright (c) 2022, hussain@frappe.io and contributors
# For license information, please see license.txt

import frappe
from frappe.model.document import Document


class Case(Document):
	def before_save(self):
		self.set_created_by()
		self.calculate_total_amount()
		self.validate_total_amount()

	def set_created_by(self):
		if not self.created_by:
			owner = frappe.db.get_value("User", self.owner, "full_name")
			self.created_by = owner
   
	def calculate_total_amount(doc):
		total_amount = 0
		for row in doc.get("payment_details"):
			total_amount += row.amount
		doc.total_amount = total_amount


	def validate_total_amount(doc):
		if doc.total_amount < 0:
			frappe.throw("Total amount must not be less than zero.")

	
