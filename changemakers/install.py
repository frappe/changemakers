import frappe

from changemakers.utils.data import scrap_and_import_india_district_list


def after_install():
	# Change password reset link expiry to 1 day
	frappe.db.set_single_value(
		"System Settings", "reset_password_link_expiry_duration", 86400
	)

	# Import indian district list
	try:
		scrap_and_import_india_district_list()
	except Exception:
		frappe.errprint("Indian District Import Failed")
