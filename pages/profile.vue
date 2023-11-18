<script setup lang="ts">
	definePageMeta({
		middleware: 'authenticated',
	});
	const user = useSupabaseUser();
	const supabase = useSupabaseClient();
	
	const { data: usercard } = await useAsyncData(async () => {
		const { data: { user } } = await supabase.auth.getUser()
		const { data } = await supabase.from('view_my_cards').select('*').eq('user_id', user.id)
		return data
	});
	
	const injectedUserTokens = inject<number>('userTokens');
	const updateUserTokens = inject<() => Promise<void>>('updateTokens');
</script>

<template>
	<section class="uk-section uk-section-small">
		<h1>User:</h1>
		<ul>
			<li>ID: {{ user.id }}</li>
			<li>Email: {{ user.email }}</li>
			<li>phone: {{ user.phone }}</li>
			<li>My Tokens: $  {{ injectedUserTokens }}</li>
		</ul>
	</section>

	<section class="uk-section uk-section-small">
		<h3>My current Cards</h3>
		<div class="uk-grid uk-grid-match uk-child-width-1-2@s uk-grid uk-child-width-1-3@m uk-child-width-1-5@l" uk-grid uk-height-match="target: .uk-card">
			<div v-for="card in usercard" :key="card.id">
				<CardItem :key="card.id" :title="card.title" :description="card.description" :collectionId="card.collection_id" :collectionTitle="card.collection_title" :number="card.cardNumber" :class="{ 'figurita-repeted-one': card.count > 1, 'figurita-repeted-more': card.count > 2 }" />
				</div>
			</div>
		</section>
	</template>