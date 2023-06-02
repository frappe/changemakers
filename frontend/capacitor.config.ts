import { CapacitorConfig } from "@capacitor/cli"

const config: CapacitorConfig = {
	appId: "io.frappe.changemakers",
	appName: "Changemakers",
	webDir: "../changemakers/public/frontend",
	bundledWebRuntime: false,
	plugins: {
		CapacitorHttp: {
			enabled: true,
		},
	},
}

export default config
