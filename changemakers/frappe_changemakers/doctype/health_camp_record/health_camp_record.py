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
			(self.number_of_males or 0)
			+ (self.number_of_females or 0)
			+ (self.number_of_children or 0)
			+ (self.number_of_others or 0)
		)

	def update_patient_count(self):
		self.number_of_males = 0
		self.number_of_females = 0
		self.number_of_children = 0
		self.number_of_others = 0

		for patient in self.healthcamp_attendees:
			beneficiary_name = get_beneficiary_name(str(patient))
			beneficiary = frappe.get_doc("Beneficiary", beneficiary_name)
			if beneficiary.age > 13:
				if beneficiary.gender == "Male":
					self.number_of_males += 1
				elif beneficiary.gender == "Female":
					self.number_of_females += 1
				else:
					self.number_of_others += 1
			else:
				self.number_of_children += 1


def get_beneficiary_name(patient):
	start_index = patient.find("(") + 1
	end_index = patient.find(")")
	return patient[start_index:end_index]
