import { CapacitorConfig } from "@capacitor/cli"

const config: CapacitorConfig = {
	appId: "io.ionic.starter",
	appName: "Changemakers",
	webDir: "../changemakers/public/frontend",
	bundledWebRuntime: false,
	server: {
		url: 'http://127.0.0.1:8080/'
	}
}

export default config
