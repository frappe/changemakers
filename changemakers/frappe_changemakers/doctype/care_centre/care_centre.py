# Copyright (c) 2023, hussain@frappe.io and contributors
# For license information, please see license.txt

import frappe
from frappe.model.document import Document


class CareCentre(Document):
    @property
    def vacant_beds(self):
        filters = {
            "facility_name": self.facility_name,
            "status": "Admitted",
            "docstatus": 0,
        }
        occupants = frappe.get_all(
            "Care Centre Admission", filters=filters, fields=["name"], pluck="name"
        )

        vacant_beds = self.capacity - len(occupants)
        return vacant_beds if vacant_beds > 0 else str(0)
