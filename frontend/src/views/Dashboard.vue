<template class="bg-black">
	<ion-page>
		<ion-content :fullscreen="true">
			<div class="m-4">
				<div>
					<h2 class="text-xl font-semibold text-gray-900">
						{{ t("dashboard.quick_links.header") }}
					</h2>
					<div class="mt-3 grid grid-cols-2 gap-5">
						<RouterLink :to="{ name: 'RescueList' }" v-slot="{ href }">
							<a
								:href="href"
								class="flex flex-col items-center gap-3 rounded-lg bg-white p-[14px] shadow-md"
							>
								<FrappeIcons.RescueIcon />
								<h3 class="text-base font-medium text-gray-900">
									{{ t("labels.rescue", "Rescue") }}
								</h3>
							</a>
						</RouterLink>
					</div>
				</div>

				<div></div>
			</div>
		</ion-content>
	</ion-page>
</template>

<script lang="ts" setup>
import { useI18n } from "vue-i18n"
import { RouterLink } from "vue-router"
import { IonPage, IonContent } from "@ionic/vue"
import { FrappeIcons } from "@/components/icons"
import { IonDatetime, IonDatetimeButton, IonModal } from "@ionic/vue"

import { createDocumentResource } from "frappe-ui"
import { DocumentResource } from "@/typing/resource"
import { Beneficiary } from "@/../types/FrappeChangemakers/Beneficiary"
import { ref } from "vue"

const datetime = ref(null)

const { t } = useI18n()

const beneficiaryDoc: DocumentResource<Beneficiary> = createDocumentResource({
	doctype: "Beneficiary",
	name: "BENE-2022-12-00002",
})

function handleDatetimeChange(e) {
	console.log(e)
}

beneficiaryDoc.reload()
</script>
