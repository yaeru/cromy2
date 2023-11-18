<script setup lang="ts">
	const user = useSupabaseUser();
	const supabase = useSupabaseClient();
	const injectedUserTokens = inject<number>('userTokens');
	const updateUserTokens = inject<() => Promise<void>>('updateTokens');

	const { data: cards } = await useAsyncData(async () => {
		const { data } = await supabase.from('cards').select('*, collection(id, title)')
		return data
	});
	
	/* Open envelope */
	const costPerCard = 20;
	const selectedCardId = ref('');
	const selectedCardTitle = ref('');
	const selectedCardDescription = ref('');
	const selectedCardCollecionId = ref('');
	const selectedCardCollecionTitle = ref('');
	const selectedCardNumber = ref('');
	const showMesaggeNoHayTokens = ref(false)
	const suficientesTokens = computed(() => injectedUserTokens.value >= costPerCard);

	const openEnvelope = async () => {		
		// Verificar si el usuario tiene suficientes tokens
		if (injectedUserTokens.value < costPerCard) {
			showMesaggeNoHayTokens.value = true;
			return;
		}
		const { data: { user } } = await supabase.auth.getUser();

		/* Obtener la fila existente de userTokens */
		const { data: existingUserTokens } = await supabase.from('userTokens').select('tokens').eq('user_id', user.id);

		/* Calcular la nueva cantidad de tokens */
		const newTokensValue = existingUserTokens.length > 0 ? existingUserTokens[0].tokens - costPerCard : 0;

		/* Actualizar la fila existente en userTokens con la nueva cantidad de tokens */
		await supabase.from('userTokens').update([{ tokens: newTokensValue }]).eq('user_id', user.id);

    	/* Seleccionar una carta al azar */
		const randomIndex = Math.floor(Math.random() * cards.value.length);
		const selectedCard = cards.value[randomIndex];

    	/* Actualizar ID_CARTA_SELECCIONADA */
		selectedCardId.value = selectedCard.id;
		selectedCardTitle.value = selectedCard.title;
		selectedCardDescription.value = selectedCard.description;
		selectedCardCollecionId.value = selectedCard.collection.id;
		selectedCardCollecionTitle.value = selectedCard.collection.title;
		selectedCardNumber.value = selectedCard.cardNumber;

		const { data } = await supabase.from('userCard').insert([{ user_id: user.id, card_id: selectedCard.id }]).select();

		/* Actualizar la cantidad de tokens en el estado local */
		await updateUserTokens();

		return data;
	};
</script>
<template>

	<SectionHeader title="Ganar Cartas" lead="Lorem ipsum dolor sit amet consectetur adipisicing elit, sed do eiusmod." />

	<section class="uk-section uk-section-small uk-text-center">
		<template v-if="user">
			<p class="uk-h2">Tienes {{ injectedUserTokens }}/100 tokens en tu billetera.</p>

			
					<article class="sobre uk-card uk-card-secondary uk-card-body uk-card-small uk-width-medium uk-align-center">
						<h3 class="uk-margin-remove uk-h2">¡Abri un Sobre!</h3>
						<p class="uk-margin-remove uk-h5">Gana una de las 30 cartas disponibles.</p>
						<p>Valor {{ costPerCard }} Tokens</p>
						<button @click="openEnvelope" :disabled="!suficientesTokens" class="uk-button uk-button-secondary uk-width-expand" uk-toggle="#modal-new-card">Abrir Sobre</button>
					</article>
			
			<AppAlert state="danger" v-if="!suficientesTokens">No tienes suficientes tokens para seleccionar una carta.</AppAlert>
		</template>
		
		<template v-else>
			<h3>
				Registrate para abrir sobres y ganar cartas
			</h3>
			<NuxtLink to="/login" class="uk-button uk-button-secondary">Ingresá</NuxtLink>
			<NuxtLink to="/register" class="uk-button uk-button-secondary uk-margin-small-left">Registrate</NuxtLink>
		</template>
	</section>

	<!-- This is the modal -->
	<div id="modal-new-card" class="uk-flex-top" uk-modal>
		<div class="uk-modal-dialog uk-margin-auto-vertical">
			<div class="uk-modal-header">
				<h2 class="uk-modal-title">Nueva Carta</h2>
			</div>
			<div class="uk-modal-body">
				<CardItem class="uk-align-center" :title="selectedCardTitle" :description="selectedCardDescription" :collectionId="selectedCardCollecionId" :collectionTitle="selectedCardCollecionTitle" :number="selectedCardNumber" />
			</div>
			<div class="uk-modal-footer uk-text-right">
				<button class="uk-button uk-button-secondary uk-modal-close" type="button">Cerrar</button>
			</div>
		</div>
	</div>
</template>