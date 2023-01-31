# Copyright (c) 2022, hussain@frappe.io and Contributors
# See license.txt

import frappe
from frappe.tests.utils import FrappeTestCase


class TestBeneficiary(FrappeTestCase):
	def test_should_be_less_than_120(self):
		frappe.get_doc(doctype="Gender", gender="Male").insert(ignore_if_duplicate=True)

		test_beneficiary = frappe.get_doc(
			{
				"doctype": "Beneficiary",
				"first_name": "John",
				"age": 120,
				"gender": "Male",
			}
		)

		with self.assertRaises(frappe.ValidationError):
			test_beneficiary.insert()

		test_beneficiary.age = 78
		test_beneficiary.insert()
		self.assertIsNotNone(test_beneficiary.name)
