<template class="bg-black">
	<ion-page>
		<ion-content :fullscreen="true">
			<div class="m-4">
				<div>
					<h2 class="font-semibold text-xl text-gray-900">
						{{ t("dashboard.quick_links.header") }}
					</h2>
					<div class="grid grid-cols-2 gap-5 mt-3">
						<RouterLink
							:to="{ name: 'RescueList' }"
							v-slot="{ href }"
						>
							<a
								:href="href"
								class="flex flex-col shadow-md bg-white p-[14px] items-center rounded-lg gap-3"
							>
								<FrappeIcons.RescueIcon />
								<h3 class="font-medium text-base text-gray-900">
									{{ t("dashboard.quick_links.rescue", "Rescue") }}
								</h3>
							</a>
						</RouterLink>
					</div>
				</div>
			</div>
		</ion-content>
	</ion-page>
</template>

<script lang="ts" setup>
import { useI18n } from "vue-i18n"
import { RouterLink } from "vue-router"
import { IonPage, IonContent } from "@ionic/vue"
import { FrappeIcons } from "@/components/icons"

import { createDocumentResource } from "frappe-ui"
import { DocumentResource } from "@/typing/resource"
import { Beneficiary } from "@/../types/FrappeChangemakers/Beneficiary"

const { t } = useI18n()

const beneficiaryDoc: DocumentResource<Beneficiary> = createDocumentResource({
	doctype: "Beneficiary",
	name: "BENE-2022-12-00002",
})

beneficiaryDoc.reload()
</script>
