import frappe

def get_doctype_title_field(doctype):
	doctype_title_field = frappe.db.get_value("DocType", doctype, "title_field")
	if doctype_title_field:
		return doctype_title_field

	has_title_field = frappe.db.exists(
		"DocField",
		{"parenttype": "DocType", "parent": doctype, "fieldname": "title"},
	)
	if has_title_field:
		return "title"

	return "name"
