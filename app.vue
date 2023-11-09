<script setup lang="ts">
	const supabase = useSupabaseClient()

	const { data: cards } = await useAsyncData(async () => {
		const { data } = await supabase.from('cards').select('*')
		return data
	})
</script>

<template>
	<NuxtLayout :name="layout">
		<div class="uk-container">
			<section class="uk-section">
				<h1>
					Test 2
				</h1>
				<ul class="uk-grid uk-child-width-1-2 uk-grid uk-child-width-1-3@m uk-grid-match" uk-grid>
					<li v-for="card in cards" :key="card.id">
						<div class="uk-card uk-card-default uk-card-small">
							<div class="uk-card-header">
								<h3 class="uk-card-title uk-margin-remove-bottom">
									{{ card.title }}
								</h3>
								<p class="uk-text-meta uk-margin-remove-top">
									{{ card.created_at }}
								</p>
							</div>
							<div class="uk-card-body">
								<p>
									{{ card.description }}
								</p>
							</div>
						</div>
					</li>
				</ul>
				<pre>
					{{ cards }}
				</pre>
			</section>
		</div>
	</NuxtLayout>
</template>
