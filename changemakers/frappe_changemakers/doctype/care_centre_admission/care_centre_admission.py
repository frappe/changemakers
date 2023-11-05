# Copyright (c) 2023, hussain@frappe.io and contributors
# For license information, please see license.txt

import frappe
from frappe.model.document import Document
from frappe.utils import getdate


class CareCentreAdmission(Document):
    actual_duration_days: int

    def validate(self):
        self.validate_duplication()
        self.validate_work_performed()
        self.validate_capacity()

    def before_save(self):
        if self.discharge_date:
            duration = getdate(self.discharge_date) - getdate(self.admission_date)
            self.actual_duration_days = duration.days

    def before_submit(self):
        self.validate_discharge_date()

    def validate_duplication(self):
        """
        Checking DB for existing admission record for same beneficiary and facility.
        :return: None
        """
        exists = frappe.db.exists(
            "Care Centre Admission",
            {
                "beneficiary": self.beneficiary,
                "facility_name": self.facility_name,
                "docstatus": 0,
                "status": ("in", ("", "Admitted", "Hospitalised")),
            },
        )

        if exists and (self.name != exists):
            frappe.throw(
                f"There is an active admission record for Beneficiary: {self.beneficiary} in Care Centre: {self.facility_name}"
            )

    def validate_work_performed(self):
        """
        Checking if work performed date is before admission date.
        :return: None
        """
        for idx, item in enumerate(self.work_performed):
            if getdate(item.date) < getdate(self.admission_date):
                frappe.throw(
                    f"Work performed at Sr #. {idx} for Category {item.category} cannot be before admission date"
                )

    def validate_discharge_date(self):
        """
        Checking if discharge date is before admission date.
        :return: None
        """
        if not self.discharge_date or (self.discharge_date < self.admission_date):
            frappe.throw(
                f"Date of discharge is mandatory for submission and has to be greater than or equal to admission date {self.admission_date}"
            )

        if self.status.lower() != "discharged":
            frappe.throw(
                f"Beneficiary {self.beneficiary} has to be discharged before this document can be submitted"
            )

    def validate_capacity(self):
        """
        Checking if facility has enough capacity to admit beneficiary.
        :return: None
        """
        facility = frappe.get_doc("Care Centre", self.facility_name)
        if not facility.vacant_beds:
            frappe.throw(
                f"Care Centre {self.facility_name} does not have any vacant beds left, please select a different facility."
            )
