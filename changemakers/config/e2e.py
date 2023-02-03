import frappe


def prepare():
	remove_administrator_profile_if_exists()
	# TODO: add a test "Social Worker" role user


@frappe.whitelist()
def remove_administrator_profile_if_exists():
	frappe.only_for("System Manager")

	exists = frappe.db.exists("Changemakers User Profile", {"user": "Administrator"})
	if exists:
		frappe.get_doc("Changemakers User Profile", {"user": "Administrator"}).delete()
		return frappe.db.commit()
