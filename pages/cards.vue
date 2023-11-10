<script setup lang="ts">
	const supabase = useSupabaseClient();

	const { data: cards } = await useAsyncData(async () => {
		const { data } = await supabase.from('cards').select('*')
		return data
	});

	const card = reactive({
		title: '',
		description: '',
	});

	const addCard = async () => {
		const { error } = await supabase.from('cards').insert(card)
		if (error) {
			alert(error.message)
		} else {
			showMessage.value = true;
			card.title = '';
			card.description = '';
		}
	};

	const showMessage = ref(false)
</script>

<template>
	<h1>
		Cartas
	</h1>

	<div class=" uk-margin-large-bottom">
		<h3>Envia tus Cartas</h3>
		<form @submit.prevent="addCard"  class="uk-grid uk-grid-small uk-child-width-1-3@m" uk-grid>
			<div>
				<input type="text" name="title" placeholder="Title" v-model="card.title" class="uk-input" required />
			</div>
			<div>
				<input type="text" name="description" placeholder="Description" v-model="card.description" class="uk-input" />
			</div>
			<div>
				<button type="submit" class="uk-button uk-button-primary">Enviar</button>
			</div>
		</form>

		<AppAlert state="success" v-if="showMessage">¡Funcionó!</AppAlert>
	</div>

	<h3>Listado de Cartas</h3>
	<ul v-if="cards.length" class="uk-grid uk-grid-small uk-child-width-1-2@s uk-grid uk-child-width-1-3@m uk-grid-match" uk-sortable="handle: .uk-sortable-handle" uk-grid>
		<li v-for="card in cards">
			<CardItem :card="card" :key="card.id" />
		</li>
	</ul>
	<p v-else>
		Loading...
	</p>
</template>
