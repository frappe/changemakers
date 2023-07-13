# Copyright (c) 2023, hussain@frappe.io and contributors
# For license information, please see license.txt

from frappe.model.document import Document
from frappe.utils import today


class DailyVisitUpdate(Document):
	def before_naming(self):
		if not self.date:
			self.date = today()
