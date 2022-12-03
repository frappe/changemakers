# Copyright (c) 2022, hussain@frappe.io and Contributors
# See license.txt

import frappe
from frappe.tests.utils import FrappeTestCase


class TestFoodDistributionRecord(FrappeTestCase):
	def test_correct_number_of_distributed_packets_set(self):
		test_record = frappe.get_doc({
			"doctype": "Food Distribution Record",
			"packets_taken_for_distribution": 110
		})

		test_record.append("drop_offs", {
			"number_of_packets": 100,
			"drop_off_time": "18:00:00"
		})

		test_record.append("drop_offs", {
			"number_of_packets": 10,
			"drop_off_time": "18:00:00"
		})

		test_record.insert()

		self.assertEqual(test_record.packets_distributed, 110)

