<template>
	<ListView
		doctype="Entitlement Request"
		:filterConfig="{
			gender: { type: 'link', doctype: 'Gender' },
			status: {
				type: 'select',
			},
			age: { type: 'number' },
		}"
	/>
</template>

<script setup lang="ts">
import ListView from "@/components/ListView.vue"
</script>
