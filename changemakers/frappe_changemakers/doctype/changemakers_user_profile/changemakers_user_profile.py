# Copyright (c) 2023, hussain@frappe.io and contributors
# For license information, please see license.txt

import frappe
from frappe.model.document import Document


class ChangemakersUserProfile(Document):
	pass


def create_user_profile(doc, method=None):
	if not frappe.db.exists("Changemakers User Profile", {"user": doc.name}):
		frappe.get_doc(doctype="Changemakers User Profile", user=doc.name).insert(
			ignore_permissions=True
		)
		frappe.db.commit()


def delete_user_profile(doc, method=None):
	exists = frappe.db.exists("Changemakers User Profile", {"user": doc.name})
	if exists:
		return frappe.get_doc("Changemakers User Profile", {"user": doc.name}).delete()
