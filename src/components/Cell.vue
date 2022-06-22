<template>
	<component :is="tag || 'CELL'" class="block">
		<slot></slot>
	</component>
</template>

<script setup lang="ts" name="Cell">
defineProps<{ tag?: string }>();
</script>

<style scoped>
</style>