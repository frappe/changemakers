// Formvuelate
import { SchemaFormFactory } from "formvuelate"
import VeeValidatePlugin from "@formvuelate/plugin-vee-validate"

export const SchemaFormWithValidation = SchemaFormFactory([
	VeeValidatePlugin({
		// plugin configuration here
	}),
])
