<template>
	<component :is="tag?.toUpperCase() || 'GRID-ROW'" class="contents">
		<slot></slot>
	</component>
</template>


<script setup lang="ts" name="GridRow">

defineProps<{
	tag?: string;
	// areas?: string;
	// cols?: string;
	// rows?: string;
}>()

</script>
