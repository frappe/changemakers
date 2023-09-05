# Copyright (c) 2022, hussain@frappe.io and contributors
# For license information, please see license.txt

import frappe
from frappe.model.document import Document

from changemakers.utils.form import get_coordinates_from_geolocation_string


class Rescue(Document):
	def validate(self):
		self.validate_remarks_length()
		self.set_location_coordinates()

	def before_save(self):
		self.set_created_by()

	def set_created_by(self):
		if not self.created_by:
			self.created_by = self.owner

	def validate_remarks_length(self):
		if self.other_remarks and len(self.other_remarks) > 300:
			frappe.throw("Other remarks cannot be more than 300 characters long.")

	def set_location_coordinates(self):
		if self.rescue_location:
			try:
				self.coordinates = str(
					get_coordinates_from_geolocation_string(self.rescue_location)
				)
			except Exception:
				frappe.log_error("Error parsing geolocation field")
