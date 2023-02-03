import frappe


def prepare():
	remove_administrator_profile_if_exists()
	# TODO: add a test "Social Worker" role user


def remove_administrator_profile_if_exists():
	exists = frappe.db.exists("Changemakers User Profile", {"user": "Administrator"})
	if exists:
		return frappe.get_doc("Changemakers User Profile", {"user": "Administrator"}).delete()
