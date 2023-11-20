<script setup lang="ts">
	const supabase = useSupabaseClient();
	const injectedUserTokens = inject<number>('userTokens');
	const updateUserTokens = inject<() => Promise<void>>('updateTokens');

	const { data: userCollections } = await useAsyncData(async () => {
		const { data } = await supabase.from('userCollection').select('collection_id');
		return data;
	});

	const { data: collections } = await useAsyncData(async () => {
		const { data } = await supabase.from('collection').select('*, cards(id, title, cardNumber)').order('id', { ascending: true })
		return data
	});

	/* Check if Collection is already bought */
	function isUserCollection(collectionId: number) {
		return userCollections.value.some((uc: any) => uc.collection_id === collectionId);
	}

	/* Buy Collection */
	const costPerCollection = 50;
	const selectedCollectionId = ref<string | null>(null);
	const selectedCollectionTitle = ref('');
	const selectedCollectionDescription = ref('');

	const showMesaggeNoHayTokens = ref(false)
	const suficientesTokens = computed(() => injectedUserTokens.value >= costPerCollection);

	
	const buyCollection = async (collectionId: string) => {
		if (injectedUserTokens.value < costPerCollection) {
			showMesaggeNoHayTokens.value = true;
			return;
		}

		const { data: { user } } = await supabase.auth.getUser();

		/* Obtener la fila existente de userTokens */
		const { data: existingUserTokens } = await supabase.from('userTokens').select('tokens').eq('user_id', user.id);

		/* Calcular la nueva cantidad de tokens */
		const newTokensValue = existingUserTokens.length > 0 ? existingUserTokens[0].tokens - costPerCollection : 0;

		/* Actualizar la fila existente en userTokens con la nueva cantidad de tokens */
		await supabase.from('userTokens').update([{ tokens: newTokensValue }]).eq('user_id', user.id);

		/* Actualizar el ID de la colección seleccionada */
		selectedCollectionId.value = collectionId;

		/* Guardar coleccion en userCollection */
		const { data } = await supabase.from('userCollection').insert([{ user_id: user.id, collection_id: collectionId }]).select();

		/* Actualizar la cantidad de tokens en el estado local */
		await updateUserTokens();

		return data;
	};
</script>

<template>
	<SectionHeader title="Buy Collections" lead="Lorem ipsum dolor sit amet consectetur adipisicing elit, sed do eiusmod." />

	<section id="collections-store" class="uk-section uk-section-small uk-padding-remove-top">
		<div class="uk-grid uk-grid-small uk-grid-match uk-child-width-1-2@m uk-child-width-1-3@l" uk-grid>
			<div v-for="collection in collections" :class="{ 'pepe': isUserCollection(collection.id) }">
				<article class="uk-card uk-card-default uk-card-body uk-card-small uk-text-center">
					<figure class="pack uk-align-center">
						<img :src="collection.avatar" v-if="collection.avatar" :alt="collection.title" width="150">
						<img src="~/assets/placeholder.png" v-else :alt="collection.title" width="250">
					</figure>

					<h3 class="uk-h2 uk-margin-remove">
						{{collection.title}}
					</h3>
					<p class="uk-margin-remove text-balance">
						{{collection.description}}
					</p>
					<ul class="uk-column-1-3@m uk-margin-medium-top uk-text-left">
						<li v-for="card in collection.cards">
							{{card.cardNumber}} - {{card.title}}
						</li>
					</ul>
					<div uk-margin>
						<NuxtLink :to="'/collections/' + collection.id" class="uk-button uk-button-primary uk-width-expand">
							Ver Collection
						</NuxtLink>

						<button @click="() => buyCollection(collection.id)" v-if="!isUserCollection(collection.id)" class="uk-button uk-button-primary uk-width-expand" uk-toggle="#modal-buy-collection">Comprar por {{costPerCollection}} tokens</button>
						<button v-else class="uk-button uk-button-primary uk-width-expand" disabled>Ya lo compraste</button>
					</div>
				</article>
			</div>
		</div>
	</section>

	<!-- This is the modal -->
	<div id="modal-buy-collection" class="uk-flex-top" uk-modal>
		<div class="uk-modal-dialog uk-margin-auto-vertical">
			<div class="uk-modal-header">
				<h2 class="uk-modal-title">Compra exitosa!</h2>
			</div>
			<div class="uk-modal-body">
				Compraste la Coleccion {{ selectedCollectionTitle }}
			</div>
			<div class="uk-modal-footer uk-text-right">
				<button class="uk-button uk-button-secondary uk-modal-close" type="button">Cerrar</button>
			</div>
		</div>
	</div>
</template>
