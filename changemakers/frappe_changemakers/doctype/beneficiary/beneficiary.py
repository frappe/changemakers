# Copyright (c) 2022, hussain@frappe.io and contributors
# For license information, please see license.txt

import frappe
from frappe.model.document import Document


class Beneficiary(Document):
    def validate(self):
        self.validate_age()

    def validate_age(self):
        if not (self.age < 120):
            frappe.throw(f"Value of {frappe.bold('Age')} should be less than 120!")
