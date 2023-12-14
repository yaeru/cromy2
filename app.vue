<script setup lang="ts">
	const nuxtApp = useNuxtApp();
	const loading = ref(false);
	nuxtApp.hook("page:start", () => {
		loading.value = true;
	});
	nuxtApp.hook("page:finish", () => {
		loading.value = false;
	});
</script>

<template>
	<div v-if="loading" class="uk-height-viewport  uk-flex uk-flex-middle uk-flex-center">
		<h1>Cargando...</h1>
	</div>
	<NuxtLayout>
		<NuxtPage />
	</NuxtLayout>
</template>
