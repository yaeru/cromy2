<script setup lang="ts">
	const supabase = useSupabaseClient();

	const { data: collections } = await useAsyncData(async () => {
		const { data } = await supabase.from('collection').select('*')
		return data
	});

	const { data: cards } = await useAsyncData(async () => {
		const { data } = await supabase.from('cards').select('*, collection(*)').order('id', { ascending: true })
		return data
	});

	const card = reactive({
		title: '',
		description: '',
		collection_id: '',
		collection: '',
	});

	const addCard = async () => {
		const { error } = await supabase.from('cards').insert(card)
		if (error) {
			alert(error.message)
		} else {
			showMessage.value = true;
			card.title = '';
			card.description = '';
			card.collection_id = '';
		}
	};

	const showMessage = ref(false)
</script>

<template>
	<SectionHeader title="Cards" lead="Lorem ipsum dolor sit amet consectetur adipisicing elit, sed do eiusmod." />
	
	<section class="uk-section uk-padding-remove">
		<div class="uk-card uk-card-default uk-card-body uk-card-small">
			<h2>Envia tus Cartas</h2>
			<form @submit.prevent="addCard"  class="uk-grid uk-grid-small uk-child-width-expand" uk-grid>
				<div class="uk-margin">
					<label class="uk-form-label uk-hidden" for="title">Nombre</label>
					<input type="text" name="title" id="title" placeholder="Título de la Carta" v-model="card.title" class="uk-input" required />
				</div>
				<div>
					<input type="text" name="description" placeholder="Description (opcional)" v-model="card.description" class="uk-input" />
				</div>
				<div>
					<select class="uk-select" name="collection" v-model="card.collection_id" required>
						<option value="" disabled selected>Selecciona una Coleción</option>
						<option v-for="collection in collections" :key="collection.id" :value="collection.id">
							{{collection.title}}
						</option>
					</select>
				</div>
				<div>
					<button type="submit" class="uk-button uk-button-primary">Enviar</button>
				</div>
			</form>

			<AppAlert state="success" v-if="showMessage">¡Funcionó!</AppAlert>
		</div>
	</section>

	<section class="uk-section uk-section-small">
		<h2>Listado de Cartas</h2>
		<ul v-if="cards.length" class="uk-grid uk-child-width-1-2@s uk-grid uk-child-width-1-3@m uk-child-width-1-5@l" uk-grid uk-height-match="target: .uk-card">
			<li v-for="card in cards">
				<CardItem :key="card.id" :title="card.title" :description="card.description" :collectionId="card.collection.id" :collectionTitle="card.collection.title" :number="card.cardNumber" />
			</li>
		</ul>
		<p v-else>
			Loading...
		</p>
	</section>
</template>
