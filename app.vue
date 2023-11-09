<script setup lang="ts">
	const supabase = useSupabaseClient()

	const { data: cards } = await useAsyncData(async () => {
		const { data } = await supabase.from('cards').select('*')
		return data
	})
</script>

<template>
	<NuxtLayout :name="layout">
		<div>
			<h1>
				Test 2
			</h1>
			<ul>
				<li v-for="card in cards" :key="card.id">
					<h3>
						{{ card.title }}
					</h3>
					<p>
						{{ card.description }}
					</p>
				</li>
			</ul>
			<pre>
				{{ cards }}
			</pre>
		</div>
	</NuxtLayout>
</template>
