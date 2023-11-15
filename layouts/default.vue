<script setup lang="ts">
	import { useTokenService } from '~/services/tokenService';

	const { userTokens, updateTokens } = useTokenService();

    // Proporciona los datos y métodos del servicio para que estén disponibles globalmente
    provide('userTokens', userTokens);
    provide('updateTokens', updateTokens);
</script>


<template>
	<div class="uk-grid uk-grid-collapse" uk-grid>
		<aside class="uk-width-1-5@m uk-width-1-6@l uk-visible@m">
			<div class="uk-width-1-5@m uk-width-1-6@l uk-card-body uk-height-viewport uk-section-muted uk-position-fixed">
				<VerticalMenu />
			</div>
		</aside>
		<main class="uk-width-4-5@m uk-width-5-6@l">
			<Navbar />
			<div class="uk-container uk-container-expand">
				<section class="uk-section uk-section-small">
					<slot />
				</section>
			</div>
		</main>
	</div>
</template>