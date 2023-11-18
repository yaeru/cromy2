<script setup lang="ts">
	defineProps({
		title: String,
		description: String
	})
</script>

<template>
	<article class="figurita uk-card uk-card-secondary uk-card-small uk-text-center">
		<div class="uk-card-header">
			<h3 class="uk-card-title uk-margin-remove-bottom">
				{{ title }}
			</h3>
		</div>
		<div class="uk-card-body">
			<figure>
				<img src="https://getuikit.com/docs/images/light.jpg" class="uk-border-rounded">
			</figure>
			<p class="uk-text-small">
				{{ description }}
			</p>
		</div>
	</article>
</template>