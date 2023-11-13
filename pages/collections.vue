<script setup lang="ts">
	const supabase = useSupabaseClient();

	const { data: collections } = await useAsyncData(async () => {
		const { data } = await supabase.from('collection').select('*, cards(*)')
		return data
	});

	const collection = reactive({
		title: '',
		cards: '',
	});

	const showMessage = ref(false)
</script>

<template>
	<h1>
		Collections
	</h1>

	<h3>Listado de Collections</h3>
	<ul class="uk-grid uk-grid-small uk-child-width-1-2@s uk-grid uk-child-width-1-3@m uk-grid-match" uk-grid>
		<li v-for="collection in collections">
			<div>
				<h3>
					{{collection.title}}
				</h3>
				<ul>
					<li v-for="card in collection.cards">
						{{card.title}}
					</li>
				</ul>
			</div>
		</li>
	</ul>

	<pre>
		{{ collections }}
	</pre>
</template>
