<script setup lang="ts">
	const supabase = useSupabaseClient()
</script>

<template>
	<Navbar />
	<div class="uk-container">
		<section class="uk-section uk-section-small">
			<NuxtPage />
		</section>
	</div>
</template>
