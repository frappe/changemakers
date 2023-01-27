import frappe


def after_install():
	# Change password reset link expiry to 1 day
	frappe.db.set_single_value(
		"System Settings", "reset_password_link_expiry_duration", 86400
	)
