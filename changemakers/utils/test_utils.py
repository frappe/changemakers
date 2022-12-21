# Copyright (c) 2022, hussain@frappe.io and Contributors
# See license.txt

# import frappe
from frappe.tests.utils import FrappeTestCase
from changemakers.utils.data import is_valid_indian_phone_number

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
