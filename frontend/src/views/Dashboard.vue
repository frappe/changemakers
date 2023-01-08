<template>
	<ion-page>
		<ion-content :fullscreen="true">
			<div
				class="flex flex-col self-center items-center justify-center h-full space-y-3"
			>
				<h2 class="text-gray-700 font-medium text-7xl">
					{{ beneficiaryDoc.doc && beneficiaryDoc.doc.age }}
				</h2>
				<Badge color="green">{{ t("labels.rescue") }}</Badge>

				<div>
					<FrappeIcons.BeneficiaryIcon />
					<FrappeIcons.RescueIcon />
				</div>

				<Button @click="toggleLanguage">{{ t("labels.Toggle Language") }} </Button>
			</div>
		</ion-content>
	</ion-page>
</template>

<script lang="ts" setup>
import { useI18n } from "vue-i18n"
import { IonPage, IonContent } from "@ionic/vue"
import { FrappeIcons } from "@/components/icons"

import { createDocumentResource } from "frappe-ui"
import { Beneficiary } from "@/../types/FrappeChangemakers/Beneficiary"
import { DocumentResource } from "@/typing/resource"

const { t, locale } = useI18n()

const beneficiaryDoc: DocumentResource<Beneficiary> = createDocumentResource({
	doctype: "Beneficiary",
	name: "BENE-2022-12-00002"
})

beneficiaryDoc.reload()

function toggleLanguage() {
	if (locale.value == "en") {
		locale.value = "hi"
	} else {
		locale.value = "en"
	}
}
</script>
