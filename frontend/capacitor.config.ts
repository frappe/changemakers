import { CapacitorConfig } from "@capacitor/cli"

const config: CapacitorConfig = {
	appId: "io.frappe.changemakers",
	appName: "Changemakers",
	webDir: "../changemakers/public/frontend",
	bundledWebRuntime: false,
	server: {
		url: "http://192.168.0.100:8080/",
		cleartext: true,
	},
	plugins: {
		CapacitorHttp: {
			enabled: true,
		},
	},
}

export default config
