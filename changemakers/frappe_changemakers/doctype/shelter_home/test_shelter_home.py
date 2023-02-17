# Copyright (c) 2022, hussain@frappe.io and Contributors
# See license.txt

import frappe
from frappe.tests.utils import FrappeTestCase


class TestShelterHome(FrappeTestCase):
	@classmethod
	def setUp(cls):
		test_s = frappe.get_doc(doctype="State", name="shelter_test_state").insert()
		test_d = frappe.get_doc(
			doctype="District", name="shelter_test_district", state=test_s.name
		).insert()
		test_z = frappe.get_doc(
			doctype="Zone", name="shelter_test_zone", district=test_d.name
		).insert()
		frappe.get_doc(doctype="Ward", name="shelter_test_ward", zone=test_z.name).insert()

	def test_vacant_beds_less_than_capacity(self):
		# create test records
		test_shelter_home = frappe.get_doc(
			{
				"doctype": "Shelter Home",
				"name": "shelter_test",
				"ownership_of_property": "Own",
				"state": "shelter_test_state",
				"district": "shelter_test_district",
				"zone": "shelter_test_zone",
				"ward": "shelter_test_ward",
			}
		).insert()

		# works for valid cases
		test_shelter_home.total_capacity = 100
		test_shelter_home.num_vacant_available = 90
		test_shelter_home.save()

		with self.assertRaises(frappe.ValidationError):
			test_shelter_home.total_capacity = 100
			test_shelter_home.num_vacant_available = 120
			test_shelter_home.save()

	@classmethod
	def tearDown(cls):
		frappe.delete_doc("shelter_test", force=True)
		frappe.delete_doc("shelter_test_ward", force=True)
		frappe.delete_doc("shelter_test_zone", force=True)
		frappe.delete_doc("shelter_test_district", force=True)
		frappe.delete_doc("shelter_test_state", force=True)
