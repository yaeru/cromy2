<script setup lang="ts">
	definePageMeta({
		middleware: 'authenticated',
	});
	import { useTokenService } from '~/services/tokenService';
	const { userTokens } = useTokenService();
	const user = useSupabaseUser();
	const supabase = useSupabaseClient();
	
	const { data: usercollection } = await useAsyncData(async () => {
		const { data: { user } } = await supabase.auth.getUser()
		const { data } = await supabase.from('view_my_collections').select('*').eq('user_id', user.id)
		return data
	});
</script>

<template>
	<section class="uk-section uk-section-small">
		<h1>User:</h1>
		<ul>
			<li>ID: {{ user.id }}</li>
			<li>Email: {{ user.email }}</li>
			<li>phone: {{ user.phone }}</li>
			<li>My Tokens: $  {{ userTokens }}</li>
		</ul>
	</section>

	<section class="uk-section uk-section-small">
		<h3>My current Collections</h3>
		<div class="uk-grid uk-grid-match uk-child-width-1-2@s uk-grid uk-child-width-1-3@m uk-child-width-1-5@l" uk-grid>
			<div v-for="collection in usercollection" :key="collection.id">
				<div class="uk-card uk-card-default uk-card-small uk-card-body">
					<p class="uk-h3">{{ collection.title }}</p>
					<p>{{ collection.description }}</p>
					<NuxtLink :to="'/collections/' + collection.collection_id" class="uk-button uk-button-primary uk-button-small uk-width-expand">
						Ver Collection
					</NuxtLink>
				</div>
			</div>
		</div>
<!-- 
		<pre>
			{{usercollection}}
		</pre> -->
	</section>

</template>