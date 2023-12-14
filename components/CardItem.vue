<script setup>
	const props = defineProps({
		title: String,
		description: String,
		number: String,
		collection: Array,
		collectionId: String,
		collectionTitle: String,
	});
</script>

<template>
	<article :class="'figurita collection-' + collectionId">
		<div class="uk-card uk-card-small uk-box-shadow-large">
			<div class="uk-card-header uk-flex uk-flex-middle uk-flex-between">
				<div>
					<h3 class="uk-card-title uk-margin-remove-bottom">
						{{ title }}
					</h3>
					<p class="uk-text-meta uk-margin-remove" v-if="collectionTitle">{{ collectionTitle }}</p>
					<p class="uk-text-meta uk-margin-remove" v-else>collection title error</p>
				</div>
				<span class="uk-badge" v-if="number">
					{{ number }}
				</span>
			</div>
			<div class="uk-card-body uk-padding-remove-top uk-text-center">
				<figure>
					<img src="https://getuikit.com/docs/images/light.jpg" class="uk-border-rounded">
				</figure>
				<p class="uk-text-small" v-if="description">
					{{ description }}
				</p>
			</div>
		</div>
	</article>
</template>