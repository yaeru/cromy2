<script setup>
	defineProps({
		title: String,
		lead: String,
	})
</script>

<template>
	<header class="uk-section uk-section-small">
		<h1 class="uk-margin-remove-bottom">{{ title }}</h1>
		<p class="uk-text-lead uk-margin-remove-top">
			{{ lead }}
		</p>
		<hr>
	</header>
</template>