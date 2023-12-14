<script setup lang="ts">
	const user = useSupabaseUser();
	const supabase = useSupabaseClient();
	import { useTokenService } from '~/services/tokenService';
	
	const { userTokens, updateTokens } = useTokenService();
	provide('userTokens', userTokens);
	provide('updateTokens', updateTokens);
</script>


<template>
	<Navbar />
	<main class="uk-container uk-container-large">
		<slot />
	</main>
	<footer class="uk-padding uk-text-center">
		<div class="uk-container uk-container-large">
			<p class="uk-margin-remove">Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
		</div>
	</footer>
</template>