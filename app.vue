<script setup lang="ts">
	const supabase = useSupabaseClient()
</script>

<template>
	<Navbar />
	<div class="uk-container">
		<NuxtPage />
	</div>
</template>
