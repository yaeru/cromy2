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
</script>

<template>
	<h1>User:</h1>
	<ul>
		<li>ID: {{ user.id }}</li>
		<li>Email: {{ user.email }}</li>
		<li>phone: {{ user.phone }}</li>
	</ul>

	<!-- <pre>
		{{ user }}
	</pre> -->

	<div>
		<h3>My current Cards</h3>
		<ul>
			<li v-for="card in usercard" :key="card.id">
				{{ card.title }} <span class="uk-badge" v-if="card.count > 1">{{ card.count }}</span>
			</li>
		</ul>
	</div>

	<!-- <pre>
		{{ usercard }}
	</pre> -->
</template>