<script setup lang="ts">
	definePageMeta({
		middleware: 'authenticated',
	});
</script>

<template>
	<div>
		<h1>Protected page</h1>
	</div>
</template>