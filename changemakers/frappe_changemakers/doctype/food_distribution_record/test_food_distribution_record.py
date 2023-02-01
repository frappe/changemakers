# Copyright (c) 2022, hussain@frappe.io and Contributors
# See license.txt

import frappe
from frappe.tests.utils import FrappeTestCase


class TestFoodDistributionRecord(FrappeTestCase):
	def test_correct_number_of_distributed_packets_set(self):
		test_record = frappe.get_doc(
			{"doctype": "Food Distribution Record", "packets_taken_for_distribution": 110}
		)

		test_record.append(
			"drop_offs", {"number_of_packets": 100, "drop_off_time": "18:00:00"}
		)

		test_record.append(
			"drop_offs", {"number_of_packets": 10, "drop_off_time": "18:00:00"}
		)

		test_record.insert()

		self.assertEqual(test_record.packets_distributed, 110)

	def test_correct_number_of_returned_packets_set(self):
		test_record = frappe.get_doc(
			{"doctype": "Food Distribution Record", "packets_taken_for_distribution": 110}
		)

		test_record.append(
			"drop_offs", {"number_of_packets": 50, "drop_off_time": "18:00:00"}
		)

		test_record.append(
			"drop_offs", {"number_of_packets": 10, "drop_off_time": "18:00:00"}
		)

		test_record.insert()
		self.assertEqual(test_record.packets_distributed, 60)
		self.assertEqual(test_record.packets_returned, 110 - 60)

		test_record.submit()
		self.assertEqual(test_record.packets_returned, 110 - 60)

	def test_zero_packet_distribution_not_allowed(self):
		test_record = frappe.get_doc(
			{"doctype": "Food Distribution Record", "packets_taken_for_distribution": 110}
		)

		test_record.append(
			"drop_offs", {"number_of_packets": 100, "drop_off_time": "18:00:00"}
		)

		test_record.insert()

		test_record.append("drop_offs", {"number_of_packets": 0, "drop_off_time": "18:00:00"})

		with self.assertRaises(frappe.ValidationError):
			test_record.save()
