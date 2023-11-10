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
			return true
		}
	}
</script>

<template>
	<h1>
		Cartas
	</h1>
	<ul v-if="cards.length" class="uk-grid uk-child-width-1-2@s uk-grid uk-child-width-1-3@m uk-grid-match" uk-grid>
		<li v-for="card in cards">
			<CardItem :card="card" :key="card.id" />
		</li>
	</ul>
	<p v-else>
		Loading...
	</p>

	<div class="uk-card uk-card-body uk-card-primary uk-margin-top">
		<h3>Envia tus Cartas</h3>
		<form @submit.prevent="addCard" uk-margin>
			<input type="text" name="title" placeholder="Title" v-model="card.title" class="uk-input" />
			<input type="text" name="description" placeholder="Description" v-model="card.description" class="uk-input" />
			<button type="submit" class="uk-button uk-button-primary">Enviar</button>
		</form>
	</div>

	<!-- <pre>
		{{ cards }}
	</pre> -->
</template>
