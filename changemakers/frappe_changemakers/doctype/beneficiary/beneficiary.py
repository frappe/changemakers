# Copyright (c) 2022, hussain@frappe.io and contributors
# For license information, please see license.txt

import frappe
from frappe.model.document import Document
from changemakers.utils.data import is_valid_indian_phone_number


class Beneficiary(Document):
    def validate(self):
        self.validate_age()
        self.validate_phone_number_fields()

    def validate_age(self):
        if not (self.age < 120):
            frappe.throw(f"Value of {frappe.bold('Age')} should be less than 120!")

    def validate_phone_number_fields(self):
        if self.poc_phone and not is_valid_indian_phone_number(self.poc_phone):
            frappe.throw(
                f"Value of {frappe.bold('POC Phone')} is not a valid Indian Phone number"
            )

        if self.phone_number and not is_valid_indian_phone_number(self.phone_number):
            frappe.throw(
                f"Value of {frappe.bold('Phone')} is not a valid Indian Phone number"
            )
