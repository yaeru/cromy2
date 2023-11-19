<script setup lang="ts">

	const route = useRoute()
	const supabase = useSupabaseClient();
	const collectionId = ref('');

	const { data: collectionCards } = await useAsyncData(async () => {
		const { data } = await supabase
		.from('cards')
		.select('*')
		.eq('collection_id', route.params.id);
		return data;
	});
</script>

<template>
	<section class="uk-section uk-section-small">
		<h2>Cards of Collection</h2>
		<ul>
			<li v-for="card in collectionCards" :key="card.id">
				{{ card.title }}
			</li>
		</ul>

		<pre>
			{{ collectionCards }}
		</pre>
	</section>
</template>
