<script setup lang="ts">
	import { useTokenService } from '~/services/tokenService';

	const { userTokens, updateTokens } = useTokenService();

    // Proporciona los datos y métodos del servicio para que estén disponibles globalmente
	provide('userTokens', userTokens);
	provide('updateTokens', updateTokens);
</script>


<template>
	<Navbar />
	<main class="uk-container uk-container-large">
		<slot />
	</main>
</template>