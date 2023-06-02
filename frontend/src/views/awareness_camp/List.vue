<template>
	<ListView
		doctype="Awareness Camp Record"
		:filterConfig="{
			state: { type: 'link', doctype: 'State' },
			district: { type: 'link', doctype: 'District' },
			camp_type: { type: 'select' },
			camp_location: { type: 'select' },
		}"
	/>
</template>

<script setup lang="ts">
import ListView from "@/components/ListView.vue"
</script>
