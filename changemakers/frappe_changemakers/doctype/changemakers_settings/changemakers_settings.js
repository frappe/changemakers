// Copyright (c) 2023, hussain@frappe.io and contributors
// For license information, please see license.txt

frappe.ui.form.on("Changemakers Settings", {
	refresh(frm) {
		// TODO: Add a progress bar later
		const button = frm.add_custom_button(
			"Import Indian District List",
			(frm) => {
				frappe
					.call({
						method: "changemakers.utils.data.scrap_and_import_india_district_list",
						btn: button,
					})
					.then(() => {
						frappe.show_alert("Import Complete");
					});
			}
		);
	},
});
