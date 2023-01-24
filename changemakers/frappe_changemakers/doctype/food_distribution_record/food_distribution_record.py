# Copyright (c) 2022, hussain@frappe.io and contributors
# For license information, please see license.txt

import frappe

from frappe.model.document import Document


class FoodDistributionRecord(Document):
    def before_save(self):
        self.set_distributed_packets()
        self.set_returned_packets()

    def on_submit(self):
        self.set_returned_packets()

    def set_returned_packets(self):
        self.packets_returned = (
            self.packets_taken_for_distribution - self.packets_distributed
        )

    def set_distributed_packets(self):
        total_distributed_packets = 0

        for entry in self.drop_offs:
            total_distributed_packets += entry.number_of_packets

        self.packets_distributed = total_distributed_packets

        if total_distributed_packets > self.packets_taken_for_distribution:
            frappe.throw(
                "Sum of distributed packets cannot be more than packets taken for distribution"
            )
