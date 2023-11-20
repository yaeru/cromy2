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
	<SectionHeader title="My current Cards" />
	<section class="uk-section uk-section-small">
		<div class="uk-grid uk-grid-match uk-child-width-1-2@s uk-grid uk-child-width-1-3@m uk-child-width-1-5@l" uk-grid uk-height-match="target: .uk-card">
			<div v-for="card in usercard" :key="card.id">
				<CardItem :key="card.id" :title="card.title" :description="card.description" :collectionId="card.collection_id" :collectionTitle="card.collection_title" :number="card.cardNumber" :class="{ 'figurita-repeted-one': card.count > 1, 'figurita-repeted-more': card.count > 2 }" />
				</div>
			</div>
		</section>
	</template>