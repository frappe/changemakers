<template>
	<div>
		<ListView
			doctype="Rescue"
			:filterConfig="{
				gender: { type: 'link', doctype: 'Gender' },
				state: { type: 'link', doctype: 'State' },
				age: { type: 'number' },
				condition: { type: 'select' },
			}"
			:sort="{ field: 'rescued_at', direction: 'asc' }"
		/>
	</div>
</template>

<script setup lang="ts">
import ListView from "@/components/ListView.vue"
</script>
