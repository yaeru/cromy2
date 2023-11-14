<script setup>
	const props = defineProps({
		card: {
			type: Object,
			required: true,
		},
	});
	const { card } = props;
</script>

<template>
	<article class="uk-card uk-card-default uk-card-small">
		<div class="uk-card-header uk-flex uk-flex-middle uk-flex-between">
			<div>
				<h3 class="uk-card-title uk-margin-remove-bottom">
					{{ card.title }}
				</h3>
				<p class="uk-text-meta uk-margin-remove">
					{{ card.collection.title }} - {{ card.created_at }}
				</p>
			</div>
			<span class="uk-sortable-handle uk-margin-small-right uk-text-center" uk-icon="icon: table"></span>
		</div>
		<div class="uk-card-body">
			<p>
				{{ card.description }}
			</p>
		</div>
	</article>
</template>