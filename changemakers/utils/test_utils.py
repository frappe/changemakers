# Copyright (c) 2022, hussain@frappe.io and Contributors
# See license.txt

# import frappe
from frappe.tests.utils import FrappeTestCase
from changemakers.utils.data import is_valid_indian_phone_number
from changemakers.utils.form import get_doctype_title_field


class TestChangemakersUtils(FrappeTestCase):
	def test_phone_validation_util(self):
		# Valid
		self.assertTrue(is_valid_indian_phone_number("8770773631"))
		self.assertTrue(is_valid_indian_phone_number("+918770773631"))
		self.assertTrue(is_valid_indian_phone_number("08770773631"))

		# Invalid
		self.assertFalse(is_valid_indian_phone_number("65456565656"))
		self.assertFalse(is_valid_indian_phone_number("65456gfdgdfg"))
		self.assertFalse(is_valid_indian_phone_number("+986745363735"))

	def test_doctype_title_field_util(self):
		self.assertEqual(get_doctype_title_field("Beneficiary"), "first_name")
		self.assertEqual(get_doctype_title_field("Blog Post"), "title")
