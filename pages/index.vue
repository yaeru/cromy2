<script setup lang="ts">
	const user = useSupabaseUser();
	const supabase = useSupabaseClient();
	const injectedUserTokens = inject<number>('userTokens');
	const updateUserTokens = inject<() => Promise<void>>('updateTokens');

	const { data: cards } = await useAsyncData(async () => {
		const { data } = await supabase.from('cards').select('*')
		return data
	});
	
	/* Open envelope */
	const costPerCard = 20;
	const selectedCardId = ref('');
	const selectedCardTitle = ref('');
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

		const { data } = await supabase.from('userCard').insert([{ user_id: user.id, card_id: selectedCard.id }]).select();

		/* Actualizar la cantidad de tokens en el estado local */
		await updateUserTokens();

		return data;
	};
</script>
<template>
	<h1 class="uk-margin-remove-bottom">Ganar Cartas</h1>
	<p class="uk-text-lead uk-margin-remove-top">
		Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod.
	</p>
	
	<hr>
	<div class="uk-grid uk-flex-middle" uk-grid>
		<div class="uk-width-2-3@m uk-text-center">	
			<template v-if="user">
				<p class="uk-h2">Tienes {{ injectedUserTokens }}/100 tokens en tu billetera.</p>
				
				<div class="uk-grid uk-child-width-1-3@m" uk-grid>	
					<div>
						<article class="sobre uk-card uk-card-secondary uk-card-body uk-card-small">
							<h3 class="uk-margin-remove uk-h2">Sobre Title</h3>
							<p class="uk-margin-remove uk-h5">Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
							<p>Sobre Cost: {{ costPerCard }}</p>
							<button @click="openEnvelope" :disabled="!suficientesTokens" class="uk-button uk-button-secondary uk-width-expand">Abrir Sobre</button>
						</article>
					</div>
				</div>


				<!-- Mostrar la carta seleccionada -->
				<AppAlert state="success" v-if="selectedCardId">Carta seleccionada: {{ selectedCardTitle }}</AppAlert>
				<AppAlert state="danger" v-if="!suficientesTokens">No tienes suficientes tokens para seleccionar una carta.</AppAlert>
			</template>
			<template v-else>
				<h3>
					Registrate para abrir sobres y ganar cartas
				</h3>
				<NuxtLink to="/login" class="uk-button uk-button-secondary">Registrate acá</NuxtLink>
			</template>
		</div>
		<div class="uk-width-1-3@m">
			<h4>Posibles Premios</h4>
			<ul>
				<li v-for="card in cards" :key="card.id">
					{{card.title}}
				</li>
			</ul>
		</div>
	</div>
</template>