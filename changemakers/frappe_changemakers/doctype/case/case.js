// Copyright (c) 2022, hussain@frappe.io and contributors
// For license information, please see license.txt

frappe.ui.form.on("Case", {
	setup: (frm) => {
		changemakers.utils.set_query_for_district(frm);
		changemakers.utils.set_query_for_zone(frm);
		changemakers.utils.set_query_for_ward(frm);
		frm.set_query("type", () => {
			return {
				filters: {
					is_enabled: 1,
				},
			};
		});
	},
	state: changemakers.utils.handle_state_field,
	district: changemakers.utils.handle_district_field,
	zone: changemakers.utils.handle_zone_field,
	ward: changemakers.utils.handle_ward_field,
	bottom_save_button: (frm) => {
		frm.save();
	},
});

frappe.ui.form.on("payment_details", {
	amount: function (frm, cdt, cdn) {
		// When the "amount" field in the child table changes
		var child = locals[cdt][cdn];
		frm.doc.total_amount = 0; // Reset total amount

		frm.doc.payment_details.forEach(function (row) {
			frm.doc.total_amount += row.amount;
		});

		frm.refresh_field("total_amount");
	},
});
