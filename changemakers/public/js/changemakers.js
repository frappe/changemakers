frappe.provide("changemakers.utils");

function set_query_for_district(frm) {
  frm.set_query("district", () => {
    return {
      filters: {
        state: frm.doc.state,
      },
      orderby: "name",
    };
  });
}

changemakers.utils.handle_state_field = (frm) => {
  set_query_for_district(frm);
  // Clear the district if it does not belong to that state
  frappe.db.get_value("District", frm.doc.district, "state", (r) => {
    if (r.state != frm.doc.state) {
      frm.set_value("district", "");
    }
  });
};

changemakers.utils.handle_district_field = (frm) => {
  if (frm.doc.district) {
    frappe.db.get_value("District", frm.doc.district, "state", (r) => {
      frm.set_value("state", r.state);
    });
  }
};

changemakers.utils.set_query_for_district = set_query_for_district;
