# Copyright (c) 2023, hussain@frappe.io and contributors
# For license information, please see license.txt
import frappe
from frappe.model.document import Document


from datetime import datetime
from datetime import datetime


class CRCAdmissions(Document):
    def before_save(self):
        self.calculate_actual_duration()

    def calculate_actual_duration(self):
        if self.date_of_admission:
            date_of_admission = datetime.strptime(
                self.date_of_admission, "%Y-%m-%d")
            current_date = datetime.now()
            duration = current_date - date_of_admission
            actual_duration = duration.days
            self.actual_duration = f"{int(actual_duration)} days"
