<script setup lang="ts">

	const route = useRoute()
	const supabase = useSupabaseClient();
	const collectionId = ref('');

	const { data: cards } = await useAsyncData(async () => {
		const { data } = await supabase.from('cards').select('*, collection(*)').order('id', { ascending: true }).eq('collection_id', route.params.id);
		return data
	});

	const { data: collection } = await useAsyncData(async () => {
		const { data } = await supabase
		.from('collection').select('*').eq('id', route.params.id);
		return data;
	});

	// Obtén el primer elemento del array o un objeto vacío si el array está vacío
	const collectionInfo = collection.value[0] || {};

</script>

<template>
	<section class="uk-section uk-section-small">
		<div class="uk-grid uk-flex-middle" uk-grid>
			<figure class="uk-width-1-4@m uk-width-1-6@l pack">
				<img :src="collectionInfo.avatar" v-if="collectionInfo.avatar">
			</figure>
			<div class="uk-width-3-4@m uk-width-5-6@l">
				<h1 class="uk-margin-remove">{{ collectionInfo.title || 'Nombre Desconocido' }}</h1>
				<p class="uk-text-lead uk-margin-remove">{{ collectionInfo.description || 'Descripción Desconocida' }}</p>
			</div>
		</div>
	</section>
	<section class="uk-section uk-section-small">
		<div v-if="cards.length" class="custom">
			<div v-for="card in cards">
				<CardItem :key="card.id" :title="card.title" :description="card.description" :collectionId="card.collection.id" :collectionTitle="card.collection.title" :number="card.cardNumber" />
			</div>
		</div>
		<p v-else>
			Loading...
		</p>
	</section>
</template>
