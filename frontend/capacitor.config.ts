import { CapacitorConfig } from "@capacitor/cli"

const config: CapacitorConfig = {
	appId: "io.frappe.changemakers",
	appName: "Changemakers",
	webDir: "../changemakers/public/frontend",
	bundledWebRuntime: false,
	server: {
		url: 'http://10.0.2.2:8080/',
		cleartext: true
	}
}

export default config
