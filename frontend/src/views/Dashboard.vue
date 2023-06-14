<template class="bg-black">
	<ion-page>
		<ion-content :fullscreen="true">
			<div class="m-4 space-y-6">
				<div>
					<h2 class="text-xl font-semibold text-gray-900">
						{{ t("dashboard.quick_links.header") }}
					</h2>
					<div class="mt-3 grid grid-cols-2 gap-5">
						<RouterLink :to="{ name: 'RescueList' }" v-slot="{ href }">
							<a
								:href="href"
								class="flex flex-col items-center gap-3 rounded-xl bg-white p-[14px] shadow-md"
							>
								<FrappeIcons.RescueIcon />
								<h3 class="text-base font-medium text-gray-900">
									{{ t("labels.rescue", "Rescue") }}
								</h3>
							</a>
						</RouterLink>
						<RouterLink :to="{ name: 'BeneficiaryList' }" v-slot="{ href }">
							<a
								:href="href"
								class="flex flex-col items-center gap-3 rounded-xl bg-white p-[14px] shadow-md"
							>
								<FrappeIcons.BeneficiaryIcon />
								<h3 class="text-base font-medium text-gray-900">
									{{ t("labels.beneficiary", "Beneficiary") }}
								</h3>
							</a>
						</RouterLink>
					</div>
				</div>

				<!-- CASES -->
				<div class="space-y-4">
					<h2 class="text-xl font-semibold text-gray-900">
						{{ t("dashboard.cases.header", "Cases") }}
					</h2>
					<div class="mt-3 grid grid-cols-2 gap-5">
						<RouterLink :to="{ name: 'NewCaseForm' }" v-slot="{ href }">
							<a
								:href="href"
								class="flex flex-col items-center gap-3 rounded-xl bg-white p-[14px] shadow-md"
							>
								<FrappeIcons.NewTicketIcon class="h-6 w-6" />
								<h3 class="text-base font-medium text-gray-900">
									New {{ t("labels.case", "Case") }}
								</h3>
							</a>
						</RouterLink>
						<RouterLink :to="{ name: 'CaseList' }" v-slot="{ href }">
							<a
								:href="href"
								class="flex flex-col items-center gap-3 rounded-xl bg-white p-[14px] shadow-md"
							>
								<FrappeIcons.TicketIcon class="h-6 w-6" />
								<h3 class="text-base font-medium text-gray-900">
									View {{ t("labels.cases", "Cases") }}
								</h3>
							</a>
						</RouterLink>
					</div>
				</div>

				<!-- SERVICES -->
				<div class="space-y-4">
					<h2 class="text-xl font-semibold text-gray-900">
						{{ t("dashboard.services.header", "Services") }}
					</h2>
					<div class="flex flex-col gap-[2px]">
						<RouterLink
							:to="{ name: 'Entitlement RequestList' }"
							v-slot="{ href }"
						>
							<a
								:href="href"
								class="flex items-center justify-between gap-3 rounded-t-xl bg-white p-[14px] shadow-md"
							>
								<div class="flex items-center gap-3">
									<FeatherIcon name="clipboard" class="h-6 w-6 text-gray-700" />
									<h3 class="text-base font-medium text-gray-900">
										{{ t("labels.entitlement", "Entitlement") }}
									</h3>
								</div>
								<FeatherIcon
									name="chevron-right"
									class="h-6 w-6 text-gray-700"
								/>
							</a>
						</RouterLink>
						<RouterLink
							:to="{ name: 'Awareness Camp RecordList' }"
							v-slot="{ href }"
						>
							<a
								:href="href"
								class="flex items-center justify-between gap-3 rounded-b-xl bg-white p-[14px] shadow-md"
							>
								<div class="flex items-center gap-3">
									<FrappeIcons.AwarenessCampIcon class="h-6 w-6" />
									<h3 class="text-base font-medium text-gray-900">
										{{ t("labels.awareness_camp", "Awareness Camp Records") }}
									</h3>
								</div>
								<FeatherIcon
									name="chevron-right"
									class="h-6 w-6 text-gray-700"
								/>
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

import { createDocumentResource, FeatherIcon } from "frappe-ui"
import { DocumentResource } from "@/typing/resource"
import { Beneficiary } from "@/../types/FrappeChangemakers/Beneficiary"

const { t } = useI18n()

const beneficiaryDoc: DocumentResource<Beneficiary> = createDocumentResource({
	doctype: "Beneficiary",
	name: "BENE-2022-12-00002",
})

beneficiaryDoc.reload()
</script>
