<template>
	<ion-page>
		<ion-tabs>
			<ion-router-outlet></ion-router-outlet>
			<ion-tab-bar slot="bottom">
				<ion-tab-button tab="dashboardTab" href="/tabs/dashboard">
					<ion-icon :icon="gridOutline"></ion-icon>
					<ion-label>{{ t("navigation.dashboard") }}</ion-label>
				</ion-tab-button>

				<ion-tab-button tab="AccountTab" href="/tabs/account">
					<ion-icon :icon="personOutline"></ion-icon>
					<ion-label>{{ t("navigation.account") }}</ion-label>
				</ion-tab-button>
			</ion-tab-bar>
		</ion-tabs>
	</ion-page>
</template>

<script lang="ts" setup>
import {
	IonTabBar,
	IonTabButton,
	IonTabs,
	IonLabel,
	IonIcon,
	IonPage,
	IonRouterOutlet,
} from "@ionic/vue"
import { personOutline, gridOutline } from "ionicons/icons"
import { useI18n } from "vue-i18n"

const { t } = useI18n()
</script>
