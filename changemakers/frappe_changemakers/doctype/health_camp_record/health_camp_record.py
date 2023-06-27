# Copyright (c) 2022, hussain@frappe.io and contributors
# For license information, please see license.txt

import frappe
from frappe.model.document import Document


class HealthCampRecord(Document):
	def validate(self):
		self.update_patient_count()
		self.set_total_patients_screened()

	def set_total_patients_screened(self):
		self.total_patients_screened = (
			(self.number_of_males)
			+ (self.number_of_females)
			+ (self.number_of_children)
			+ (self.number_of_others)
		)

	def update_patient_count(self):
		self.number_of_males = 0
		self.number_of_females = 0
		self.number_of_children = 0
		self.number_of_others = 0

		for patient in self.healthcamp_attendees:
			beneficiary = frappe.db.get_value(
				"Beneficiary", patient.beneficiary, ["age", "gender"], as_dict=True
			)
			if beneficiary.age > 13:
				if beneficiary.gender == "Male":
					self.number_of_males += 1
				elif beneficiary.gender == "Female":
					self.number_of_females += 1
				else:
					self.number_of_others += 1
			else:
				self.number_of_children += 1
