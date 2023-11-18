<script setup lang="ts">
	const supabase = useSupabaseClient();

	const { data: collections } = await useAsyncData(async () => {
		const { data } = await supabase.from('collection').select('*, cards(*)')
		return data
	});
</script>

<template>
	<SectionHeader title="Collections" lead="Lorem ipsum dolor sit amet consectetur adipisicing elit, sed do eiusmod." />

	<section class="uk-section uk-section-small">
		<div class="uk-grid uk-grid-small uk-child-width-1-2@s uk-grid uk-child-width-1-3@m uk-child-width-1-4@l uk-grid-match" uk-grid>
			<div v-for="collection in collections">
				<div class="uk-card uk-card-default uk-card-body uk-card-small">
					<h3>
						{{collection.title}}
					</h3>
					<ul>
						<li v-for="card in collection.cards">
							{{card.cardNumber}} - {{card.title}}
						</li>
					</ul>
				</div>
			</div>
		</div>
	</section>

	<!-- <pre>
		{{ collections }}
	</pre> -->
</template>
