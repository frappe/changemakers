// Copyright (c) 2022, hussain@frappe.io and contributors
// For license information, please see license.txt

frappe.ui.form.on("Beneficiary", {
  setup: (frm) => {
    changemakers.utils.set_query_for_district(frm);
  },
  state: changemakers.utils.handle_state_field,
  district: changemakers.utils.handle_district_field,
});
