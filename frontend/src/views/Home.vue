<template>
	<ion-page>
		<ion-tabs>
			<ion-router-outlet></ion-router-outlet>
			<BottomTabs />
		</ion-tabs>
	</ion-page>
</template>

<script lang="ts" setup>
import { IonTabs, IonPage, IonRouterOutlet } from "@ionic/vue"
import BottomTabs from "@/components/core/BottomTabs.vue"
</script>
