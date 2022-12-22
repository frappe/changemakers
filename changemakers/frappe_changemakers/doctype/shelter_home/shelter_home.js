// Copyright (c) 2022, hussain@frappe.io and contributors
// For license information, please see license.txt

frappe.ui.form.on("Shelter Home", {
  setup: (frm) => {
    frm.trigger("set_query_for_district");
  },
  state: (frm) => {
    frm.trigger("set_query_for_district");

    // Clear the district if it does not belong to that state
    frappe.db.get_value("District", frm.doc.district, "state", (r) => {
      if (r.state != frm.doc.state) {
        frm.set_value("district", "");
      }
    });
  },
  district: (frm) => {
    if (frm.doc.district) {
      frappe.db.get_value("District", frm.doc.district, "state", (r) => {
        frm.set_value("state", r.state);
      });
    }
  },
  set_query_for_district: (frm) => {
    frm.set_query("district", () => {
      return {
        filters: {
          state: frm.doc.state,
        },
        orderby: "name",
      };
    });
  },
});
