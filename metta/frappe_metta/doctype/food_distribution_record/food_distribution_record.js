// Copyright (c) 2022, hussain@frappe.io and contributors
// For license information, please see license.txt

frappe.ui.form.on('Food Distribution Record', {
	// refresh: function(frm) {

	// }
});

frappe.ui.form.on('Food Drop Off Detail', {
	number_of_packets: (frm) => set_total_distributed_packets(frm)
});

function set_total_distributed_packets(frm) {
	const drop_offs = frm.doc.drop_offs;
	let total_distributed_packets = 0;
	
	for (let entry of drop_offs) {
		total_distributed_packets += entry.number_of_packets;
	}

	frm.set_value("packets_distributed", total_distributed_packets);
}