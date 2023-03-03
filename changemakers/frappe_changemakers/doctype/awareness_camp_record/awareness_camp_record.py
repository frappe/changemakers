# Copyright (c) 2022, hussain@frappe.io and contributors
# For license information, please see license.txt

import frappe
from frappe.model.document import Document

from changemakers.utils.form import get_coordinates_from_geolocation_string


class AwarenessCampRecord(Document):
	def validate(self):
		self.set_location_coordinates()

	def set_location_coordinates(self):
		if self.geolocation:
			try:
				self.coordinates = str(get_coordinates_from_geolocation_string(self.geolocation))
			except Exception:
				frappe.log_error("Error parsing geolocation field")
