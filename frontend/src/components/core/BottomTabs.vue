<template>
	<ion-tab-bar slot="bottom">
		<ion-tab-button
			class="rounded-l-md bg-white"
			tab="dashboardTab"
			href="/tabs/dashboard"
		>
			<DashboardIcon
				:class="
					route.path == '/tabs/dashboard' ? 'text-gray-900' : 'text-gray-500'
				"
				class="h-7 w-8"
			/>
		</ion-tab-button>

		<ion-tab-button
			class="rounded-r-md bg-white"
			tab="AccountTab"
			href="/tabs/account"
		>
			<ProfileIcon
				:class="
					route.path == '/tabs/account' ? 'text-gray-900' : 'text-gray-500'
				"
				class="h-8 w-8"
			/>
		</ion-tab-button>
	</ion-tab-bar>
</template>

<script lang="ts" setup>
import { useRoute } from "vue-router"
import DashboardIcon from "@/components/icons/Dashboard.vue"
import ProfileIcon from "@/components/icons/Profile.vue"

import { IonTabBar, IonTabButton } from "@ionic/vue"

const route = useRoute()
</script>
