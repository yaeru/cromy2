<script setup lang="ts">
	const user = useSupabaseUser();
	const supaAuth = useSupabaseClient().auth;

	import { useTokenService } from '~/services/tokenService';
	const { userTokens } = useTokenService();
	

	const logout = async () => {
		const { error } = await supaAuth.signOut();
		if (error) {
			alert(error.message);
		} else {
			return navigateTo('/login');
		}
	};
</script>

<template>
	<nav class="uk-navbar-container">
		<div class="uk-container uk-container-large">
			<div class="uk-navbar" uk-navbar>
				<div class="uk-navbar-left">
					<NuxtLink to="" class="uk-navbar-item uk-logo">Logo</NuxtLink>
					<ul class="uk-navbar-nav uk-visible@m">
						<li>
							<NuxtLink to="/">Home</NuxtLink>
						</li>
						<li>
							<NuxtLink to="/collections">Collections</NuxtLink>
						</li>
						<li>
							<NuxtLink to="/cards">Cards</NuxtLink>
						</li>
						<li v-if="user">
							<NuxtLink to="/protected">Protected</NuxtLink>
						</li>
					</ul>		
				</div>
				<div class="uk-navbar-right">
					<ul class="uk-navbar-nav">
						<template v-if="!user">
							<li>
								<NuxtLink to="/login">Login</NuxtLink>
							</li>
							<li>
								<NuxtLink to="/register">Register</NuxtLink>
							</li>
						</template>
						<template v-else>
							<div class="uk-navbar-item">
								<a href="#modal-token" uk-toggle class="uk-button uk-button-default"><span uk-icon="icon: database"></span> {{ userTokens }} / 100</a>
							</div>
							<li>
								<a href="#" uk-icon="icon: chevron-down">
									<span class="uk-hidden@m">😎</span>
									<span class="uk-visible@m">
										{{ user.email }}
									</span>
								</a>
								<div class="uk-navbar-dropdown">
									<ul class="uk-nav uk-navbar-dropdown-nav">
										<li class="uk-nav-header">{{ user.email }}</li>
										<li class="uk-nav-divider"></li>
										<li><NuxtLink to="/profile">Mi Perfil</NuxtLink></li>
										<li><NuxtLink to="/usercards">Mis Cartas</NuxtLink></li>
										<li class="uk-nav-divider"></li>
										<li><a href="" @click="logout">Salir</a></li>
									</ul>
								</div>
							</li>
						</template>
					</ul>
				</div>
			</div>
		</div>
	</nav>

	<!-- This is the modal -->
	<div id="modal-token" class="uk-flex-top" uk-modal>
		<div class="uk-modal-dialog uk-margin-auto-vertical uk-modal-body">
			<button class="uk-modal-close-outside uk-icon" type="button" uk-close></button>
			<h2 class="uk-modal-title">Tokens en Billetera</h2>
			<p>Tenes {{ injectedUserTokens }} / 100</p>
		</div>
	</div>
</template>