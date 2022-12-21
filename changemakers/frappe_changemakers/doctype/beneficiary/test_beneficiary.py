# Copyright (c) 2022, hussain@frappe.io and Contributors
# See license.txt

import frappe
from frappe.tests.utils import FrappeTestCase
from changemakers.frappe_changemakers.doctype.beneficiary.beneficiary import InvalidAgeException



class TestBeneficiary(FrappeTestCase):
	def test_should_be_less_than_120(self):
		test_beneficiary = frappe.get_doc(
			{
				"doctype": "Beneficiary",
				"first_name": "John",
				"age": 120,
				"gender": "Male",
			}
		)

		with self.assertRaises(InvalidAgeException):
			test_beneficiary.insert()
		
		test_beneficiary.age = 78
		test_beneficiary.insert()
		self.assertIsNotNone(test_beneficiary.name)
