<script setup lang="ts">
	const supabase = useSupabaseClient()

	import { useBreadcrumbs } from '~/composables/useBreadcrumbs';

	const { breadcrumbs } = useBreadcrumbs();
</script>

<template>
	<div class="uk-grid uk-grid-collapse" uk-grid>
		<aside class="uk-width-1-5  uk-height-viewport uk-section-muted uk-visible@m">
			<div class="uk-card-body uk-position-fixed">
				<VerticalMenu />
			</div>
		</aside>
		<main class="uk-width-4-5@m">
			<Navbar />
			<div class="uk-container uk-container-expand">
				<section class="uk-section uk-section-small">
					<NuxtPage />
				</section>
			</div>
		</main>
	</div>
</template>
