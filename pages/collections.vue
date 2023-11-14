<script setup lang="ts">
	const supabase = useSupabaseClient();

	const { data: collections } = await useAsyncData(async () => {
		const { data } = await supabase.from('collection').select('*, cards(*)')
		return data
	});
</script>

<template>
	<h1 class="uk-margin-remove-bottom">Collections</h1>
	<p class="uk-text-lead uk-margin-remove-top">
		Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod.
	</p>

	<hr>

	<h2>Collections disponibles</h2>
	<div class="uk-grid uk-grid-small uk-child-width-1-2@s uk-grid uk-child-width-1-3@m uk-child-width-1-4@l uk-grid-match" uk-grid>
		<div v-for="collection in collections">
			<div class="uk-card uk-card-default uk-card-body uk-card-small">
				<h3>
					{{collection.title}}
				</h3>
				<ol>
					<li v-for="card in collection.cards">
						{{card.title}}
					</li>
				</ol>
			</div>
		</div>
	</div>

	<!-- <pre>
		{{ collections }}
	</pre> -->
</template>
