<script setup lang="ts">
	const user = useSupabaseUser();
	const supabase = useSupabaseClient();
	const selectedCardId = ref('');
	const selectedCardTitle = ref('');

	const { data: cards } = await useAsyncData(async () => {
		const { data } = await supabase.from('cards').select('*')
		return data
	});

	const openEnvelope = async () => {
		const { data: { user } } = await supabase.auth.getUser()
		
		/* Seleccionar una carta al azar */
		const randomIndex = Math.floor(Math.random() * cards.value.length);
		const selectedCard = cards.value[randomIndex];
		
		console.log(cards.value.length);
		console.log(randomIndex);

		console.log(selectedCardTitle);

	    /* Actualizar ID_CARTA_SELECCIONADA */
		selectedCardId.value = selectedCard.id;
		selectedCardTitle.value = selectedCard.title;

		const { data } = await supabase.from('userCard').insert([{ user_id: user.id, card_id: selectedCard.id }]).select();
		return data
	};

</script>
<template>
	<h1 class="uk-margin-remove-bottom">Ganar Cartas</h1>
	<p class="uk-text-lead uk-margin-remove-top">
		Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod.
	</p>
	<button @click="openEnvelope" class="uk-button uk-button-secondary" v-if="user">Abrir</button>
	<NuxtLink to="/login" class="uk-button uk-button-secondary" v-else>Registrate para ganar premios</NuxtLink>
	<h4>Posibles Premios</h4>
	<ul>
		<li v-for="card in cards" :key="card.id">
			{{card.title}}
		</li>
	</ul>

	<!-- Mostrar la carta seleccionada -->
	<AppAlert state="success" v-if="selectedCardId">Carta seleccionada: {{ selectedCardTitle }}</AppAlert>
</template>