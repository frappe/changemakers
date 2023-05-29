<template>
	<div class="flex flex-col gap-1">
		<span>Hotspot</span>
		<Autocomplete
			:options="hotspotOptions"
			v-model="hotspot"
			placeholder="Select Hotspot"
			@input="emit('setFilter', hotspot)"
		/>
	</div>
</template>
<script lang="ts" setup>
import { ref, computed, onMounted, defineEmits } from "vue"
import { Autocomplete, createResource } from "frappe-ui"

const hotspot = ref("")
const hotspotDoctypeList = ref([])
const emit = defineEmits(["setFilter"])

const hotspotOptions = computed(() => {
	if (hotspotDoctypeList.value.data) {
		return hotspotDoctypeList.value.data
	}
	return []
})

onMounted(() => {
	hotspotDoctypeList.value = createResource({
		url: "changemakers.api.get_doctype_options",
		params: {
			doctype: "Habitation",
		},
		onSuccess(data) {
			console.log(data)
		},
		onError(error) {
			console.log(error)
		},
		transform: (data) => {
			console.log(data)
			const titleField = data.title_field
			return data.docs.map((doc) => ({
				label: doc[titleField],
				value: doc.name,
			}))
		},
	})

	hotspotDoctypeList.value.reload()
})
</script>
