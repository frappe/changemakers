# Copyright (c) 2022, hussain@frappe.io and contributors
# For license information, please see license.txt

import frappe
from frappe.model.document import Document

class Case(Document):
    def before_save(self):
        self.set_created_by()
        self.calculate_total_amount()

    def validate(self):
        self.validate_total_amount()

    def set_created_by(self):
        if not self.created_by:
            owner = frappe.db.get_value("User", self.owner, "full_name")
            self.created_by = owner

    def calculate_total_amount(self):
        total_amount = 0
        for row in self.get("payment_details"):
            total_amount += row.amount
        self.total_amount = total_amount

    def validate_total_amount(self):
        if self.total_amount:
            if self.total_amount < 0:
                frappe.throw("Total amount must not be less than zero.")
