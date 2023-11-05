# Copyright (c) 2023, hussain@frappe.io and contributors
# For license information, please see license.txt

import frappe
from frappe.model.document import Document


class CareCentre(Document):
    @property
    def vacant_beds(self):
        """
        Calculating vacant beds in a care centre facility.
        :return: int or str if count is 0
        """
        filters = {
            "facility_name": self.facility_name,
            "status": ("in", ("Admitted", "Hospitalised")),
            "docstatus": 0,
        }
        occupants = frappe.get_all(
            "Care Centre Admission", filters=filters, fields=["name"], pluck="name"
        )

        vacant_beds = self.capacity - len(occupants)
        return vacant_beds if vacant_beds > 0 else str(0)
