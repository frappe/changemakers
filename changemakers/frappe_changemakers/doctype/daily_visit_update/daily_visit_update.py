# Copyright (c) 2023, hussain@frappe.io and contributors
# For license information, please see license.txt

import frappe
from frappe.model.document import Document
from frappe.utils import today


class DailyVisitUpdate(Document):
	def before_naming(self):
		if not self.date:
			self.date = today()

	def before_save(self):
		self.set_created_by()

	def set_created_by(self):
		if not self.created_by:
			owner = frappe.db.get_value("User", self.owner, "full_name")
			self.created_by = owner
