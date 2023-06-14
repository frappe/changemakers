<template>
	<ListView
		doctype="Case"
		:filterConfig="{
			status: { type: 'select' },
			type: { type: 'select' },
			priority: { type: 'select' },
		}"
	/>
</template>

<script setup lang="ts">
import ListView from "@/components/ListView.vue"
</script>
