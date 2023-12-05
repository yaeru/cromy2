<script setup lang="ts">
	const user = useSupabaseUser();
	const supabase = useSupabaseClient();
	import { useTokenService } from '~/services/tokenService';

	if (user.value) {
		const { userTokens, updateTokens } = useTokenService();
		provide('userTokens', userTokens);
		provide('updateTokens', updateTokens);
	}
</script>


<template>
	<Navbar />
	<main class="uk-container uk-container-large">
		<slot />
	</main>
	<footer class="uk-padding uk-text-center">
		<div class="uk-container uk-container-large">
			<h3 class="uk-margin-remove-top uk-margin-small-bottom">Cromy Test</h3>
			<p class="uk-margin-remove uk-text-small">©2023 - Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
		</div>
	</footer>
</template>